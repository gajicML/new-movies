import { FETCH_MOVIES } from "./typesConstants";

import axiosInstance from "../axiosInstance";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

console.log(
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
);

export const fetchPopularMovies = (page = 1) => (dispatch) => {
  dispatch({ type: FETCH_MOVIES.LOAD });
  axiosInstance
    .get(`popular?api_key=${API_KEY}&language=en-US&page=${page}`)

    .then((response) => {
      let movies = response["data"]["results"];

      dispatch(fetchSuccess(movies));
    })

    .catch((error) => {
      dispatch(fetchFail(error.message));
      console.error(error);
    });
};

const fetchSuccess = (data) => {
  return function (dispatch) {
    dispatch({ type: FETCH_MOVIES.SUCCESS, payload: [...data] });
  };
};

const fetchFail = (errorMessage) => {
  return function (dispatch) {
    dispatch({ type: FETCH_MOVIES.FAIL, payload: errorMessage });
  };
};
