import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";
import ShowMore from "../../other/showMore/ShowMore.component";

const Homepage = (props) => {
  const {
    popular,
    dataLoading,
    fetchPageMovies,
    page,
    showMoreLoading,
  } = props;

  // console.log("page", page);
  useEffect(() => {
    fetchPageMovies("popular", 1);
  }, []);

  const movies = popular.map((movie) => {
    return <Preview key={movie.id} {...movie} />;
  });

  const renderMovies = (
    <>
      <div className="page-wrapper">{movies}</div>
      <ShowMore
        onClick={() => {
          fetchPageMovies("popular", page + 1, true);
        }}
      />
    </>
  );

  return <>{dataLoading ? <Loading /> : renderMovies}</>;
};

Homepage.propTypes = {
  fetchPageMovies: PropTypes.func,
  popular: PropTypes.array,
  page: PropTypes.number,
  dataLoading: PropTypes.bool,
  showMoreLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  // console.log("Homepage", state);
  return {
    popular: state.movies.popular.movies,
    page: state.movies.popular.page,
    dataLoading: state.movies.dataLoading,
    showMoreLoading: state.movies.showMoreLoading,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Homepage);
