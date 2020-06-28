import { FAVOURITES, OTHER } from "./typesConstants";

export const addToFavourites = (movie) => {
  return function (dispatch) {
    dispatch({ type: FAVOURITES.ADD, payload: movie });
  };
};

export const removeFromFavourites = (id) => {
  console.log(id);
  return function (dispatch) {
    dispatch({ type: FAVOURITES.REMOVE, payload: id });
  };
};

export const toggleSidedrawer = (show) => (dispatch) => {
  dispatch({
    type: OTHER.TOGGLE_SIDEDRAWER,
    payload: !show,
  });
};
