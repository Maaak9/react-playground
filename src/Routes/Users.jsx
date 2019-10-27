import React from "react";
import Header from '../Layouts/Header';
import Body from '../Layouts/Body';
import Footer from '../Layouts/Footer';

class Users extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Body>
            <div className="col-md-2 col-sm-6">1</div>
            <div className="col-md-2 col-sm-6">2</div>
            <div className="col-md-2 col-sm-6">3</div>
            <div className="col-md-2 col-sm-6">4</div>
            <div className="col-md-2 col-sm-6">5</div>
            <div className="col-md-2 col-sm-6">6</div>
            <div className="col-md-2 col-sm-6">7</div>
            <div className="col-md-2 col-sm-6">8</div>
            <div className="col-md-2 col-sm-6">9</div>
            <div className="col-md-2 col-sm-6">10</div>
        </Body>
        <Footer />
      </div>
    )
  }
}

export default Users;

