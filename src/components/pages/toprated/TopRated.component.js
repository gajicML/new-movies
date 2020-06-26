import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";
import ShowMore from "../../other/showMore/ShowMore.component";

const TopRated = (props) => {
  const {
    top_rated,
    dataLoading,
    fetchPageMovies,
    page,
    showMoreLoading,
  } = props;

  useEffect(() => {
    fetchPageMovies("top_rated", 1);
  }, []);

  const movies = top_rated.map((movie) => {
    return <Preview key={movie.id} {...movie} />;
  });

  const renderMovies = (
    <>
      <div className="page-wrapper">{movies}</div>
      <ShowMore
        onClick={() => {
          fetchPageMovies("top_rated", page + 1, true);
        }}
      />
    </>
  );

  return <>{dataLoading ? <Loading /> : renderMovies}</>;
};

TopRated.propTypes = {
  fetchPageMovies: PropTypes.func,
  top_rated: PropTypes.array,
  page: PropTypes.number,
  dataLoading: PropTypes.bool,
  showMoreLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    top_rated: state.movies.top_rated.movies,
    page: state.movies.top_rated.page,
    dataLoading: state.movies.dataLoading,
    showMoreLoading: state.movies.showMoreLoading,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(TopRated);
