import React from "react";
import "./FavouriteButton.style.scss";
import ReactTooltip from "react-tooltip";

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
        Add/Remove from favourites
      </ReactTooltip>
    </>
  );
};

export default FavouriteButton;
