import {
  FETCH_MOVIES,
  FETCH_MORE,
  FAVOURITES,
  OTHER,
} from "../actions/typesConstants";

import _ from "loadsh";

const initialState = {
  popular: { movies: [], page: 0 },
  top_rated: { movies: [], page: 0 },
  upcoming: { movies: [], page: 0 },
  favourites: {
    movies: [],
    page: 0,
  },
  searched: { movies: [], page: 0 },
  searchTerm: "",
  dataLoading: false,
  showMoreLoading: false,
  error: false,
  show: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES.LOAD:
      return { ...state, dataLoading: true };

    case FETCH_MOVIES.SUCCESS:
      return {
        ...state,
        [action.payload.type]: {
          movies: action.payload.movies,
          page: action.payload.pageNumber,
        },
        dataLoading: false,
      };

    case FETCH_MOVIES.FAIL:
      return { ...state, errorMessage: action.payload, error: true };

    case FETCH_MORE.LOAD:
      return { ...state, showMoreLoading: true };

    case FETCH_MORE.SUCCESS:
      return {
        ...state,
        [action.payload.type]: {
          movies: [
            ...state[action.payload.type]["movies"],
            ...action.payload.movies,
          ],
          page: action.payload.pageNumber,
        },
        showMoreLoading: false,
      };

    case FETCH_MOVIES.SEARCH:
      let movies = action.payload.isShowMore
        ? [...state.searched.movies, ...action.payload.searched]
        : action.payload.searched;

      // handle advanced search
      if (!_.isEmpty(action.payload.advancedTermData)) {
        let keyword = action.payload.advancedTermData.keyword,
          year = parseInt(action.payload.advancedTermData.year);

        movies = movies.filter((movie) => {
          let movieYear = parseInt(movie.release_date.substring(0, 4));
          return keyword === "after" ? movieYear >= year : movieYear < year;
        });
        console.log(action.payload.advancedTermData);
      }
      return {
        ...state,
        searched: {
          movies: movies,
          page: action.payload.pageNumber,
          totalPages: action.payload.totalPages,
        },
        searchTerm: action.payload.searchTerm,
        dataLoading: false,
      };

    case FAVOURITES.ADD:
      return {
        ...state,
        favourites: {
          movies: [...state.favourites.movies, action.payload],
        },
      };

    case FAVOURITES.REMOVE:
      const favouritesFromState = [...state.favourites.movies];
      const id = action.payload;

      const filtered = favouritesFromState.filter((movie) => {
        return movie.id !== id;
      });

      return {
        ...state,
        favourites: {
          movies: filtered,
        },
      };

    case OTHER.TOGGLE_SIDEDRAWER:
      return {
        ...state,
        show: action.payload,
      };

    default:
      return state;
  }
}
