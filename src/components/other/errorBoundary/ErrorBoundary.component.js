import React from "react";

import "./ErrorBoundary.style.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ErrorBoundary = ({ message }) => {
  const messageHandle = message ? (
    message
  ) : (
    <>
      <h3>Check the console for details</h3>
      <br />
      <br />
      <Link className="go-home" to="/">
        GO HOME
      </Link>
    </>
  );

  return (
    <div className="error-boundary">
      <h1> ERROR HAPPEND </h1>

      <h2>Details:</h2>
      <h2>
        <code>{messageHandle}</code>
      </h2>
    </div>
  );
};

ErrorBoundary.propTypes = {
  message: PropTypes.string,
};

export default ErrorBoundary;
