import React, { Component } from 'react';
import { WormButtons } from './WormButtons';
import { Construction } from './Construction';

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
      wormStartX: 60,
      wormStartY: 50,
      wormEndX: 110,
      wormEndY: 50,
      wormWidth: 50,
      wormHeight: 23,
      ctx: null,
      groundXY: [],
      jumpHeight: 20,
      isJumping: false,
    };
  }

  componentDidMount() {
    this.setState({
      ctx: this.canvasRef.current.getContext('2d'),
    }, this.initGame);
    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
    window.removeEventListener('keydown', this.keyDownHandler);
  }

  resizeCanvas = () => {
    this.setState({
      width: window.innerWidth - this.state.diff,
      height: window.innerHeight - this.state.diff,
    })
  }

  keyDownHandler = (e) => {
    if (e.keyCode == 67) { // letter 'c'
        this.setState({
          wormColor: (this.state.wormColor + 1) % this.state.colors.length,
        }, this.reDrawWorm)
    } else if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 38 ) { // spacebar, enter, up arrow
      e.preventDefault();
      this.jumpHandler();
    }
  }

  initGame() {
    const { ctx } = this.state;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, this.state.width, this.state.height);
    this.drawWormPath();
    this.initGround();
  }

  // deletes existing worm before re-drawing
  reDrawWorm() {
    const { ctx } = this.state;
    this.clearCanvas();
    this.drawWormPath();
    this.drawGround();
  }

  drawWormPath = () => {
    const { wormStartX, wormStartY, wormEndX, wormEndY, ctx } = this.state;
    ctx.lineWidth = this.state.wormHeight;
    ctx.lineCap = "round";
    ctx.strokeStyle = this.state.colors[this.state.wormColor];
    ctx.beginPath();
    ctx.moveTo(wormStartX, wormStartY);
    ctx.lineTo(wormEndX, wormEndY);
    ctx.stroke();
    ctx.closePath();
  }

  clearCanvas = () => {
    const { ctx, width, height } = this.state;
    ctx.clearRect(0, 0, width, height);
  }

  initGround() {
    let x = 50;
    let y = 62;
    const dx = 2;
    const dy = 0; // 0 = ground is flat
    const groundXY = [{x, y}];
    let start = 0;
    while (start < this.state.width) {
      start++;
      x = x + dx;
      y = y + dy;
      groundXY.push({ x, y });
    }
    this.setState({
      groundXY
    }, this.drawGround);
  }

  drawGround() {
    this.state.groundXY.forEach((groundPt) => {
      this.drawGroundPath(groundPt.x, groundPt.y);
    });
  }

  drawGroundPath(x, y) {
    const { ctx } = this.state;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber % 10 === 0) {  // adds dirt to ground
      const randomDotDistance = Math.floor(Math.random() * 10);
      ctx.beginPath();
      ctx.arc(x, y+randomDotDistance, 1, 0, Math.PI*2);
      ctx.fillStyle = "#000000";
      ctx.fill();
    } else if (randomNumber % 5 === 0) { // adds leafs on ground
      const randomHeight = Math.floor(Math.random() * 10);
      ctx.beginPath();
      ctx.arc(x, y-randomHeight, 3, 0, Math.PI*2);
      ctx.fillStyle = "#2eb82e";
      ctx.fill();
    }
  }

  colorHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      wormColor: (this.state.wormColor + 1) % this.state.colors.length,
    }, this.reDrawWorm)
  }

  jumpUpdater = (originStartY, originEndY, jumpHeight) => {
    const delta = 10;
    const delay = 50;
    let wormStart = originStartY;
    let wormEnd = originEndY;
    let goUp = true;

    const update = (s, e) => {
      this.setState({
        wormStartY: s,
        wormEndY: e,
        isJumping: s === originStartY && e === originEndY ? false : true,
      }, this.reDrawWorm);
    }

    setTimeout(function run() {
      update(wormStart, wormEnd);
      if (goUp) { // animate going up
        wormStart -= delta;
        wormEnd -= delta;
        if (wormStart > jumpHeight || wormEnd > jumpHeight) {
          setTimeout(run, delay);
        } else {
          goUp = false;
          setTimeout(run, delay);
        }
      } else { // animate going down
        wormStart += delta;
        wormEnd += delta;
        if (wormStart < originStartY || wormEnd < originStartY) {
          setTimeout(run, delay);
        } else {
          update(originStartY, originEndY);
        }
      }
    }, delay);
  }

  jumpHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (this.state.isJumping) {
      return null; // don't jump while jumping
    }
    const { wormStartY, wormEndY, jumpHeight } = this.state;
    this.setState({
      isJumping: true,
    }, () => this.jumpUpdater(wormStartY, wormEndY,  jumpHeight));
  }

  render() {
    return (
      <div className="pad-30">
      <Construction />
      <WormButtons
        colorHandler={this.colorHandler}
        jumpHandler={this.jumpHandler}
      />
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
