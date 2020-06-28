import React from "react";
import "./FavouriteButton.style.scss";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";

const FavouriteButton = (props) => {
  return (
    <>
      <div
        className={!props.add ? "full-heart" : "empty-heart"}
        data-tip
        data-for="registerTip"
        onClick={props.onClick}
      ></div>

      <ReactTooltip id="registerTip" place="top" effect="solid">
        Add / Remove from favourites
      </ReactTooltip>
    </>
  );
};

FavouriteButton.propTypes = {
  add: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FavouriteButton;
