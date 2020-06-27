import React from "react";

import Auxiliary from "../hoc/Auxiliary/Auxiliary.component";

import Homepage from "../pages/homepage/Homepage.component";
import TopRated from "../pages/toprated/TopRated.component";
import Upcoming from "../pages/upcoming/Upcoming.component";
import Favourites from "../pages/favourites/Favourites.component";
import MovieDetails from "../pages/movieDetails/MovieDetails.component";

import Navbar from "../other/navbar/Navbar.component";
import Sidebar from "../other/sidebar/Sidebar.component";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./MoviesHolder.style.scss";

const MoviesHolder = () => {
  let moviesHolder = (
    <div className="movies-holder">
      <header className="flex-header">
        {" "}
        <Navbar />
      </header>
      <main className="flex-main">
        <nav className="flex-nav">
          <Sidebar />
        </nav>

        <article className="flex-article">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/favourites" component={Favourites} />
            <Route path="/movies/:id" component={MovieDetails} />
          </Switch>
        </article>
      </main>
    </div>
  );

  return <Auxiliary>{moviesHolder}</Auxiliary>;
};

const mapStateToProps = (state) => ({
  // error: state.movies.error,
});

export default connect(mapStateToProps)(MoviesHolder);
