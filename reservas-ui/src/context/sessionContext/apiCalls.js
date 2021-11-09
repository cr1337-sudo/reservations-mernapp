import { dateChange, sessionOk, sessionError } from "./SessionActions";
import axios from "axios";

export const getSessions = async (dispatch, date) => {
  dispatch(dateChange());
  try {
    const res = await axios.get(
      `days?year=${date.year}&month=${date.month}&day=${date.day}`
    );
    dispatch(sessionOk(res.data));
  } catch {
    dispatch(sessionError());
  }
};
