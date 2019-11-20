import React from "react";
import io from 'socket.io-client';

import { connect } from 'react-redux'
import Header from '../Layouts/Header';
import Body from '../Layouts/Body';
import Footer from '../Layouts/Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hej: 5,
    };

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    console.warn('this.canvasRef', this.canvasRef)

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillText('KUUUUKEN', 210, 75)
  }

  render() {
    const { clientWidth, clientHeight } = document.body;


    const socket = io('http://localhost:8000');
    socket.on('connect', function(){});
    console.warn('socket', socket);



    return (
      <div>
        <Header />
        <Body>
          <div className="game-container">
            <canvas ref={this.canvasRef} height="400px" width="680px" className="game-canvas" />
          </div>
        </Body>
        <Footer />
      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  console.warn('mapStateToProps', state);
  return {
    ...ownProps,
    testText: state.testText,
  };
}
const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

