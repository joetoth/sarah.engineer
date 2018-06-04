import React, { Component } from 'react';

class SimpleGame extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      diff: 50,
      width: window.innerWidth - 50,
      height: window.innerHeight - 50,
    };
  }

  componentDidMount() {
    this.initGame();
    this.drawWorm();
    window.addEventListener('resize', this.resizeCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
  }

  resizeCanvas = () => {
    this.setState({
      width: window.innerWidth - this.state.diff,
      height: window.innerHeight - this.state.diff,
    })
  }

  initGame() {
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, this.state.width, this.state.height);
  }

  drawWorm() {
    let x = 50;
    let y = 50;
    let dx = 2;
    let dy = 0;
    let start = 0;
    const ctx = this.canvasRef.current.getContext('2d');
    const update = () => {
      x = x + dx;
      y = y + dy;
      this.drawWormPath(ctx, x, y);
      if (start < 20) {
        start++;
        setTimeout(() => update(), 10);
      }
    }
    update();
  }

  // dot
  drawWormPath = (ctx, x, y) => {
    ctx.clearRect(0, 0, 15, 15);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  // line
  drawWormPath2 = (ctx, x, y) => {
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0095DD";
    ctx.beginPath();
    ctx.moveTo(20, 30);
    ctx.lineTo(60, 30);
    ctx.stroke();
    ctx.closePath();
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
