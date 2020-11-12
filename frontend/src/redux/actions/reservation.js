import { BASE_URL } from "../../constants/Config";
import {
  SET_CHECKIN_RESERVATION,
  SET_PENDING_RESERVATION,
  SET_UNCHECKIN_RESERVATION,
} from "../types/reservation";
import { setAlert } from "./alert";

export const Get_checkin_reservation = () => async (dispatch) => {
  try {
    const url = BASE_URL + "reservations/checkin/true";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({ type: SET_CHECKIN_RESERVATION, payload: res });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Get_uncheck_reservation = () => async (dispatch) => {
  try {
    const url = BASE_URL + "reservations/checkin/false";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({ type: SET_UNCHECKIN_RESERVATION, payload: res });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Checkin_reservation = (id) => async (dispatch) => {
  try {
    const url = BASE_URL + "reservations/checkin-reservation/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(Get_checkin_reservation());
      dispatch(Get_uncheck_reservation());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Change_status_reservation = (id) => async (dispatch) => {
  try {
    const url = BASE_URL + "reservations/change-status/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(Get_checkin_reservation());
      dispatch(Get_uncheck_reservation());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Delete_reservation = (id) => async (dispatch) => {
  try {
    const url = BASE_URL + "reservations/delete/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(Get_checkin_reservation());
      dispatch(Get_uncheck_reservation());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
