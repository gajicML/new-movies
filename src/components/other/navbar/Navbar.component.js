import React from "react";
import "./Navbar.style.scss";
import Search from "../search/Search.component";
import logo from "../../../assets/logo.png";
import DrawerToggleButton from "../sideDrawer/DrawerToggleButton.component";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo" style={{ backgroundImage: `url(${logo})` }}>
        <DrawerToggleButton />
      </div>
      <Search />
    </div>
  );
};

export default Navbar;
