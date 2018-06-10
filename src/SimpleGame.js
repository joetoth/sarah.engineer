import React, { Component } from 'react';
import { WormButtons } from './WormButtons';
import { Construction } from './Construction';

/*
  TODO
  - scoring
*/

class SimpleGame extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      diff: 50,
      width: window.innerWidth - 50,
      height: window.innerHeight - 50,
      mapDistance: 500,
      groundStartX: 50,
      groundStartY: 62,
      wormColor: 0,
      colors: ['#0095DD', '#ff9966', '#ccccff', '#ffccff'],
      wormStartX: 60,
      wormStartY: 50,
      wormEndX: 110,
      wormEndY: 50,
      wormWidth: 50,
      wormHeight: 23,
      ctx: null,
      jumpHeight: 20,
      isJumping: false,
      ground: [],
      dirt: [],
      leafs: [],
      moveForward: false,
      groundPosition: 0,
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
        }, this.redrawScene)
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
    this.getItems('dirt', 10, this.drawDirtPath, false, false);
    this.getItems('leafs', 10, this.drawLeafsPath, true, true);
  }

  getItems(name, modBy, drawPathFn, isNeg, nullPoint) {
    const x = this.state.groundStartX;
    const y = this.state.groundStartY;
    let xModifier = 0;
    const items = [{ x, y }];
    while (xModifier < this.state.mapDistance) {
      xModifier++;
      const randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber % modBy === 0) {  // adds dirt to ground
        const yModifier = Math.floor(Math.random() * 10);
        items.push({
          x: x+xModifier,
          y: isNeg ? y-yModifier : y+yModifier
        });
      } else {
          items.push({
            x: nullPoint ? null : x+xModifier,
            y: nullPoint ? null : y
          });
      }
    }
    const drawItems = () => {
      this.drawItems(name, drawPathFn);
    }
    this.setState({
      [name]: items,
    }, drawItems);
  }

  drawItems = (name, drawPathFn) => {
    const { [name]: items, groundPosition } = this.state;
    const mappedItems = items.map((item, index) => {
        return {
          x: item.x - groundPosition,
          y: item.y,
        };
    });
    mappedItems.forEach((p) => {
      drawPathFn(p.x, p.y);
    })
  }

  drawDirtPath = (x, y) => {
    const { ctx } = this.state;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
  }

  drawLeafsPath = (x, y) => {
    const { ctx } = this.state;
    ctx.beginPath();
    ctx.arc(x, y-4, 4, 0, Math.PI*2);
    ctx.fillStyle = "#2eb82e";
    ctx.fill();
  }

  redrawScene() {
    const { ctx } = this.state;
    this.clearCanvas();
    this.drawWormPath();
    this.drawGround();
    this.drawItems('dirt', this.drawDirtPath);
    this.drawItems('leafs',this.drawLeafsPath);
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
    let x = this.state.groundStartX;
    let y = this.state.groundStartY;
    const dx = 2;
    const dy = 0; // 0 = ground is flat
    const ground = [{x, y}];
    let start = 0;
    while (start < this.state.mapDistance) {
      start++;
      x = x + dx;
      y = y + dy;
      ground.push({ x, y });
    }
    this.setState({
      ground,
    }, this.drawGround);
  }

  drawGround() {
    const { ground, groundPosition } = this.state;
    const itemArray = ground.slice(groundPosition);
    itemArray.forEach((p) => {
      this.drawGroundPath(p.x, p.y);
    });
  }

  drawGroundPath = (x, y) => {
    const { ctx } = this.state;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
  }

  colorHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      wormColor: (this.state.wormColor + 1) % this.state.colors.length,
    }, this.redrawScene)
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
      }, this.redrawScene);
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
      moveForward: true,
    }, () => {
      this.jumpUpdater(wormStartY, wormEndY,  jumpHeight);
    });
  }

  moveForward = () => {
    let timer = 0;
    let max = 5;
    while(timer < max) {
      timer++;
      const newVal = this.state.groundPosition + 1;
      this.setState({
        groundPosition: newVal,
      }, this.redrawScene);
    }
  }

  render() {
    return (
      <div className="pad-30">
      <Construction />
      <WormButtons
        colorHandler={this.colorHandler}
        jumpHandler={this.jumpHandler}
        moveHandler={this.moveForward}
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
