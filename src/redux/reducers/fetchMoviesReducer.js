import { FETCH_MOVIES, FETCH_MORE } from "../actions/typesConstants";

const initialState = {
  popular: { movies: [], page: 0 },
  top_rated: { movies: [], page: 0 },
  upcoming: { movies: [], page: 0 },
  dataLoading: false,
  showMoreLoading: false,
  error: false,
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

    default:
      return state;
  }
}
