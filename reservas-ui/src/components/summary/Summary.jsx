import "./summary.scss";
import { useContext, useEffect, useState } from "react";
import { SummaryContext } from "../../context/summaryContext/SummaryContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext/ThemeContext"
import axios from "axios";

const Summary = () => {
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const { services, day, hour } = useContext(SummaryContext);
  const {theme} = useContext(ThemeContext)
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const validateFields = () => {
      if (hour === "") return setError("You must pick an available hour");

      if (services.length === 0)
        return setError("You must select at least one available service");

      return setError(null);
    };
    validateFields();
  }, [services, hour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hour === "" || services.length === 0)
      return setError(
        "You must select al leat one service and pick an available hour"
      );
    await axios
      .post(
        "/days",
        { year: day.day.year, month: day.day.month, day: day.day.day },
        {
          headers: {
            token: user.token,
          },
        }
      )
      .then(() => {
        //month,year,day,hour(str),email,name,jobs[], note:opt
        let data = {
          year: day.day.year,
          month: day.day.month,
          day: day.day.day,
          hour,
          name: user.name,
          email: user.email,
          jobs: services,
          note,
        };
        axios.post("/sessions", data);
      })
      .then(() => {
        setError(null);
        history.push("/reservations");
      })
      .catch(() => setError("Error, please check your data"));
  };
  return (
    <div className={`summary-container ${theme === "light" ? "light" : undefined}`}>
      <h3 className="title">Summary</h3>
      <div className="summary-data">
        <section className="services">
          <h4 className="sub-title">Services</h4>
          {services.map((service) => (
            <p className="service">{service}</p>
          ))}
        </section>
        <section className="date-data">
          <h4 className="sub-title">Appointment Data*</h4>
          <span className="date-title">
            Day:
            <p className="date">
              {day
                ? `${day.day.day}/${day.day.month}/${day.day.year}`
                : "Pick a date"}
            </p>
          </span>
          <span className="hour">
            Hour: <p>{hour ? `${hour} HS` : "-"}</p>
          </span>
          <span className="date-warn">
            <p>
              *A contact number will be provided upon confirmation of your
              reservation.
            </p>

            <p>
              Please remember to confirm your attendance beforehand, preferably
              24 hours previous to the arranged date, otherwise the appointment
              will be cancelled.
            </p>
          </span>
        </section>
        <section className="comment-box">
          <h4 className="sub-title">Additional note (Optional)</h4>
          <textarea
            id="text"
            name="note"
            rows="4"
            placeholder="Additional note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          {error ? <p className="error">{error}</p> : null}
        </section>
        {user ? (
          <form method="POST" className="confirm-data" onSubmit={handleSubmit}>
            <button
              disabled={error ? true : false}
              className={`button-58 ${error ? "disabled" : ""}`}
            >
              Reserve!
            </button>
          </form>
        ) : (
          <section className="login-register">
            <button className="login-btn btn">Login</button>
            <button className="register-btn btn">Register</button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Summary;
