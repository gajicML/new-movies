import { FETCH_MOVIES, FETCH_MORE } from "./typesConstants";
import _ from "loadsh";

import axiosInstance from "../axiosInstance";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export const fetchPageMovies = (type, page, isShowMore) => (dispatch) => {
  isShowMore
    ? dispatch({ type: FETCH_MORE.LOAD })
    : dispatch({ type: FETCH_MOVIES.LOAD });

  axiosInstance
    .get(`movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`)

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

export const fetchSearched = (searchTerm, page = 1, isShowMore) => (
  dispatch
) => {
  dispatch({ type: FETCH_MOVIES.LOAD });

  if (searchTerm.length < 3)
    return dispatch({
      type: FETCH_MOVIES.SEARCH,
      payload: { searched: [], searchTerm: "" },
    });

  // advanced search, before after
  let advancedTermData = checkSearchTerm(searchTerm);

  if (_.isEmpty(advancedTermData)) {
    getSearched(searchTerm, page, isShowMore, dispatch);
  } else {
    getSearched(
      advancedTermData.searchTerm,
      page,
      isShowMore,
      dispatch,
      advancedTermData
    );
  }
};

const getSearched = (
  searchTerm,
  page,
  isShowMore,
  dispatch,
  advancedTermData
) => {
  axiosInstance
    .get(
      `search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    )

    .then((response) => {
      // console.log("response", response);
      const unsorted = response["data"]["results"],
        totalPages = response["data"]["total_pages"],
        pageNumber = response["data"]["page"];

      const searched = unsorted.sort((a, b) => b.vote_average - a.vote_average);

      dispatch({
        type: FETCH_MOVIES.SEARCH,
        payload: {
          searched,
          searchTerm,
          pageNumber,
          totalPages,
          isShowMore,
          advancedTermData,
        },
      });
    })

    .catch((error) => {
      dispatch(fetchFail(error.message));
      console.error(error);
    });
};

const checkSearchTerm = (searchTerm) => {
  const keywords = ["before", "after"];
  let splitArr = searchTerm.trim().split(" ");
  let returnMovieData = {};

  keywords.forEach((keyword) => {
    let keywordIndex = splitArr.indexOf(keyword);
    let nextWord = splitArr[keywordIndex + 1];

    // Search movies with query string 'my life', release date after and including 2015
    // EXAMPLE:
    // my life after 2015
    if (
      // does keyword exist in searchTerm?
      splitArr.includes(keyword) &&
      // is not first element?
      keywordIndex > 0 &&
      // is number next word after keyword
      /^\d+$/.test(nextWord) &&
      // length of year must be four digit
      nextWord.length === 4
    ) {
      returnMovieData = {
        searchTerm: splitArr.slice(0, keywordIndex).join(" "),
        keyword: keyword,
        year: nextWord,
      };
    }
  });
  return returnMovieData;
};
