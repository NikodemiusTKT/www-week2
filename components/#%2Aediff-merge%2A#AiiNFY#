import React, { useState, useEffect, useRef } from 'react';
import Row from './Row';
import Loadbar from './Loadbar';
import { css } from "emotion";

import './Board.css'
const boardStyle = css({
  marginTop: '20px',
})
const Board = ({
  rows,
  onClick,
  timerValue,
  squareSize
}) =>
      {
          const [width, setWidth] = useState(0)
          const ref = useRef(null)
          useEffect(() => {
              setWidth(ref.current.clientWidth)
          })
          return (
                  <div className={boardStyle}>
                  <Loadbar value={timerValue} width={width}></Loadbar>
                  <table ref={ref} id="board" cellSpacing="0" cellPadding="0" align="center" >
                  <tbody>
                  {rows.map((row, index) => (
                          <Row
                      key={index}
                      rowIndex={index}
                      squares={row}
                      onClick={onClick}
                      squareSize={squareSize}
                          />
                  ))}
              </tbody>
                  </table>
                  </div>
          );


      }


export default Board;
