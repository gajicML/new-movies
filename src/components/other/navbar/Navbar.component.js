import React from "react";
import "./Navbar.style.scss";
import Search from "../search/Search.component";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
      <Search />
    </div>
  );
};

export default Navbar;
