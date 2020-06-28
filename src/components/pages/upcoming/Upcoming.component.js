import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";
import ShowMore from "../../other/showMore/ShowMore.component";
import SearchResult from "../searchResult/SearchResult.component";

const Upcoming = (props) => {
  const {
    upcoming,
    dataLoading,
    fetchPageMovies,
    page,
    searched,
    searchTerm,
    totalSearchPages,
    searchPage,
  } = props;

  if (upcoming.length < 1) {
    useEffect(() => {
      fetchPageMovies("upcoming", 1);
    }, []);
  }

  const movies = upcoming.map((movie, i) => {
    return <Preview key={movie.id + i} movieObj={{ ...movie }} />;
  });

  const renderMovies = dataLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="page-title">Upcoming movies:</h1>
      <div className="page-wrapper">{movies}</div>
      <ShowMore
        onClick={() => {
          fetchPageMovies("upcoming", page + 1, true);
        }}
      />
    </>
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
        renderMovies
      )}
    </>
  );
};

Upcoming.propTypes = {
  fetchPageMovies: PropTypes.func,
  upcoming: PropTypes.array,
  page: PropTypes.number,
  dataLoading: PropTypes.bool,
  searched: PropTypes.array,
  searchTerm: PropTypes.string,
  totalSearchPages: PropTypes.number,
  searchPage: PropTypes.number,
};

const mapStateToProps = (state) => {
  // console.log("Upcoming", state);
  return {
    upcoming: state.movies.upcoming.movies,
    page: state.movies.upcoming.page,
    dataLoading: state.movies.dataLoading,
    searched: state.movies.searched.movies,
    searchTerm: state.movies.searchTerm,
    totalSearchPages: state.movies.searched.totalPages,
    searchPage: state.movies.searched.page,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Upcoming);
