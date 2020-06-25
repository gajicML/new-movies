import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";

const Homepage = ({ popular, dataLoading, fetchPageMovies }) => {
  useEffect(() => {
    fetchPageMovies("popular", 1);
  }, []);

  const movies = popular.map((movie) => {
    return <Preview key={movie.id} {...movie} />;
  });

  const renderMovies = <div className="page-wrapper">{movies}</div>;

  return <>{dataLoading ? <Loading /> : renderMovies}</>;
};

Homepage.propTypes = {
  fetchPageMovies: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log("Homepage", state);
  return {
    popular: state.movies.popular,
    dataLoading: state.movies.dataLoading,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Homepage);
