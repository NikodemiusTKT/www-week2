import React, { Component } from 'react';
import {render} from 'react-dom'
import { css } from "emotion";
import { cloneDeep } from 'lodash';
import Board from './components/Board';
import './App.css'

const ROWS = 5;
const COLS = 5;
const MIN_TO_WIN = 5

const ROW_ARR = new Array(ROWS).fill(null)
const COL_ARR = new Array(COLS).fill(null)
const GRID = ROW_ARR.map(x => COL_ARR.slice())
const OPTIONS = 12
const SQUARE = 60
  const appStyle = css({
    textAlign: 'center'
  })
const START_STATE = {
  squareSize: SQUARE,
  currentPlayer: 'x',
  grid: cloneDeep(GRID),
  gameOver: false,
  winLimit: MIN_TO_WIN,
  boardSize: MIN_TO_WIN,
  options: Array.from(new Array(OPTIONS), (x, i) => i + 3),
  timerValue: 0,
  timer: null,
}


// Calculate differences between the current item and the last item
const diffCols = ({ arr, item }) => {
  const lastItem = arr[arr.length - 1];
  return item.colIndex - lastItem.colIndex;
}
const diffRows = ({ arr, item }) => {
  const lastItem = arr[arr.length - 1];
  return item.rowIndex - lastItem.rowIndex;
}
const flattenAndFilterArray = (grid) => {
  const output = [];
  grid.forEach(arr => {
    output.push(...arr);
  });
  return output.filter(value => !!value);
}
const mapGridIndexes = ({ grid, value }) => {
  const mappedItems = grid.map((row, rowIndex) => row.map((col, colIndex) => {
    return col === value && {
      colIndex,
      rowIndex
    }
  })
  )
  return flattenAndFilterArray(mappedItems);
}

const compareToRest = ({ currentItem, gridItems, winString }) => {
  const N = [currentItem];
  const NE = [currentItem];
  const E = [currentItem];
  const SE = [currentItem];
  const S = [currentItem];
  const SW = [currentItem];
  const W = [currentItem];
  const NW = [currentItem];

  const applyDirection = (item) => {
    if (diffRows({ arr: N, item }) === 1 && diffCols({ arr: N, item }) === 0) {
      N.push(item);
    } else if (diffRows({ arr: NE, item }) === 1 && diffCols({ arr: NE, item }) === 1) {
      NE.push(item);
    } else if (diffRows({ arr: E, item }) === 0 && diffCols({ arr: E, item }) === 1) {
      E.push(item);
    } else if (diffRows({ arr: SE, item }) === -1 && diffCols({ arr: SE, item }) === 1) {
      SE.push(item);
    } else if (diffRows({ arr: S, item }) === -1 && diffCols({ arr: S, item }) === 0) {
      S.push(item);
    } else if (diffRows({ arr: SW, item }) === -1 && diffCols({ arr: SW, item }) === -1) {
      SW.push(item);
    } else if (diffRows({ arr: W, item }) === 0 && diffCols({ arr: W, item }) === -1) {
      W.push(item);
    } else if (diffRows({ arr: NW, item }) === 1 && diffCols({ arr: NW, item }) === -1) {
      NW.push(item);
    }

    const arrays = [N, NE, E, SE, S, SW, W, NW];
    const winningArrays = arrays.filter(arr => arr.length >= winString);
    return winningArrays.length > 0;
  };
    let hasWon = false;
    let i = 0;

    while (i < gridItems.length && !hasWon) {
        hasWon = applyDirection(gridItems[i]);
        i++;
    }

    return hasWon;
};


const checkWin = ({ gridItems, winString }) => {
  let hasWon = false;
  let i = 0;
  while (i < gridItems.length && !hasWon) {
    hasWon = compareToRest({ currentItem: gridItems[i], gridItems, winString });
    i++;
  }
  return hasWon;
}

const make2DArray = (size) => {
  var arr = new Array(size).fill(null);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(size).fill(null).slice();
  }
  return arr;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = cloneDeep(START_STATE);
    this.changeGridSize = this.changeGridSize.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.progressionTimer = this.progressionTimer.bind(this)
  }
  changeGridSize (event) {
    const value = parseInt(event.target.value)
    const newGrid = make2DArray(value)
    this.setState({
      grid: newGrid,
      boardSize: value,
      winLimit: value,
      gameOver: false,
      currentPlayer: 'x',
      timerValue: 0,
      timer: clearInterval(this.state.timer)
    })
  }
// Function for changing player and updating progres bar value after 10 seconds
  progressionTimer = () => {
    if (this.state.timerValue == 100) {
        const nextPlayer = this.state.currentPlayer === 'x' ? 'o' : 'x';
        this.setState({
            currentPlayer: nextPlayer,
            timerValue: 0,
            timer: clearInterval(this.state.timer)
        })
        this.setState({timer: setInterval(this.progressionTimer,1000)})
    } else {
      this.setState({
        timerValue: this.state.timerValue + 10,
      })
    }
  }
  turnChangeTimer = () => {
    this.setState({timer: clearInterval(this.state.timer)})
      this.setState({
          timerValue: 0,
          timer: setInterval(this.progressionTimer,1000)
      })
  }
  handleClick = ({rowIndex, colIndex}) => {
    const { currentPlayer, grid, gameOver,winLimit } = this.state
    if (!gameOver && !grid[rowIndex][colIndex]) {
      const cloneGrid = cloneDeep(grid)
      const nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
      cloneGrid[rowIndex][colIndex] = currentPlayer;
      const gridItems = mapGridIndexes({grid: cloneGrid, value: currentPlayer})
      const hasWon = checkWin({gridItems, winString: winLimit})
      if (!hasWon) this.turnChangeTimer();
      this.setState({
        currentPlayer: nextPlayer,
        grid: cloneGrid,
        gameOver: hasWon,
      })
        if (hasWon) {
            clearInterval(this.state.timer);
            alert(`Player ${currentPlayer === 'x' ? 1 : 2} won!`)
        }
    }
  }
  resetGame = () => {
    const { boardSize, winLimit} = this.state;
    var board = make2DArray(boardSize);
    this.setState({
      grid: board,
      winLimit,
      boardSize,
      currentPlayer: 'x',
      gameOver: false,
      timerValue: 0,
      timer: clearInterval(this.state.timer)
    })
  }
  render() {
    const {
      grid
    } = this.state;
    return (
      <div>
      <h1>React.js Tic-Tac-Toe</h1>
            <Board
        onClick={this.handleClick}
        rows={grid}
        timerValue={this.state.timerValue}
        isGameOver={this.state.gameOver}
        squareSize={this.state.squareSize}
            />
      <button style={{marginTop:"10px"}} onClick={this.resetGame}>Reset</button>
        <select value={this.state.boardSize} onChange={this.changeGridSize}>
          {this.state.options.map((opt, index) =>
            <option value={opt} key={index}>{opt}</option>
          )}
        </select>
      </div>
    )
  }
}
export default App;
