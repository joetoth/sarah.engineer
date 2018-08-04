import React from 'react';

export const N = 11;
export const BOMB = '💣';
export const FLAG = '🚩';

export const boardMap = (rows, cols) => {
    const result = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result.push(`row${i}col${j}`);
        }
    }
    return result;
};

export const getRandomInteger = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const getBombLocations = (n) => {
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
};

export const initSquareStatus = (squares) => {
    const squareStatus = {};
    squares.forEach(square => {
        squareStatus[square] = 'default';
    });
    return squareStatus;
};

// row10col10 => "row10" "col10"
export const parseKey = (key) => {
    const split = key.split('col');
    split[0] = split[0].split('row')[1];
    return split;
};

export const getKey = (x, y) => `row${x}col${y}`;

export const getValidKey = (n, X, Y) => {
    if (X >= 0 && Y >= 0 && X < n && Y < n) {
        return getKey(X, Y);
    }
    return null;
};

export const getNeighbors = (n, x, y) => {
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
};

export const getBombTouchCount = (squareValue, x, y) => {
    const X = parseInt(x, 10);
    const Y = parseInt(y, 10);
    const neighbors = getNeighbors(N, X, Y);
    return neighbors.filter(key => squareValue[key] === BOMB).length;
};

export const initSquareValue = (squares) => {
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
};

// View for the smiley face
export const FaceIcon = ({ happy }) => (
    <div className={`${happy ? 'smile-icon' : 'frown-icon'}`}>
        {happy ? '☺' : '☹'}
    </div>
);

// View for game progress above board
export const ProgressChart = ({ bombsLeft, happy }) => (
    <div className="flex flex-align-items-center montserrat progress-chart">
        <div className="pad-10">{FLAG}{bombsLeft}</div>
        <FaceIcon happy={happy} className="pad-10" />
    </div>
);
