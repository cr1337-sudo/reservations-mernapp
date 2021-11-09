import "./reservation.scss";
import axios from "axios";

const Reservation = ({ data }) => {
  const { year, month, day, hour, jobs, dayId, _id } = data;

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Cancell Date?");

    if (confirmDelete) {
      await axios
        .delete(`/sessions/${dayId}/${_id}`)
        .then(() => alert("Reservation cancelled"))
        .then(() => window.location.reload(false));
    }
  };

  return (
    <div className="card">
      <div className="top-card">
        <h3>{`${day}/${month}/${year} - ${hour}HS`}</h3>
        <hr />
      </div>
      <div className="center-card">
        <ul>
          {jobs?.map((job) => (
            <li>
              <i className="fas fa-chevron-right"></i> {job}
            </li>
          ))}
        </ul>
      </div>
      <form className="footer-card">
        <button type="submit" onClick={handleDelete}>
          CANCELL DATE
        </button>
      </form>
    </div>
  );
};

export default Reservation;
