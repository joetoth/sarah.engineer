import React, { Component } from 'react';
import { Square } from './Square';
import {
  N,
  BOMB,
  boardMap,
  initSquareStatus,
  initSquareValue,
  ProgressChart,
  parseKey,
  getNeighbors,
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

  getAdjacentIds = (id) => {
    let [x, y] = parseKey(id);
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    return getNeighbors(N, x, y);
  }

  expandArea = (id, isInitial, seen) => {
    const value = this.state.squareValue[id];
    const status = this.state.squareStatus[id];
    if (isInitial && value === BOMB) {
      seen[id] = 'reveal'; // eslint-disable-line no-param-reassign
      this.revealSquareById(id);
    } else if (status === 'default') {
      seen[id] = 'reveal'; // eslint-disable-line no-param-reassign
      if (value === 0) {
        this.getAdjacentIds(id).forEach((adjacentId) => {
          if (!seen[adjacentId]) {
            this.expandArea(adjacentId, false, seen);
          }
        });
      }
    }
  }

  revealSquares = (idObject) => {
    this.setState({
      squareStatus: {
        ...this.state.squareStatus,
        ...idObject,
      },
    });
  }

  revealSquareById = (id) => {
    const value = this.state.squareValue[id];
    this.setState({
      happy: value !== BOMB,
      squareStatus: {
        ...this.state.squareStatus,
        [id]: 'reveal',
      },
    });
  }

  revealSquare = (id) => {
    const status = this.state.squareStatus[id];
    const value = this.state.squareValue[id];
    if (status === 'default') {
      if (value === 0) { // expand area to non-zero
        const seen = {};
        this.expandArea(id, true, seen);
        this.revealSquares(seen);
        // this.revealSquareById(id);
      } else { // reveal a single square
        this.revealSquareById(id);
      }
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

  resetGame = () => {
    this.setState({
      totalBombs: N,
      happy: true,
      squareStatus: initSquareStatus(this.state.squares),
      squareValue: initSquareValue(this.state.squares),
      squareFlagged: {},
    });
  }

  resetGameByKey = (event) => {
    if (event.keyCode !== 9 && event.keyCode !== 16) { // not tab or shift key
      this.resetGame();
    }
  }

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
        <ProgressChart
          happy={happy}
          bombsLeft={totalBombs - this.getFlagCount()}
          resetGame={this.resetGame}
          resetGameByKey={this.resetGameByKey}
        />
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
