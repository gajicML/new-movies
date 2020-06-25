import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";

const Homepage = ({ top_rated, dataLoading, fetchPageMovies }) => {
  useEffect(() => {
    fetchPageMovies("top_rated", 1);
  }, []);

  const movies = top_rated.map((movie) => {
    return <Preview key={movie.id} {...movie} />;
  });

  const renderMovies = <div className="page-wrapper">{movies}</div>;

  return <>{dataLoading ? <Loading /> : renderMovies}</>;
};

Homepage.propTypes = {
  fetchPageMovies: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    top_rated: state.movies.top_rated,
    dataLoading: state.movies.dataLoading,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Homepage);
