import React from "react";
import Header from '../Layouts/Header';
import Body from '../Layouts/Body';

import '../Css/Pages/Game.css';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hej: 5
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

    console.warn('clientHeight', clientHeight);
    

    return (
      <div>
        <Header />
        <Body>
          <div>This is the game page</div>
          <div className="game-container">
            <canvas ref={this.canvasRef} height="400px" width="680px" className="game-canvas" />
          </div>
        </Body>
      </div>
    )
  }
}

export default Home;

