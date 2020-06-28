import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Favourites.style.scss";

import Preview from "../../other/preview/Preview.component";
import SearchResult from "../../other/search/SearchResult.component";

const Favourites = (props) => {
  const {
    favourites,
    searched,
    searchTerm,
    totalSearchPages,
    searchPage,
  } = props;

  const movies = favourites.map((movie) => {
    return <Preview key={movie.id} movieObj={{ ...movie }} />;
  });

  const renderMovies = <div className="page-wrapper">{movies}</div>;

  const renderFav =
    favourites.length < 1 ? (
      <h1 className="no-fav-movies">
        There are no movies in Favourites section
      </h1>
    ) : (
      renderMovies
    );

  return (
    <>
      {searchTerm ? (
        <SearchResult
          searchedMovies={searched}
          searchTerm={searchTerm}
          totalPages={totalSearchPages}
          searchPage={searchPage}
        />
      ) : (
        renderFav
      )}
    </>
  );
};

Favourites.propTypes = {
  favourites: PropTypes.array,
  dataLoading: PropTypes.bool,
  searched: PropTypes.array,
  searchTerm: PropTypes.string,
  totalSearchPages: PropTypes.number,
  searchPage: PropTypes.number,
};

const mapStateToProps = (state) => {
  // console.log("Upcoming", state);
  return {
    favourites: state.movies.favourites.movies,
    dataLoading: state.movies.dataLoading,
    searched: state.movies.searched.movies,
    searchTerm: state.movies.searchTerm,
    totalSearchPages: state.movies.searched.totalPages,
    searchPage: state.movies.searched.page,
  };
};

export default connect(mapStateToProps)(Favourites);
