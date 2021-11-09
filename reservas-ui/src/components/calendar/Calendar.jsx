import "./calendar.scss";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../context/sessionContext/SessionContext";
import { getSessions } from "../../context/sessionContext/apiCalls";
import { SummaryContext } from "../../context/summaryContext/SummaryContext";
import {
  changeDate,
  changeHour,
} from "../../context/summaryContext/SummaryActions.js";
import { ThemeContext } from "../../context/themeContext/ThemeContext";

const Calendar = () => {
  const [value, setValue] = useState(new Date());
  const { theme } = useContext(ThemeContext);
  const { dispatch } = useContext(SessionContext);
  const { dispatch: dispatch2 } = useContext(SummaryContext);

  let width = window.innerWidth;
  useEffect(() => {
    width = window.innerWidth;
  }, [window.innerWidth]);

  useEffect(() => {
    //Fetch available hours in each day
    const fetchData = async () => {
      await getSessions(dispatch, {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate(),
      });
    };

    //Date to context
    dispatch2(
      changeDate({
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate(),
      })
    );

    fetchData();
  }, [value, dispatch, dispatch2]);

  return (
    <div
      className={`calendar-container ${
        theme === "light" ? "light" : undefined
      }`}
    >
      <div class="calendar">
        <LocalizationProvider dateAdapter={AdapterDateFns} className="calendar">
          <StaticDatePicker
            displayStaticWrapperAs={`${width < 780 ? "mobile" : "desktop"}`}
            openTo="day"
            minDate={Date.now()}
            maxDate={Date.now() + 5259600000}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              dispatch2(changeHour(""));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Calendar;
