import React from "react";
import "./Sidebar.style.scss";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="flex-nav">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="selected">
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink to="/top-rated" activeClassName="selected">
                Top rated
              </NavLink>
            </li>
            <li>
              <NavLink to="/upcoming" activeClassName="selected">
                Upcoming
              </NavLink>
            </li>

            <li>
              <NavLink to="/favourites" activeClassName="selected">
                Favourites
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;
