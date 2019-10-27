import React from "react";
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

class Home extends React.Component {
    render() {
      return (
          <div>
              <Header />
              <div>homepage</div>
              <div>Body!! </div>
              <div>Footer</div>
              <Footer />
          </div>
      )
    }
  }

export default Home;

