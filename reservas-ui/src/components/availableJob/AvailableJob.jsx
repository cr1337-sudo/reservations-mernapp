import "./availableJob.scss";

const AvailableJob = ({ title, desc, handleSelect }) => {

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
