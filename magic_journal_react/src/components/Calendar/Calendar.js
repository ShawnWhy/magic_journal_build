import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./Calendar.css";
import { useState } from "react";
import API from "../../utils/API";
import { distribute } from "gsap";
import { MyContext } from "../../contexts/myContext";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var firstDay = new Date(year, month, 1);
var lastDay = new Date(year, month + 1, 0);
var firstDayIndex = firstDay.getDay();
var lastDayIndex = lastDay.getDate();
var nextMonth = month + 1;
var nextYear = year + 1;
var prevMonth = month - 1;
var prevYear = year - 1;

const Calendar = () => {
  //create a calendar component that shows a calendar with the current month and year that lists the days in a table
  //each day should be a clickable link that takes you to the spread page for that day

  const [calendarMode, setCalendarMode] = useState("journal");
  const [calendarDays, setCalendarDays] = useState([]);

  const { userProfile, setUserProfile } = useContext(MyContext);

  const [monthDisplay, setMonthDisplay] = useState(month);
  const [yearDisplay, setYearDisplay] = useState(year);
  const [fistDayIndexDisplay, setFirstDayIndexDisplay] =
    useState(firstDayIndex);
  //get a list of the days in the current month

  function setCalendarModeFunction(mode) {
    setCalendarMode(mode);

  }

  useEffect(() => {
    createCalendarDays();
  }, [calendarMode]);

  function nextMonthFunction() {
    if (month==11) {
      console.log("next month if ", nextMonth );
      console.log("next month if ", month );
      month = 0;
      prevYear++;
      nextYear++;
      year++;
      prevMonth = 11;
      nextMonth = 1;
      // nextMonth = 1;
      firstDay = new Date(year, month, 1);
      lastDay = new Date(year, month + 1, 0);
      firstDayIndex = firstDay.getDay();
      lastDayIndex = lastDay.getDate();
      setMonthDisplay(month);
      setYearDisplay(year);
      createCalendarDays();
      setFirstDayIndexDisplay(firstDayIndex);
    } else {
      console.log("next month else");
      console.log(month);
      console.log(nextMonth);

      month++;
      nextMonth++;
      prevMonth++;
      firstDay = new Date(year, month, 1);
      lastDay = new Date(year, month + 1, 0);
      firstDayIndex = firstDay.getDay();
      lastDayIndex = lastDay.getDate();
      setFirstDayIndexDisplay(firstDayIndex);
      console.log("month hase changed" + month);
      setMonthDisplay(month);
      createCalendarDays();
    }
  }

  function prevMonthFunction() {
    console.log("prev month");
    if (month == 0) {
      console.log("prev month if ", prevMonth );
      console.log("prev month if ", month );
      month = 11;
      prevYear--;
      year--;
      prevMonth = 10;
      nextMonth = 0;
      firstDay = new Date(year, month, 1);
      lastDay = new Date(year, month + 1, 0);
      firstDayIndex = firstDay.getDay();
      lastDayIndex = lastDay.getDate();
      setMonthDisplay(month);
      setYearDisplay(year);
      createCalendarDays();
      setFirstDayIndexDisplay(firstDayIndex);
    } else {
      console.log("prev month else");
      console.log("prev month else ", prevMonth );
      console.log(month);

      month --;
      prevMonth--;
      nextMonth--;
      firstDay = new Date(year, month, 1);
      lastDay = new Date(year, month + 1, 0);
      firstDayIndex = firstDay.getDay();
      lastDayIndex = lastDay.getDate();
      setFirstDayIndexDisplay(firstDayIndex);
      console.log("month hase changed" + month);
      setMonthDisplay(month);
      createCalendarDays();
    }
  }

  // useEffect(() => {
  //   console.log("use effect, month or year changed");

  //    createCalendarDays();
  // } ,[monthDisplay]);

  function distributeMonth(data) {
    var calendarDaysTemp = monthDays;
    console.log("distributing month");
    console.log(calendarDaysTemp);
    console.log("journals data");
    console.log(data);
    data.forEach((journal) => {
      if (journal.date === undefined) {
        journal.date = journal.createdAt.slice(0, 10);
      }
      let date = journal.date;
      for (let i = 0; i < calendarDaysTemp.length; i++) {
        // console.log(calendarDays[i].dateFormated);
        if (calendarDaysTemp[i].dateFormated === date) {
          console.log("found a match");
          console.log(i);
          console.log(calendarDaysTemp[i]);
          calendarDaysTemp[i].list.push(journal);
          console.log("calendar days temp");
          console.log(calendarDaysTemp);
          // setCalendarDays(calendarDaysTemp);
        }
      }
    });
    setCalendarDays(calendarDaysTemp);
  }

  function distributeMonth2() {
    var calendarDaysTemp = monthDays;
    console.log("distributing month2");
    console.log(calendarDaysTemp);
    setCalendarDays(calendarDaysTemp);
    // setCalendarDays(calendarDaysTemp);
  }
  //get this month's journals
  function getMonthJournals() {
    console.log("getting journals");
    console.log(month);
    console.log(year);
    API.getJournalsByMonth({
      month: month,
      year: year,
      id: userProfile.id,
    }).then((res) => {
      console.log("got month journals");
      console.log(res.data);
      distributeMonth(res.data);
    }).catch = (err) => {
      console.log(err);
      distributeMonth2();
    };
  }

  function getMonthDreams() {
    console.log("getting dreams");
    console.log(month);
    console.log(year);
    API.getDreamsByMonth({
      month: month,
      year: year,
      id: userProfile.id,
    }).then((res) => {
      console.log("got month dreams");
      console.log(res.data);
      distributeMonth(res.data);
    }).catch = (err) => {
      console.log(err);
      distributeMonth2();
    };
  }

    function getMonthSpreads() {
      console.log("getting spreads");
      console.log(month);
      console.log(year);
      API.getMonthSpreads({
        month: month,
        year: year,
        id: userProfile.id,
      }).then((res) => {
        console.log("got month spreads");
        console.log(res.data);
        distributeMonth(res.data);
      }).catch = (err) => {
        console.log(err);
        distributeMonth2();
      };
    }


  //get this month's dreams

  //get this month's spreads

  let monthDays = [];
  function createCalendarDays() {
    monthDays = [];
    console.log("creating calendar days");
    console.log("month " + month);
    console.log("year " + year);
    console.log("first day " + firstDay);
    console.log("last day " + lastDay);
    console.log("first day Index " + firstDayIndex);
    console.log("last day Index " + lastDayIndex);

    for (let i = firstDayIndex; i > 0; i--) {
      monthDays.push(" ");
    }
    for (let i = 1; i <= lastDayIndex; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      let monthTemp;
      if (month + 1 < 10) {
        monthTemp = "0" + (month + 1);
      } else {
        monthTemp = month + 1;
      }
      monthDays.push({
        date: i,
        dateFormated: year + "-" + monthTemp + "-" + i,
        list: [],
      });
      if (i === lastDayIndex) {
        let lastDayofWeek = new Date(year, month, lastDayIndex).getDay();

        for (let j = 1; j < 7 - lastDayofWeek; j++) {
          monthDays.push(" ");
        }
      }
    }
    switch (calendarMode) {
      case "journal":
        getMonthJournals();
        break;
      case "dream":
        getMonthDreams();
        break;
      case "spread":
        getMonthSpreads();
        break;
    }
   
  }

  useEffect(() => {
    createCalendarDays();
    // setTimeout(() => {
    //   getMonthJournals();
    // }, 1000);
  }, []);

  // useEffect(() => {
  //   getMonthJournals();
  // },[monthDays]);

  return (
    <div className="Calendarcontainer">
      <h1>Calendar</h1>
      <div className="calendar">
        <div className="calendarHeader">
          <button onClick={() => setCalendarModeFunction("journal")}>
            Journal
          </button>
          <button onClick={() => setCalendarModeFunction("dream")}>
            Dream
          </button>
          <button onClick={() => setCalendarModeFunction("spread")}>
            Spread
          </button>
          <div className="yearTravel">
            <button onClick={prevMonthFunction}>Prev</button>
            <h1>
              {yearDisplay} {months[monthDisplay]}
            </h1>
            <button onClick={nextMonthFunction}>Next</button>
          </div>
        </div>
        <div className="calendarDays">
          {days.map((day) => (
            <div key={day} className="calendarDay">
              <div>{day}</div>
            </div>
          ))}
        </div>
        <div className="calendarDates">
          {calendarDays.map((day, index) => (
            <div
              key={day.date}
              className={`calendarDate ${
                day.list && day.list.length > 0 ? " calendarSelected" : ""
              }`}
            >
              {day.list && day.list.length > 0 ? (
                calendarMode === "journal" ? (
                  <a href={`/daysJournal/${day.list[0].date}`}>
                    {day.list[0].date}
                  </a>
                ) : calendarMode === "dream" ? (
                  <a href={`/daysDreams/${day.list[0].date}`}>
                    {day.list[0].date}
                  </a>
                ) : (
                  <div>
                    <div>{day.dateFormated}</div>
                    <div className="spreadList">
                    {day.list.map((spread) => {
                      return (
                        <a
                          className="spreadListItem"
                          href={`/spreadPage/${spread.id}`}
                        >
                          {spread.id}
                        </a>
                      );
                    })}
                    </div>
                  </div>
                )
              ) : index > fistDayIndexDisplay - 1 && day !== " " ? (
                <div>{day.dateFormated}</div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
