import React from 'react'

const Square = ({
  value,
  colIndex,
  rowIndex,
  squareSize,
  onClick,
}) => {
  const player1Style = {
    backgroundColor: 'rgb(124,252,0)'
  }
  const player2Style = {
    backgroundColor: 'rgb(250,128,114)'
  }
  const indexes = { rowIndex, colIndex };
  const style = {
    border: '1px solid black',
    display: 'table-cell',
    verticalAlign: 'center',
    height: squareSize,
    width: squareSize,
    fontSize: '30px',
      fontFamily: 'Helvetica',
      cursor: 'pointer'
  }
  if (value === 'x')
    style.backgroundColor = 'rgb(124,252,0)'
  else if (value === 'o')
    style.backgroundColor = 'rgb(250,128,114)'
  return (
    <td style={style} valign='middle' onClick={() => onClick(indexes)} >
    {value}
    </td>
  );
}

export default Square;
