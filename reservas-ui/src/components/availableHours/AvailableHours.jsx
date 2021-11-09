import "./availableHours.scss";
import { SessionContext } from "../../context/sessionContext/SessionContext";
import { useContext, useEffect, useState } from "react";
import { SummaryContext } from "../../context/summaryContext/SummaryContext";
import { changeHour } from "../../context/summaryContext/SummaryActions.js";
import { ThemeContext } from "../../context/themeContext/ThemeContext";

const AvailableHours = () => {
  const { hours, isFetching } = useContext(SessionContext);
  const {theme} = useContext(ThemeContext)
  const { dispatch } = useContext(SummaryContext);
  const [hour, setHour] = useState("");

  useEffect(() => {
    dispatch(changeHour(hour));
  }, [hour, dispatch]);

  return (
    <div className={`hours-container  ${theme === "light" ? "light" : undefined}`}>
      {isFetching ? (
        <div className="lds-ring spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <form action="">
          {hours[0]?.hours.map((session) => (
            <div
              key={session.hour}
              className={`inputGroup ${
                !session.available ? "nonAvailable" : ""
              }`}
            >
              <input
                id={session.hour}
                name="radio"
                disabled={!session.available}
                type="radio"
                value={session.hour}
                onChange={() => setHour(session.hour)}
              />
              <label htmlFor={session.hour}>{session.hour}HS</label>
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default AvailableHours;
