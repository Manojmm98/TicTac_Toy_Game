import React, { useState } from 'react'



function GameBoard({onPlayerChange,board}) {
  

  return (
    <ol id='game-board'>
        {
            board.map((row,rowindex)=>(
                <li key={rowindex}>
                    <ol>
                     {row.map((playerSymbol,colIndex)=>(
                       <li key={colIndex}>
                        <button onClick={()=>onPlayerChange(rowindex,colIndex)} disabled={playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                       </li>
                       ))}
                    </ol>
                </li>
            ))
        }
    </ol>
  )
}

export default GameBoard