import React, { Component } from 'react';

const N = 11;
const BOMB = "💣";
const FLAG = "🚩";

class Square extends Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this._handleDoubleClick.bind(this);
  }

  /*
    single - add flag
    single - remove flag
    double - reveal value
  */

  _handleDoubleClick(event) {
    this.props.doubleClick(event.target.id);
  }

  clickHandler = (event) => {
    this.props.singleClick(event.target.id);
  }

  render() {
    const { status, value, id, flag } = this.props;
    if (status === "default") {
      return (
        <div
          className="square blue"
          onClick={this.clickHandler}
          onDoubleClick={this.handleDoubleClick}
          id={id}
        >
          {flag ? FLAG : null}
        </div>
      );
    } else {
      return (
        <div
          className={`flex flex-align-items-center
            flex-justify-content-center square blue
            ${value !== BOMB ? 'dimmed' : ''}`}
          onClick={this.clickHandler}
          onDoubleClick={this.handleDoubleClick}
          id={id}
        >
          {value !== 0 ? value : null}
        </div>
      );
    }
  }
}

const boardMap = (rows, cols) => {
  const result = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result.push(`row${i}col${j}`);
    }
  }
  return result;
}

const getRandomInteger = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getBombLocations = (n) => {
  const bombLocations = [];
  while (bombLocations.length < n) {
    const randomRow = getRandomInteger(n);
    const randomCol = getRandomInteger(n);
    const bombKey = `row${randomRow}col${randomCol}`;
    if (!bombLocations.includes(bombKey)) {
      bombLocations.push(bombKey);
    }
  }
  return bombLocations;
}

const initSquareStatus = (squares) => {
  const squareStatus = {};
  squares.forEach(square => {
    squareStatus[square] = "default";
  });
  return squareStatus;
}

// row10col10 => "row10" "col10"
const parseKey = (key) => {
  const split = key.split("col");
  split[0] = split[0].split("row")[1];
  return split;
}

const getKey = (x, y) => `row${x}col${y}`;

const getValidKey = (n, X, Y) => {
    if (X >= 0 && Y >= 0 && X < n && Y < n) {
      return getKey(X, Y);
    }
    return null;
}

const getNeighbors = (n, x, y) => {
  let neighbors = [];
  neighbors.push(getValidKey(n, x-1, y-1));
  neighbors.push(getValidKey(n, x-1, y));
  neighbors.push(getValidKey(n, x-1, y+1));
  neighbors.push(getValidKey(n, x, y-1));
  neighbors.push(getValidKey(n, x, y+1));
  neighbors.push(getValidKey(n, x+1, y-1));
  neighbors.push(getValidKey(n, x+1, y));
  neighbors.push(getValidKey(n, x+1, y+1));
  neighbors = neighbors.filter(key => key);
  return neighbors;
}

const getBombTouchCount = (squareValue, x, y) => {
  const X = parseInt(x, 10);
  const Y = parseInt(y, 10);
  const neighbors = getNeighbors(N, X, Y);
  return neighbors.filter(key => squareValue[key] === BOMB).length;
}

const initSquareValue = (squares) => {
  const squareValue = {};
  const bombLocations = getBombLocations(N);
  bombLocations.forEach(bombLocation => {
    squareValue[bombLocation] = BOMB;
  });
  squares.forEach(key => {
    if (!squareValue[key] || squareValue[key] !== BOMB) {
      const xy = parseKey(key);
      const bombCount = getBombTouchCount(squareValue, xy[0], xy[1]);
      squareValue[key] = bombCount;
    }
  });
  return squareValue;
}

const FaceIcon = ({ happy }) => (
  <div className={`${happy ? 'smile-icon' : 'frown-icon'}`}>
    {happy ? '☺' : '☹'}
  </div>
);

const ProgressChart = ({ bombsLeft, happy }) => (
  <div className="flex flex-align-items-center montserrat progress-chart">
    <div className="pad-10">{FLAG}{bombsLeft}</div>
    <FaceIcon happy={happy} className="pad-10" />
  </div>
);

class Board extends Component {
  constructor() {
    super();
    const rows = N;
    const cols = N;
    const squares = boardMap(rows, cols);
    this.state = {
      rows,
      cols,
      totalBombs: N,
      flagsPlaced: 0,
      happy: true,
      squares,
      squareStatus: initSquareStatus(squares),
      squareValue: initSquareValue(squares),
      squareFlagged: {},
    }
  }

  revealSquare = (id) => {
    this.setState({
      flagsPlaced: this.state.flagsPlaced - 1,
    })
    const status = this.state.squareStatus[id];
    const value = this.state.squareValue[id];
    if (status === 'default') {
      this.setState({
        happy: value !== BOMB,
        squareStatus: {
          ...this.state.squareStatus,
          [id]: "reveal"
        },
      });
    }
  }

  updateFlagsPlaced = (id) => {
    const flag = this.state.squareFlagged[id];
      this.setState({
        squareFlagged: {
          ...this.state.squareFlagged,
          [id]: !flag,
        },
      });
  }

  doNothing = () => {
    return null;
  }

  resetGame = () => {
    this.setState({
      totalBombs: N,
      flagsPlaced: 0,
      happy: true,
      squareStatus: initSquareStatus(this.state.squares),
      squareValue: initSquareValue(this.state.squares),
    })
  }

  getFlagCount = () => Object.keys(this.state.squareFlagged)
    .filter(key => this.state.squareFlagged[key]).length;

  render() {
    const {
      happy,
      totalBombs,
      flagsPlaced,
      squares,
      squareStatus,
      squareValue,
      squareFlagged,
    } = this.state;
    return  (
        <div>
          <ProgressChart happy={happy} bombsLeft={totalBombs - this.getFlagCount()} />

          <div className="flex board">
          { squares.map((square, i) => (
            <Square
              key={square}
              doubleClick={this.state.happy ? this.revealSquare : this.doNothing}
              singleClick={this.state.happy ? this.updateFlagsPlaced : this.doNothing}
              id={square}
              status={squareStatus[square]}
              value={squareValue[square]}
              flag={squareFlagged[square]}
            />
          ))}
          </div>
          { !this.state.happy ? (
            <button onClick={this.resetGame}>
              New Game
            </button>) : null
          }
        </div>
      );
  }
}

export default Board;
