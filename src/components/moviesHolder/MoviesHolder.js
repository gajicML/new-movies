import React from "react";

import Auxiliary from "../hoc/Auxiliary/Auxiliary";

import Homepage from "../pages/homepage/Homepage";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

const MoviesHolder = (props) => {
  let moviesHolder = (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );

  return <Auxiliary>{moviesHolder}</Auxiliary>;
};

const mapStateToProps = (state) => ({
  // error: state.movies.error,
});

export default connect(mapStateToProps)(MoviesHolder);
