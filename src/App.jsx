import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [age, setAge] = useState({
    years: "--",
    months: "--",
    days: "--",
  });

  function handleOnchange() {
    // clear all errors
    setDayError("");
    setMonthError("");
    setYearError("");

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    let hasError = false;

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      setDayError("Must be a valid day");
      hasError = true;
    }
    if (day.length === 0) {
      setDayError("This field cannot be empty");
      hasError = true;
    }

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      setMonthError("Must be a valid month");
      hasError = true;
    }
    if (month.length === 0) {
      setMonthError("This field cannot be empty");
      hasError = true;
    }
    if (isNaN(yearNum) || yearNum < 1) {
      setYearError("Must be a valid year");
      hasError = true;
    }
    if (year.length === 0) {
      setYearError("This field cannot be empty");
      hasError = true;
    }

    if (hasError) {
      setAge({ years: "--", months: "--", days: "--" });
      return;
    }

    const dob = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();

    if (dob > today) {
      setYearError("Must be in the past");
      hasError = true;
    }

    // calculating differences
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDay() - dob.getDay();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
      days += previousMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  }
  return (
    <>
      <div className="bg-white p-10 pb-20 pt-20 rounded-3xl rounded-br-[125px]">
        <div className="flex w-full gap-5 justify-between">
          <div className="flex flex-col w-28 gap-1">
            <label className="font-bold text-smokey-grey" htmlFor="day">
              DAY
            </label>
            <input
              className={`day ${
                dayError ? "error" : ""
              } text-[25px] rounded-lg p-6 border border-light-grey h-10 outline-none pl-2 font-bold`}
              type="text"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
            />
            {dayError && (
              <p className="text-light-red italic text-[13px]">{dayError}</p>
            )}
          </div>

          <div className="flex flex-col w-28 gap-1">
            <label className="font-bold text-smokey-grey" htmlFor="month">
              MONTH
            </label>
            <input
              className="text-[25px] rounded-lg p-6 border border-light-grey h-10 outline-none pl-2 font-bold"
              type="text"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
            />
            {monthError && (
              <p className="text-light-red italic text-[13px]">{monthError}</p>
            )}
          </div>

          <div className="flex flex-col w-28 gap-1">
            <label className="font-bold text-smokey-grey" htmlFor="year">
              YEAR
            </label>
            <input
              className="text-[25px] rounded-lg p-6 border border-light-grey h-10 outline-none pl-2 font-bold"
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
            />
            {yearError && (
              <p className="text-light-red italic text-[13px]">{yearError}</p>
            )}
          </div>
        </div>

        {/* next item */}
        <div
          onClick={handleOnchange}
          className="border-b border-b-light-grey relative mt-20 justify-center flex items-center transition-all ease-in-out"
        >
          <div className="bg-purple p-3 rounded-full w-fit cursor-pointer absolute transition-all ease-in-out hover:bg-off-black ">
            <img className="w-8" src="/icon-arrow.svg" alt="arrow" />
          </div>
        </div>

        {/* next item */}

        <div className="mt-16 text-6xl font-extrabold">
          <h1>
            <span className="text-purple">{age.years}</span> years
          </h1>
          <h1>
            <span className="text-purple">{age.months}</span> months
          </h1>
          <h1>
            <span className="text-purple">{age.days}</span> days
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
