import React from "react";

import Sidebar from "../sidebar/Sidebar.component";
import Backdrop from "../backdrop/Backdrop.component";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary.component";
import PropTypes from "prop-types";

import "./Sidedrawer.style.scss";
import { connect } from "react-redux";

const Sidedrawer = (props) => {
  let attachedClasses = props.show ? "sidedrawer open" : "sidedrawer close";

  return (
    <Auxiliary>
      <Backdrop />
      <div className={attachedClasses}>
        <Sidebar />
      </div>
    </Auxiliary>
  );
};

Sidedrawer.propTypes = {
  show: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    show: state.movies.show,
  };
};

export default connect(mapStateToProps)(Sidedrawer);
