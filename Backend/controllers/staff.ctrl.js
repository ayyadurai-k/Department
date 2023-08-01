const { hashPassword, comparePassword } = require("../helpers/hashHelper");
const { generateToken } = require("../helpers/jwtHelpers");
const { getDate } = require("../helpers/dateTimeHelper");
const {
  getStudents,
  giveStudentAttendance,
  giveStaffAttendance,
  convertAttendance,
} = require("../helpers/attendanceHelpers");

const staffs = require("../models/staff.mdl");
const students = require("../models/student.mdl");

const studentAttendance =
  require("../models/attendance.mdl").studentAttendanceModel;
const staffAttendance =
  require("../models/attendance.mdl").staffAttendanceModel;

const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncError } = require("../middlewares/catchAsyncError");

//posting username and password
//url : /staff/login(post)

exports.staffLoginPost = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  console.log("called");
  if (!username || !password) {
    return next(new ErrorHandler("All fields are must required !", 400));
  }

  //find user from database
  const staff = await staffs.findOne({ email: username });

  if (!staff) {
    return next(new ErrorHandler("Ivalid username or password !", 400));
  }

  //compare password
  if (!(await comparePassword(password, staff.password))) {
    return next(new ErrorHandler("Check username or password ! ", 400));
  }

  //generate token
  const token = await generateToken(staff._id, staffs.collection.name);

  //store token using cookie
  res.cookie("StaffJwtToken", token, { httpOnly: true });
  res.cookie("collection", staffs.collection.name, { httpOnly: true });

  //send response
  res.status(200).json({
    success: true,
    token: token
  });
});

// url : /staff/dashboard

exports.getStaffDashboard = catchAsyncError(async (req, res, next) => {
  // get staff data using req.userId
  const staff = req.user;

  //get email from staff
  const staffEmail = staff.email;

  //get current date
  const currentDate = getDate();

  // check if attendance is already uploaded or not
  const updatedOrNot = await staffAttendance.findOne({
    email: staffEmail,
    updatedAt: currentDate,
  });

  console.log(updatedOrNot);
  
  res.status(200).json({
    success: true,
    data: staff,
    getIn : updatedOrNot ? true : false
  });
  
  
});

// url : /staff/attendance (get)
exports.getAttendancePage = catchAsyncError(async (req, res, next) => {
  // getting department and years for take students data
  const { dept, year } = req.params;

  //check exits or not
  if (!dept || !year) {
    return next(
      new ErrorHandler("Department and Year parameter is required", 404)
    );
  }
  //getting current date
  const currentDate = getDate();

  //getting last studentAttendance updated date via studentAttendance database
  const updatedOrNot = await studentAttendance
    .find({ dept: dept.toUpperCase(), year: year, updatedAt: currentDate })
    .lean();

  if (updatedOrNot.length) {
    return next(new ErrorHandler("Today Attendance Is Already Uploaded", 408));
  }

  // get student based on department and year
  const studentsData = await getStudents(dept, year);

  //check exits or not
  if (!studentsData.length) {
    return next(new ErrorHandler("No matched Student data", 404));
  }

  res.status(200).json({
    success: true,
    currentPage: "Staff Attendance Page",
    studentsData,
    dept,
    year,
  });
});

//url : /staff/attendance(post)
exports.postAttendanceData = catchAsyncError(async (req, res, next) => {
  // get absent student data
  const attendanceData = req.body;

  if (!attendanceData) {
    next(new ErrorHandler("Attendance Data is Must Required", 400));
  }

  //get dept and year
  const { dept, year } = req.params;

  //check exits or not
  if (!dept || !year) {
    return next(
      new ErrorHandler("Department and Year parameter is required", 404)
    );
  }

  // get student based on department and year
  const studentsData = await getStudents(dept, year);

  //check exits or not
  if (!studentsData.length) {
    return next(new ErrorHandler("No matched Student data", 404));
  }

  // take key form studentAttendance data
  const regNos = Object.keys(attendanceData);

  // rollno act as a key
  for await (let student of studentsData) {
    if (regNos.includes(student.regno)) {
      await giveStudentAttendance(student.regno, false, dept, year);
    } else {
      await giveStudentAttendance(student.regno, true, dept, year);
    }
  }

  res.status(200).json({
    success: true,
    currentPage: "Attendances Applied Successfully",
  });
});

// url : /staff/self-attendance
exports.selfAttendance = catchAsyncError(async (req, res, next) => {
  //get email
  const email = req.user.email;

  //get current date
  const currentDate = getDate();

  // check if attendance is already uploaded or not
  const updatedOrNot = await staffAttendance.findOne({
    email: email,
    updatedAt: currentDate,
  });

  if (updatedOrNot) {
    return next(new ErrorHandler("Today Attendance Is Already Uploaded", 408));
  }

  //give attendance
  await giveStaffAttendance(email, true);

  res.status(200).json({
    success: true,
    currentPage: "Staff Dashboard",
  });
});

// url : /staff/class/:dept/:year
exports.getOneClass = catchAsyncError(async (req, res, next) => {
  const { dept, year } = req.params;

  //check exits or not
  if (!dept || !year) {
    return next(
      new ErrorHandler("Department and Year parameter is required", 404)
    );
  }

  const studentsData = await getStudents(dept.toUpperCase(), year);

  //check exits or not
  if (!studentsData.length) {
    return next(new ErrorHandler("No matched Student data", 404));
  }

  res.status(200).json({
    success: true,
    currentPage: `Staff Visit Page in ${dept} and ${year}`,
    studentsData,
  });
});

// url : staff/students/details/:dept/:year/:selectedMonth/:selectedYear
exports.getOneClassAttendanceReport = catchAsyncError(async (req, res, next) => {
  const { dept, year, selectedMonth, selectedYear } = req.params;

  if (!dept && !year && !selectedMonth && !selectedYear) {
        next(new ErrorHandler("All Fields Are Must Required",400))
  }

  const rawReports = await studentAttendance.find({
    dept: dept.toUpperCase(),
    year: year,
    month: selectedMonth,
    currentYear: selectedYear,
  })

  if (rawReports.length===0) {
    next(new ErrorHandler("No Data Found ",400))

  }

  const report = convertAttendance(rawReports);

  res.status(200).json({
    success: true,
    data: report
  });

});

// url: /staff/self-attendance/report/:email/:month
exports.getStaffAttendanceReport = catchAsyncError(async (req, res, next) => {
  const { month, year } = req.params;
  const email = req.user.email;

  if (!email || !month || !year) {
    return next(
      new ErrorHandler(
        "Email and Month and Year is must required for attendance report",
        400
      )
    );
  }

  const staffAttendanceReport = await staffAttendance.find({
    email: email,
    month: month,
    year: year,
  });

  if (staffAttendanceReport.length == 0) {
    return next(new ErrorHandler("Attendance Reports Not Found !", 400));
  }

  res.status(200).json({
    success: true,
    currentPage: "Staff Attendance Report",
    staffAttendanceReport,
  });
});


// url : /staff/logout
exports.staffLogout = catchAsyncError(async (req, res, next) => {
  //clear cookie via set null
  res.cookie("StaffJwtToken", '', { httpOnly: true });

  res.status(200).json({
    success: true,
    currentPage: "Staff login page",
  });
});
