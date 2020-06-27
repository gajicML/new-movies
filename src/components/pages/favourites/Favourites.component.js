import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Favourites.style.scss";

import Preview from "../../other/preview/Preview.component";

const Favourites = (props) => {
  const { favourites, dataLoading, showMoreLoading } = props;

  const movies = favourites.map((movie) => {
    return <Preview key={movie.id} movieObj={{ ...movie }} />;
  });

  const renderMovies = <div className="page-wrapper">{movies}</div>;

  return (
    <>
      {favourites.length < 1 ? (
        <h1>There are no movies added in this section</h1>
      ) : (
        renderMovies
      )}
    </>
  );
};

Favourites.propTypes = {
  favourites: PropTypes.array,
  dataLoading: PropTypes.bool,
  showMoreLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  // console.log("Upcoming", state);
  return {
    favourites: state.movies.favourites.movies,
    dataLoading: state.movies.dataLoading,
    showMoreLoading: state.movies.showMoreLoading,
  };
};

export default connect(mapStateToProps)(Favourites);
