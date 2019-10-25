import React from "react";
// import { Link } from "react-router-dom";
import '../styles/css/layouts/body.css';

class Body extends React.Component {
  render() {
    return (
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
