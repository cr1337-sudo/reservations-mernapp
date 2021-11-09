import "./availableJob.scss";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import {useContext} from "react"

const AvailableJob = ({ title, desc, handleSelect }) => {

  const {theme} = useContext(ThemeContext)

  return (
    <article className="job">
      <input type="checkbox" value={title} onChange={handleSelect}/>
      <span>
        {title}
        <p className="desc">{desc}</p>
      </span>
    </article>
  );
};

export default AvailableJob;
