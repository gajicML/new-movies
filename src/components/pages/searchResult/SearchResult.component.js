import React from "react";
import { fetchSearched } from "../../../redux/actions/fetchActons";
import "./SearchResult.style.scss";
import PropTypes from "prop-types";
import Preview from "../../other/preview/Preview.component";
import { connect } from "react-redux";
import ShowMore from "../../other/showMore/ShowMore.component";

const SearchResult = ({
  searchedMovies,
  searchTerm,
  fetchSearched,
  totalPages,
  searchPage,
}) => {
  const movies = searchedMovies.map((movie, i) => {
    return <Preview key={movie.id + i} movieObj={{ ...movie }} />;
  });

  console.log("page", searchPage);

  const showMore =
    totalPages > searchPage ? (
      <ShowMore
        onClick={() => {
          fetchSearched(searchTerm, searchPage + 1, true);
        }}
      />
    ) : (
      ""
    );

  const renderMovies = (
    <>
      {movies.length === 0 && searchTerm.length > 0 ? (
        <h1 className="no-result">NO SEARCH RESULTS</h1>
      ) : (
        <>
          <h1 className="page-title">Search results:</h1>
          <div className="search_result page-wrapper"> {movies}</div>
          {showMore}
        </>
      )}
    </>
  );
  return renderMovies;
};

SearchResult.propTypes = {
  searchedMovies: PropTypes.array,
};

export default connect(null, { fetchSearched })(SearchResult);
