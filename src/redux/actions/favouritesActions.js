import { FAVOURITES } from "./typesConstants";

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
