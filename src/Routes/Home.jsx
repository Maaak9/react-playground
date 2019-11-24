import React from "react";
import Grid from '@material-ui/core/Grid';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import TestHeader from "../Components/Routes/Spotify/TestHeader/TestHeader";


class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Grid item style={{ marginBottom: 10, height: '100%'}} container spacing={3}>
          <TestHeader style={{ marginTop: 100 }}/>
        </Grid>
        <Footer />
      </div>
    )
  }
  }

export default Home;

