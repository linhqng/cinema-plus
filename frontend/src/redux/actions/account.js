import { BASE_URL } from "../../constants/Config";
import { setAlert } from "./alert";

export const getProfile = () => async (dispatch) => {
  try {
    const url = BASE_URL + "users/me";
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const profile = await response.json();
    if (response.ok) {
      dispatch({ type: "GET_PROFILE", payload: profile });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};
export const uploadImageProfile = (id, image) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("file", image);
    const url = BASE_URL + "users/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(getProfile());
      dispatch(setAlert("Image Uploaded", "success", 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
