import { FETCH_MOVIES, FETCH_MORE } from "./typesConstants";

import axiosInstance from "../axiosInstance";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export const fetchPageMovies = (type, page, isShowMore) => (dispatch) => {
  isShowMore
    ? dispatch({ type: FETCH_MORE.LOAD })
    : dispatch({ type: FETCH_MOVIES.LOAD });

  axiosInstance
    .get(`${type}?api_key=${API_KEY}&language=en-US&page=${page}`)

    .then((response) => {
      let movies = response["data"]["results"];
      let pageNumber = response["data"]["page"];
      isShowMore
        ? dispatch(fetchMoreSuccess({ movies, type, pageNumber }))
        : dispatch(fetchSuccess({ movies, type, pageNumber }));
    })

    .catch((error) => {
      dispatch(fetchFail(error.message));
      console.error(error);
    });
};

const fetchSuccess = (data) => {
  const payload = {
    movies: [...data.movies],
    type: data.type,
    pageNumber: data.pageNumber,
  };
  return function (dispatch) {
    dispatch({ type: FETCH_MOVIES.SUCCESS, payload: payload });
  };
};

const fetchFail = (errorMessage) => {
  return function (dispatch) {
    dispatch({ type: FETCH_MOVIES.FAIL, payload: errorMessage });
  };
};

const fetchMoreSuccess = (data) => {
  const payload = {
    movies: [...data.movies],
    type: data.type,
    pageNumber: data.pageNumber,
  };
  return function (dispatch) {
    dispatch({ type: FETCH_MORE.SUCCESS, payload: payload });
  };
};
