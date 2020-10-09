import React, { Component } from 'react';
import Row from './Row';
import Loadbar from './Loadbar'
import { css } from "emotion";

import './Board.css'
const boardStyle = css({
  marginTop: '20px',
})
const Board = ({
  rows,
  onClick,
  timerValue,
  isGameOver
}) => (
  <div>
    <Loadbar value={isGameOver,timerValue}></Loadbar>
    <table id="board" cellSpacing="0" cellPadding="0" align="center" >
    <tbody>
      {rows.map((row, index) => (
        <Row
        key={index}
        rowIndex={index}
        squares={row}
        onClick={onClick}
      />
      ))}
      </tbody>
      </table>
      </div>
  );

export default Board;
