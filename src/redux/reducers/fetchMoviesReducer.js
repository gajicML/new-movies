import { FETCH_MOVIES } from "../actions/typesConstants";

const initialState = {
  popular: [],
  top_rated: [],
  upcoming: [],
  dataLoading: false,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES.LOAD:
      return { ...state, dataLoading: true };

    case FETCH_MOVIES.SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        [action.payload.type]: action.payload.movies,
        dataLoading: false,
      };

    case FETCH_MOVIES.FAIL:
      return { ...state, errorMessage: action.payload, error: true };

    default:
      return state;
  }
}
