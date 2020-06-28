import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";
import ShowMore from "../../other/showMore/ShowMore.component";
import SearchResult from "../searchResult/SearchResult.component";

const Homepage = (props) => {
  const {
    popular,
    dataLoading,
    fetchPageMovies,
    page,
    searched,
    searchTerm,
    totalSearchPages,
    searchPage,
  } = props;

  if (popular.length < 1) {
    useEffect(() => {
      fetchPageMovies("popular", 1);
    }, []);
  }

  // console.log("searched", searched);

  const movies = popular.map((movie, i) => {
    return <Preview key={movie.id + i} movieObj={{ ...movie }} />;
  });

  const renderMovies = dataLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="page-title">Popular movies:</h1>
      <div className="page-wrapper">{movies}</div>
      <ShowMore
        onClick={() => {
          fetchPageMovies("popular", page + 1, true);
        }}
      />
    </>
  );

  // console.log("searchTerm", searchTerm);
  // console.log("searched", searched);
  // console.log("totalSearchPages");
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

Homepage.propTypes = {
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
  console.log(state.movies);
  return {
    popular: state.movies.popular.movies,
    page: state.movies.popular.page,
    dataLoading: state.movies.dataLoading,
    searched: state.movies.searched.movies,
    searchTerm: state.movies.searchTerm,
    totalSearchPages: state.movies.searched.totalPages,
    searchPage: state.movies.searched.page,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Homepage);
