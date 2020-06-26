import React from "react";
import "./MovieDetails.style.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import noImg from "../../../assets/noImg.jpg";
import ErrorBoundary from "../../other/errorBoundary/ErrorBoundary.component";
import PropTypes from "prop-types";

const MovieDetails = (props) => {
  if (!props.location.movieId) return <ErrorBoundary />;

  const id = props.location.movieId;

  const fromUrl =
    props.location.from === "/"
      ? "popular"
      : props.location.from.replace("-", "_").substring(1);

  const matchedGroupMovies = props.movies[fromUrl]["movies"];

  let matchedMovie = matchedGroupMovies.filter((movie) => movie.id === id)[0];
  console.log("matchedMovie", matchedMovie);

  const checkAvailability = (arg, desc) =>
    arg ? arg : `${desc} not available`;

  return (
    <div className="movieDetails">
      <h1>{checkAvailability(matchedMovie.title, "Title")}</h1>

      <img
        src={
          matchedMovie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280/${matchedMovie.backdrop_path}`
            : noImg
        }
      />
      <em>Description</em>
      <br />
      <p className="description">
        {checkAvailability(matchedMovie.overview, "Description")}
      </p>
      <br />

      <em>Release Date</em>
      <br />
      <p className="release_date">
        {checkAvailability(matchedMovie.release_date, "Release Date")}
      </p>
      <br />

      <em>Vote average</em>
      <br />
      <p className="vote_average">
        {checkAvailability(matchedMovie.vote_average, "Vote average")}
      </p>
      <br />

      <p className="goBack" onClick={() => props.history.goBack()}>
        {"< "}
        GO BACK
      </p>
    </div>
  );
};

MovieDetails.propTypes = {
  movies: PropTypes.array,
  rest: PropTypes.object,
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    movies: state.movies,
    error: state.movies.error,
  };
};

export default connect(mapStateToProps)(withRouter(MovieDetails));
