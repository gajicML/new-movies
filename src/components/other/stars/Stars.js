import React from "react";
import "./Stars.style.scss";

function Stars({ vote_average }) {
  const starTotal = 10;
  const starPercentage = (vote_average / starTotal) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <>
      <div className="stars-outer">
        <div
          className="stars-inner "
          style={{ width: starPercentageRounded }}
        ></div>
      </div>
    </>
  );
}

export default Stars;
