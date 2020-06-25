import { FETCH_MOVIES } from "./typesConstants";

import axiosInstance from "../axiosInstance";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export const fetchPageMovies = (type, page = 1) => (dispatch) => {
  dispatch({ type: FETCH_MOVIES.LOAD });
  axiosInstance
    .get(`${type}?api_key=${API_KEY}&language=en-US&page=${page}`)

    .then((response) => {
      let movies = response["data"]["results"];

      dispatch(fetchSuccess({ movies, type }));
    })

    .catch((error) => {
      dispatch(fetchFail(error.message));
      console.error(error);
    });
};

const fetchSuccess = (data) => {
  const payload = { movies: [...data.movies], type: data.type };
  console.log(payload);
  return function (dispatch) {
    dispatch({ type: FETCH_MOVIES.SUCCESS, payload: payload });
  };
};

const fetchFail = (errorMessage) => {
  return function (dispatch) {
    dispatch({ type: FETCH_MOVIES.FAIL, payload: errorMessage });
  };
};
