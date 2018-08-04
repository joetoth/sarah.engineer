import React, { Component } from 'react';
import { Square } from './Square';
import {
  N,
  BOMB,
  boardMap,
  initSquareStatus,
  initSquareValue,
  ProgressChart,
} from './utils';

class Board extends Component {
  constructor() {
    super();
    const rows = N;
    const cols = N;
    const squares = boardMap(rows, cols);
    this.state = {
      totalBombs: N,
      happy: true,
      squares,
      squareStatus: initSquareStatus(squares),
      squareValue: initSquareValue(squares),
      squareFlagged: {},
    };
  }

  getFlagCount = () => Object.keys(this.state.squareFlagged)
    .filter(key => this.state.squareFlagged[key]).length;

  resetGame = () => {
    this.setState({
      totalBombs: N,
      happy: true,
      squareStatus: initSquareStatus(this.state.squares),
      squareValue: initSquareValue(this.state.squares),
    });
  }

  revealSquare = (id) => {
    const status = this.state.squareStatus[id];
    const value = this.state.squareValue[id];
    if (status === 'default') {
      this.setState({
        happy: value !== BOMB,
        squareStatus: {
          ...this.state.squareStatus,
          [id]: 'reveal',
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

  doNothing = () => null

  render() {
    const {
      happy,
      totalBombs,
      squares,
      squareStatus,
      squareValue,
      squareFlagged,
    } = this.state;
    return (
      <div>
        <ProgressChart happy={happy} bombsLeft={totalBombs - this.getFlagCount()} />
        <div className="flex board">
          { squares.map(square => (
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
