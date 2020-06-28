import React from "react";

import { connect } from "react-redux";
import { toggleSidedrawer } from "../../../redux/actions/favouritesActions";
import "./DrawerToggleButton.style.scss";

const DrawerToggleButton = ({ toggleSidedrawer, show }) => {
  return (
    <div
      className="drawerToggle"
      // Toggle open/close side menu
      onClick={() => toggleSidedrawer(show)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show: state.movies.show,
});

export default connect(mapStateToProps, { toggleSidedrawer })(
  DrawerToggleButton
);
