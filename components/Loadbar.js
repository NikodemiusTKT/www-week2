import React, {useState} from 'react';
import {css} from 'emotion'

const loadbarBgStyle = css({
  color: '#000 !important',
  backgroundColor: '#f1f1f1 !important',
  borderRadius: '4px',
  width: '25%',
  margin: '10px 0 20px 0'
})
const loadbarStyle = css({
  color: "#fff",
  backgroundColor: "#2196F3 !important",
  borderRadius: '4px',
  fontWeight: 'bold'
})

const Loadbar = ({value}) => {
  return (
    <div>
          <p>Changing turn in {10-value/10} seconds</p>
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
    <div className={loadbarBgStyle}>
          <div className={loadbarStyle} style={{ width: value + '%' }}>{value}%</div>
    </div>
      </div>
    </div>
  );
}

export default Loadbar;
