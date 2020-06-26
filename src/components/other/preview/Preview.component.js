import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Preview.style.scss";
import noImg from "../../../assets/noImg.jpg";
import { Link, withRouter } from "react-router-dom";
import Stars from "../stars/Stars";

const Preview = (props) => {
  const { title, poster_path, id, vote_average, release_date } = props;

  const bg = poster_path
    ? `https://image.tmdb.org/t/p/w342/${poster_path}`
    : noImg;
  const myStyle = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <div className="preview">
      <div className="content">
        <Link
          to={{
            pathname: `/movies/${title.split(" ").join("_").substring(0, 40)}`,
            movieId: id,
            from: props.location.pathname,
          }}
        >
          <div className="background-image" style={myStyle}></div>
        </Link>

        <h1 className="title">
          {title} ({release_date.substring(0, 4)})
        </h1>
        <Stars vote_average={vote_average} />
      </div>
    </div>
  );
};

Preview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urlToImage: PropTypes.string,
  content: PropTypes.string,
  vote_average: PropTypes.number,
};

export default withRouter(Preview);
