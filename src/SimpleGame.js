import React, { Component } from 'react';

/*
  TODO
  - make obstacles and ground move in unison
  - add JUMP ability of drawWorm
  - scoring
  - make worm "eat" leafs to gain health/points/speed?
*/

class SimpleGame extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      diff: 50,
      width: window.innerWidth - 50,
      height: window.innerHeight - 50,
      wormColor: 0,
      colors: ['#0095DD', '#ff9966', '#ccccff', '#ffccff'],
      wormX: 50,
      wormY: 50,
      wormWidth: 20,
      wormHeight: 10,
    };
  }

  componentDidMount() {
    this.initGame();
    this.drawWorm();
    this.drawGround();
    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
    window.addEventListener('keydown', this.keyDownHandler);
  }

  resizeCanvas = () => {
    this.setState({
      width: window.innerWidth - this.state.diff,
      height: window.innerHeight - this.state.diff,
    })
  }

  keyDownHandler = (e) => {
    if (e.keyCode == 67) {
        this.setState({
          wormColor: (this.state.wormColor + 1) % this.state.colors.length,
        }, this.drawWorm)
    } else if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 38 ) {
      console.log("jump worm!");
      this.setState({
        wormY: 10,
      }, this.drawWorm);
    }
  }

  initGame() {
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, this.state.width, this.state.height);
  }

  drawWorm() {
    let x = this.state.wormX;
    let y = this.state.wormY;
    let dx = 2;
    let dy = 0;
    let start = 0;
    const ctx = this.canvasRef.current.getContext('2d');
    const update = () => {
      x = x + dx;
      y = y + dy;
      this.drawWormPath(ctx, x, y);
      if (start < this.state.wormWidth) {
        start++;
        setTimeout(() => update(), 10);
      }
    }
    update();
  }

  // dot
  drawWormPath = (ctx, x, y) => {
    // ctx.clearRect(50, 50, 20, 10);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = this.state.colors[this.state.wormColor];
    ctx.fill();
    ctx.closePath();
  }

  // // line
  // drawWormPath2 = (ctx, x, y) => {
  //   ctx.lineWidth = 15;
  //   ctx.lineCap = "round";
  //   ctx.strokeStyle = this.state.colors[this.state.wormColor];
  //   ctx.beginPath();
  //   ctx.moveTo(20, 30);
  //   ctx.lineTo(60, 30);
  //   ctx.stroke();
  //   ctx.closePath();
  // }

  drawGround() {
    let x = 50;
    let y = 62;
    let dx = 2;
    let dy = 0;
    let start = 0;
    const ctx = this.canvasRef.current.getContext('2d');
    const update = () => {
      x = x + dx;
      y = y + dy;
      this.drawGroundPath(ctx, x, y);
      if (start < this.state.width) {
        start++;
        setTimeout(() => update(), 10);
      }
    }
    update();
  }

  drawGroundPath(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber % 10 === 0) {  // adds dirt to ground
      const randomDotDistance = Math.floor(Math.random() * 10);
      ctx.beginPath();
      ctx.arc(x, y+randomDotDistance, 1, 0, Math.PI*2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    } else if (randomNumber % 5 === 0) { // adds leafs on ground
      const randomHeight = Math.floor(Math.random() * 10);
      ctx.beginPath();
      ctx.arc(x, y-randomHeight, 3, 0, Math.PI*2);
      ctx.fillStyle = "#2eb82e";
      ctx.fill();
      ctx.closePath();
    }
  }

  render() {
    return (
      <div className="pad-30">
      <canvas
        ref={this.canvasRef}
        width={this.state.width}
        height={this.state.height}
      />
      </div>
    );
  }
}


export default SimpleGame;
