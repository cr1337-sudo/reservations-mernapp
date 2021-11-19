import AvailableHours from "../../components/availableHours/AvailableHours";
import Calendar from "../../components/calendar/Calendar";
import Jobs from "../../components/jobs/Jobs";
import Summary from "../../components/summary/Summary";
import Fade from "react-reveal/Fade"
import "./home.scss";

const Home = () => {

  return (
    <>
        <Fade top>
    <div className="main-container">
      <div className="left-container">
        <Jobs />
      </div>
      <div className="center-container">
          <Calendar />
        <AvailableHours />
      </div>
      <div className="right-container">
        <Summary />
      </div>
    </div>
    </Fade>
    </>
  );
};

export default Home;
