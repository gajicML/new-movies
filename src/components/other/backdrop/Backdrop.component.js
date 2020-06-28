import React from "react";

import "./Backdrop.style.scss";
import { connect } from "react-redux";
import { toggleSidedrawer } from "../../../redux/actions/favouritesActions";
import PropTypes from "prop-types";

const Backdrop = ({ toggleSidedrawer, show }) => {
  return show ? (
    <div
      className="backdrop"
      // Toggle close mobile menu
      onClick={() => toggleSidedrawer(show)}
    ></div>
  ) : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  toggleSidedrawer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  show: state.movies.show,
});

export default connect(mapStateToProps, { toggleSidedrawer })(Backdrop);
