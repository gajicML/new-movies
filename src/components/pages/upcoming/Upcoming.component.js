import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";

const Upcoming = ({ upcoming, dataLoading, fetchPageMovies }) => {
  useEffect(() => {
    fetchPageMovies("upcoming", 1);
  }, []);

  const movies = upcoming.map((movie) => {
    return <Preview key={movie.id} {...movie} />;
  });

  const renderMovies = <div className="page-wrapper">{movies}</div>;

  return <>{dataLoading ? <Loading /> : renderMovies}</>;
};

Upcoming.propTypes = {
  fetchPageMovies: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log("Upcoming", state);
  return {
    upcoming: state.movies.upcoming,
    dataLoading: state.movies.dataLoading,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Upcoming);
