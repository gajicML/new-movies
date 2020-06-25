import React, { useEffect } from "react";
import "./Homepage.style.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPopularMovies } from "../../../redux/actions/fetchActons";

const Homepage = ({ fetchPopularMovies }) => {
  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  return <h1>Homepage</h1>;
};

Homepage.propTypes = {
  fetchPopularMovies: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    topPopular: state.movies.topPopular,
    dataLoading: state.movies.dataLoading,
  };
};

export default connect(mapStateToProps, { fetchPopularMovies })(Homepage);
