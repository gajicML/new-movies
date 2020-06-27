export const checkAvailability = (arg, desc) =>
  arg ? arg : `${desc} not available`;

export const isInFavourites = (id, favourites) => {
  let found = false;
  if (favourites.some((movie) => movie.id === id)) found = true;
  return found;
};
