import { combineReducers } from "redux";

import alert from "./alert";
import cinemas from "./cinemas";
import movies from "./movies";
import auth from "./auth";
import showtimes from "./showtimes";
import users from "./user";
import profile from "./profile";
import promotion from "./promotion";
export default combineReducers({
  alertState: alert,
  movieState: movies,
  cinemaState: cinemas,
  showtimeState: showtimes,
  authState: auth,
  userState: users,
  profileState: profile,
  promotionState: promotion,
});
