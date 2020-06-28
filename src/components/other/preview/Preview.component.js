import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./Preview.style.scss";
import noImg from "../../../assets/noImg.jpg";
import Stars from "../stars/Stars.component";
import FavouriteButton from "../favouriteButton/FavouriteButton.component";
import { isInFavourites, checkAvailability } from "../../../helpers";

import {
  addToFavourites,
  removeFromFavourites,
} from "../../../redux/actions/favouritesActions";

const Preview = (props) => {
  const { title, poster_path, id, vote_average, release_date } = props.movieObj;

  const isFavourite = isInFavourites(id, props.favourites);

  const bg = poster_path
    ? `https://image.tmdb.org/t/p/w342/${poster_path}`
    : noImg;

  const myStyle = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <div className="preview">
      <div className="content">
        <Link
          to={{
            pathname: `/movies/${title.split(" ").join("_").substring(0, 40)}`,
            movieId: id,
            from: props.location.pathname,
          }}
        >
          <div className="background-image" style={myStyle}></div>
        </Link>
        <h1 className="title">
          {title} ({checkAvailability(release_date, "N/A").substring(0, 4)})
        </h1>
        <div className="stars">
          <Stars vote_average={vote_average} />
        </div>

        {isFavourite ? (
          <FavouriteButton onClick={() => props.removeFromFavourites(id)} />
        ) : (
          <FavouriteButton
            add={true}
            onClick={() => props.addToFavourites(props.movieObj)}
          />
        )}
      </div>
    </div>
  );
};

Preview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urlToImage: PropTypes.string,
  content: PropTypes.string,
  vote_average: PropTypes.number,
  addToFavourites: PropTypes.func,
  removeFromFavourites: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    favourites: state.movies.favourites.movies,
  };
};

export default connect(mapStateToProps, {
  addToFavourites,
  removeFromFavourites,
})(withRouter(Preview));
