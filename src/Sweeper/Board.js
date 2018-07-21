import React, { Component } from 'react';

class Square extends Component {
  clickHandler = (event) => {
    this.props.updateBoard(event.target.id);
  }

  render() {
    const { status } = this.props;
    if (status === "default") {
      return (
        <div
          className="square blue"
          onClick={this.clickHandler}
          id={this.props.id}
        />
      );
    } else {
      return (
        <div
          className={`flex flex-align-items-center
            flex-justify-content-center square blue dimmed`}
          onClick={this.clickHandler}
          id={this.props.id}
        >
          {this.props.value}
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

const initSquareStatus = (squares) => {
  const squareStatus = {};
  squares.forEach(square => {
    squareStatus[square] = "default";
  });
  return squareStatus;
}

const initSquareValue = (squares) => {
  const squareValue = {};
  // TODO - bomb/value distribution logic
  squares.forEach(square => {
    squareValue[square] = "1";
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
    <div className="pad-10">{bombsLeft}</div>
    <FaceIcon happy={happy} className="pad-10" />
  </div>
);

class Board extends Component {
  constructor() {
    super();
    const rows = 11;
    const cols = 11;
    const squares = boardMap(rows, cols);
    this.state = {
      rows,
      cols,
      totalBombs: 10,
      bombsRemaining: 10,
      happy: true,
      squares,
      squareStatus: initSquareStatus(squares),
      squareValue: initSquareValue(squares),
    }
  }

  squareUpdate = (id) => {
    console.log("squareUpdate id", id);
    const status = this.state.squareStatus[id];
    console.log('STATUS', status);
    if (status === 'default') {
      this.state.squareStatus[id]
      this.setState({
        squareStatus: {
          ...this.state.squareStatus,
          [id]: "reveal"
        },
      });
    }
  }

  render() {
    const {
      happy,
      bombsRemaining,
      squares,
      squareStatus,
      squareValue,
    } = this.state;
    return  (
        <div>
          <ProgressChart happy={happy} bombsLeft={bombsRemaining} />
          <div className="flex board">
          { squares.map((square, i) => (
            <Square
              key={square}
              updateBoard={this.squareUpdate}
              id={square}
              status={squareStatus[square]}
              value={squareValue[square]}
            />
          ))}
          </div>
        </div>
      );
  }
}

export default Board;
