import {
  SET_CHECKIN_RESERVATION,
  SET_UNCHECKIN_RESERVATION,
} from "./types/reservation";

const initialState = {
  reservationChecked: [],
  reservationUncheck: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UNCHECKIN_RESERVATION:
      return {
        ...state,
        reservationUncheck: action.payload,
      };
    case SET_CHECKIN_RESERVATION: {
      return {
        ...state,
        reservationChecked: action.payload,
      };
    }
    default:
      return state;
  }
};
