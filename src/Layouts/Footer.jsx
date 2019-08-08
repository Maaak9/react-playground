import React from "react";
// import { Link } from "react-router-dom";
import '../Css/Layouts/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-wrapper">
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
