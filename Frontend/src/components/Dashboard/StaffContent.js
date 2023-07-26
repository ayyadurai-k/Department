import { useEffect, useState } from 'react'
import Profile from './Profile'
import generateMonthArray from '../../utils/generateMonthArray';
import useDetails from '../../hooks/useDetails';
import Report from './Report';
import useAttendance from '../../hooks/useAttendance';
import useSearch from '../../hooks/useSearch';


const StaffContent = () => {
    const [month, setMonth] = useState([]);
    const { radio, error, setRadio, setError, input, handleChange, handleSubmit } = useDetails()
    const attendanceHook = useAttendance();
    useEffect(() => {
        setMonth(generateMonthArray());
    }, [])

    // search hoolk

    const searchHook = useSearch();
    return (
        <>
            <Profile />
            <div className=" w-11/12 rounded mx-auto">
                <div className=" mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="">
                            <div className=" p-5 rounded-xl shadow-2xl bg-gradient-to-r from-rose-400 to-red-500">
                                <h1 className="font-bold  text-2xl">Attendance</h1>
                                <div className="mt-5 flex flex-col">
                                    <label className="ml-1">
                                        <span className="font-bold text-gray-800">Department</span>
                                        <select
                                            name="dept"
                                            value={attendanceHook.input.dept}
                                            onChange={attendanceHook.handleChange}
                                            className="rounded ml-2 outline-none"
                                        >
                                            <option value="null">Dept</option>
                                            <option value="cs">CS</option>
                                            <option value="it">IT</option>
                                        </select>
                                    </label>
                                    <label className="ml-16">
                                        <span className="font-bold text-gray-800 mt-2">Year</span>
                                        <select
                                            name="year"
                                            value={attendanceHook.input.year}
                                            onChange={attendanceHook.handleChange}
                                            className="rounded ml-2 outline-none mt-2"
                                        >
                                            <option value="null">Year</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </label>
                                </div>
                                {attendanceHook.error && (
                                    <div className="mt-8 font-bold text-black">
                                        {attendanceHook.error}
                                    </div>
                                )}
                                <div className="flex justify-center mt-3">
                                    <button
                                        onClick={attendanceHook.handleSubmit}
                                        className="  px-4 py-1 rounded-md border-white bg-white font-bold text-rose-500 shadow-xl hover:bg-gray-300 "
                                    >
                                        Go
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Report />
                        <div className="">
                            <div className="rounded-xl p-4 shadow-xl bg-gradient-to-r from-amber-500 to-pink-500">
                                <h1 className="font-bold  text-2xl">Search Students</h1>
                                <div className="flex mt-3">
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="eg : 2021ITC005"
                                        className="outline-none px-2 py-0.5 rounded "
                                        onChange={searchHook.handleChange}
                                        value={searchHook.input}
                                    ></input>
                                    <button
                                        onClick={searchHook.handleSubmit}
                                        className={`bg-white rounded ml-2 hover:cursor-pointer `}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {searchHook.error && (
                                    <div className="font-bold mt-1">{searchHook.error}</div>
                                )}
                                <div className="bg-white rounded-xl mt-2 p-2 ">
                                    {!searchHook.load && searchHook.searchResult !== null && (
                                        <div className=" ">
                                            <div className="flex font-bold">
                                                <label>Name : </label>
                                                <p className="ml-2">Ayyadurai</p>
                                            </div>
                                            <div className="flex font-bold">
                                                <label>Reg No : </label>
                                                <p className="ml-2">2021ITC005</p>
                                            </div>
                                            <div className="flex font-bold">
                                                <label>Dept : </label>
                                                <p className="ml-2">IT</p>
                                            </div>
                                        </div>
                                    )}
                                    {searchHook.searchResult === null && (
                                        <div className="m-5  ">
                                            <h1 className="text-center text-gray-700 font-bold text-xl">
                                                No Data Found
                                            </h1>
                                        </div>
                                    )}
                                    {searchHook.load && (
                                        <div className="m-5  flex justify-center">
                                            <div role="status">
                                                <svg
                                                    aria-hidden="true"
                                                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"
                                                    />
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-teal-400 w-4/5 mx-auto rounded-2xl p-5 mb-20 mt-5">
                <h1 className="text-3xl font-bold text-center lg:text-left">Details</h1>
                <div className="my-2 flex flex-wrap">
                    <label className="m-1 font-bold">
                        <input
                            type="radio"
                            name="report"
                            onChange={() => {
                                setRadio({ select: "SD" });
                                setError(null);
                            }}
                        ></input>
                        <span className="ml-1">Students Details</span>
                    </label>
                    <label className="m-1 lg:ml-2 font-bold">
                        <input
                            type="radio"
                            name="report"
                            onChange={() => {
                                setRadio({ select: "AD" });
                                setError(null);
                            }}
                        ></input>
                        <span className="ml-1">Attendance Details</span>
                    </label>
                    <label className="bg-white px-3 py-1 ml-5 rounded-xl font-bold hover:cursor-pointer">
                        Staff Details
                    </label>
                </div>
                <div
                    className={`grid grid-cols-1   mt-7 gap-3 ${radio.select === "AD" ? "lg:grid-cols-4" : "lg:grid-cols-3"
                        }`}
                >
                    <div className=" flex">
                        <div className="mx-auto">
                            <label className="font-bold">Department</label>
                            <select
                                name="dept"
                                value={input.dept}
                                onChange={handleChange}
                                className="font-bold outline-none ml-2  rounded-lg px-3 py-0.5"
                            >
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="null"
                                >
                                    Dept
                                </option>
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="cs"
                                >
                                    CS
                                </option>
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="it"
                                >
                                    IT
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className=" flex">
                        <div className="mx-auto">
                            <label className="font-bold">Year</label>
                            <select
                                name="year"
                                value={input.year}
                                onChange={handleChange}
                                className="font-bold outline-none ml-2  rounded-lg px-3 py-0.5"
                            >
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="null"
                                >
                                    Year
                                </option>
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="1"
                                >
                                    1
                                </option>
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="2"
                                >
                                    2
                                </option>
                                <option
                                    className="font-bold px-2 py-1 hover:bg-teal-400"
                                    value="3"
                                >
                                    3
                                </option>
                            </select>
                        </div>
                    </div>
                    {radio.select === "AD" && (
                        <div className=" flex">
                            <div className="mx-auto">
                                <label className="font-bold">Month</label>
                                <select
                                    name="month"
                                    value={input.month}
                                    onChange={handleChange}
                                    className="font-bold outline-none ml-2  rounded-lg px-3 py-0.5"
                                >
                                    <option
                                        className="font-bold px-2 py-1 hover:bg-teal-400"
                                        value="null"
                                    >
                                        Month
                                    </option>
                                    {month.map((monthNum) => {
                                        return (
                                            <option
                                                className="font-bold px-2 py-1 hover:bg-teal-400"
                                                value={monthNum}
                                                key={monthNum}
                                            >
                                                {monthNum}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    )}
                    <div className=" flex">
                        <div className="mx-auto">
                            <button
                                onClick={handleSubmit}
                                disabled={!radio.select ? true : false}
                                className="bg-white font-bold px-3 py-1 rounded-xl mt-auto"
                            >
                                Get Data &gt;
                            </button>
                        </div>
                    </div>
                </div>
                <p className={`font-light text-red-800 mt-2 ${!error && "hidden"}`}>
                    {error}
                </p>
            </div>
        </>
    );
};

export default StaffContent;
