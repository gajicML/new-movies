import React from "react";
import "./ShowMore.style.scss";

const ShowMore = ({ onClick }) => {
  return (
    <div className="show-more" onClick={onClick}>
      ShowMore
    </div>
  );
};

export default ShowMore;
