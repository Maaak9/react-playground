import React from "react";
// import { Link } from "react-router-dom";
import '../styles/css/layouts/footer.css';

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