import React from "react";
import { connect } from "react-redux";
import "./Search.style.scss";
import _, { debounce } from "lodash";
import PropTypes from "prop-types";
import { fetchSearched } from "../../../redux/actions/fetchActons";

const Search = (props) => {
  const { fetchSearched } = props;

  // console.log("searched", searched);

  const onChange = (event) => {
    /* signal to React not to nullify the event object */
    event.persist();

    const debouncedFn = _.debounce(() => {
      let searchString = event.target.value;

      fetchSearched(searchString);
    }, 500);

    debouncedFn();
  };

  return (
    <>
      <div className="search-input">
        <input
          name="search-input"
          autoComplete="off"
          onChange={onChange}
          placeholder="&#61442;  Search movies"
        />
      </div>
    </>
  );
};

Search.propTypes = {
  fetchSearched: PropTypes.func,
};

export default connect(null, { fetchSearched })(Search);
