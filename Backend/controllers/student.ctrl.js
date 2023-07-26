const { comparePassword, hashPassword } = require("../helpers/hashHelper");
const { generateToken } = require("../helpers/jwtHelpers");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const students = require("../models/student.mdl");
const ErrorHandler = require("../utils/ErrorHandler");
const ObjectId = require("mongoose").Types.ObjectId;
const studentAttendance =
   require("../models/attendance.mdl").studentAttendanceModel;

// url: /newstudent
exports.createNewStudent = catchAsyncError(async (req, res, next) => {
   const newStudent = req.body;

   //check data exists or not
   if (!newStudent) {
      return next(new ErrorHandler("Data is Must Required !", 404));
   }
   //get password from newStudent
   const { password } = newStudent;

   // check password exists or not
   if (!password) {
      return next(new ErrorHandler("Password is Must Required !", 404));
   }

   // hash password
   const hashedPassword = await hashPassword(password);

   //Store hashed password
   newStudent.password = hashedPassword;

   //insert data to database
   const insertResult = await students.create(newStudent);

   res.status(200).json({
      success: true,
      message: "Student is Inserted",
      result: insertResult,
   });
});

// for getting login page
//url: student/login(get)
exports.studentLoginGet = (req, res, next) => {
   res.status(200).json({
      currentPage: "Student Login page",
   });
};

//for posting student username and password
//url: student/login(post)
exports.studentLoginPost = catchAsyncError(async (req, res, next) => {
   const { username, password } = req.body;

   if (!username || !password) {
      return next(new ErrorHandler("All fields are must required", 403));
   }

   //find student from database
   const student = await students.findOne({ email: username });

   if (!student) {
      return next(new ErrorHandler("Invalid Username or Password ", 403));
   }

   //check password correct or not
   //using hash compare
   if (!(await comparePassword(password, student.password))) {
      return next(new ErrorHandler("Check username and password !", 404));
   }

   //create jwt token using id and collection name
   const token = await generateToken(student._id, students.collection.name);

   //send cookies via response and store
   res.cookie("StudentJwtToken", token, { httpOnly: true });
   res.cookie("collection", students.collection.name, { httpOnly: true });

   res.status(200).json({
      success: true,
      data: student,
   });
   //  return res.redirect('/student/dashboard')
});

// url: /student/dashboard
exports.getStudentDashboard = async (req, res, next) => {
   //get student detail via req.userId
   const student = req.user;

   res.status(200).json({
      success: true,
      currentPage: "Student Dashboard",
      data: student,
   });
};

exports.getStudentsAttendanceReport = async (req, res, next) => {
   const { month, year } = req.params;
   const regno = req.user.regno;
   if (!regno || !month || !year) {
      return next(
         new ErrorHandler(
            "Email and Month and Year is must required for attendance report",
            400
         )
      );
   }

   const studentAttendanceReport = await studentAttendance.find({
      regno,
      month,
      currentYear: year,
   });

   if (studentAttendanceReport.length == 0) {
      return next(new ErrorHandler("Attendance Reports Not Found !", 400));
   }


   let Present = 0, Absent = 0;

   studentAttendanceReport.forEach(({present}) => {
      present ? Present++ : Absent++;
   })

   res.status(200).json({
      success: true,
      currentPage: "Student Attendance Report",
      data: {
         regno,
         present: Present,
         absent : Absent
      }
   });
};
// url : /student/logout
exports.studentLogout = async (req, res, next) => {
   //clear cookie
   res.cookie("StudentJwtToken", "", { httpOnly: true });

   res.status(200).json({
      success: true,
      currentPage: "Student login page",
   });
};
