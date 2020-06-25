import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary.component";

class Layout extends Component {
  render() {
    return (
      <div>
        <Auxiliary>
          <main>{this.props.children}</main>
        </Auxiliary>
      </div>
    );
  }
}

export default Layout;
