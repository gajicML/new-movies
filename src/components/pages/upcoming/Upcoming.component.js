import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPageMovies } from "../../../redux/actions/fetchActons";

import Preview from "../../other/preview/Preview.component";
import Loading from "../../other/loading/Loading.component";
import ShowMore from "../../other/showMore/ShowMore.component";

const Upcoming = (props) => {
  const {
    upcoming,
    dataLoading,
    fetchPageMovies,
    page,
    showMoreLoading,
  } = props;

  if (upcoming.length < 1) {
    useEffect(() => {
      fetchPageMovies("upcoming", 1);
    }, []);
  }

  const movies = upcoming.map((movie) => {
    return <Preview key={movie.id} movieObj={{ ...movie }} />;
  });

  const renderMovies = (
    <>
      <div className="page-wrapper">{movies}</div>
      <ShowMore
        onClick={() => {
          fetchPageMovies("upcoming", page + 1, true);
        }}
      />
    </>
  );

  return <>{dataLoading ? <Loading /> : renderMovies}</>;
};

Upcoming.propTypes = {
  fetchPageMovies: PropTypes.func,
  upcoming: PropTypes.array,
  page: PropTypes.number,
  dataLoading: PropTypes.bool,
  showMoreLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  // console.log("Upcoming", state);
  return {
    upcoming: state.movies.upcoming.movies,
    page: state.movies.upcoming.page,
    dataLoading: state.movies.dataLoading,
    showMoreLoading: state.movies.showMoreLoading,
  };
};

export default connect(mapStateToProps, { fetchPageMovies })(Upcoming);
