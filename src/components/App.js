import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout.component";
import MoviesHolder from "./moviesHolder/MoviesHolder.component";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Layout>
            <Router>
              <MoviesHolder />
            </Router>
          </Layout>
        </div>
      </Provider>
    );
  }
}

export default App;
