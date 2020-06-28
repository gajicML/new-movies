import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";
import ShowMore from "../../other/showMore/ShowMore.component";
import SearchResult from "../searchResult/SearchResult.component";

const TopRated = (props) => {
  const {
    top_rated,
    dataLoading,
    fetchPageMovies,
    page,
    searched,
    searchTerm,
    totalSearchPages,
    searchPage,
  } = props;

  if (top_rated.length < 1) {
    useEffect(() => {
      fetchPageMovies("top_rated", 1);
    }, []);
  }
  const movies = top_rated.map((movie, i) => {
    return <Preview key={movie.id + i} movieObj={{ ...movie }} />;
  });

  const renderMovies = dataLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="page-title">Top rated movies:</h1>

      <div className="page-wrapper">{movies}</div>
      <ShowMore
        onClick={() => {
          fetchPageMovies("top_rated", page + 1, true);
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

TopRated.propTypes = {
  fetchPageMovies: PropTypes.func,
  popular: PropTypes.array,
  page: PropTypes.number,
  dataLoading: PropTypes.bool,
  searched: PropTypes.array,
  searchTerm: PropTypes.string,
  totalSearchPages: PropTypes.number,
  searchPage: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    top_rated: state.movies.top_rated.movies,
    page: state.movies.top_rated.page,
    dataLoading: state.movies.dataLoading,
    searched: state.movies.searched.movies,
    searchTerm: state.movies.searchTerm,
    totalSearchPages: state.movies.searched.totalPages,
    searchPage: state.movies.searched.page,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(TopRated);
