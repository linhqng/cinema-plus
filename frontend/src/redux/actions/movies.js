import { baseUrl } from "../../common/baseUrl/baseUrl";
import { GET_MOVIES, SELECT_MOVIE, GET_SUGGESTIONS } from "../types/movies";
import { setAlert } from "./alert";

export const onSelectMovie = (movie) => ({
  type: SELECT_MOVIE,
  payload: movie,
});
export const uploadMovieImage = (id, image) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("file", image);
    const url = baseUrl + "/movies/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert("Image Uploaded", "success", 5000));
      dispatch(getMovies());
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const addMovie = (image, newMovie) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = baseUrl + "/movies";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const movie = await response.json();
    if (response.ok) {
      dispatch(setAlert("Movie have been saved!", "success", 2000));
      if (image) dispatch(uploadMovieImage(movie._id, image));
      dispatch(getMovies());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};
export const getMovies = () => async (dispatch) => {
  try {
    const url = baseUrl + "/movies";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_MOVIES, payload: movies });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};

export const updateMovie = (movieId, movie, image) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = baseUrl + "/movies/" + movieId;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    if (response.ok) {
      dispatch(onSelectMovie(null));
      dispatch(setAlert("Movie have been saved!", "success", 2000));
      if (image) dispatch(uploadMovieImage(movieId, image));
      dispatch(getMovies());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};

export const getMovieSuggestion = (id) => async (dispatch) => {
  try {
    const url = baseUrl + "/movies/usermodeling/" + id;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_SUGGESTIONS, payload: movies });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const removeMovie = (movieId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = baseUrl + "/movies/" + movieId;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(getMovies());
      dispatch(onSelectMovie(null));
      dispatch(setAlert("Movie have been Deleted!", "success", 2000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};
export const searchFullTextMovie = (value) => async (dispatch) => {
  try {
    const url = baseUrl + "/movies/search-full/" + value;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_MOVIES, payload: movies });
    }
  } catch {
    dispatch(setAlert("error", "error", 2000));
  }
};
