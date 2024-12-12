import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./Winning_Combination";
import GameOver from "./Components/GameOver";

const intitalGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]  
]

function App() {
  const [activePlayer, setactivePlayer] = useState('X');
  const [gameTurns,setgameTurns] = useState([]);
  const [players,setPlayersName] = useState({
    X:'Player 1',
    O:'Player 2'
  })
  

  let gameboard = [...intitalGameBoard.map((array)=>[...array])];
  let winner;
  const hasdraw = gameTurns.length >=9 && !winner; 

  for(let turn of gameTurns){
  const {square,player} = turn;
  const{row,col} = square;
  gameboard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol =
       gameboard[combination[0].row][combination[0].column]
      const secondSquareSymbol = 
      gameboard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = 
      gameboard[combination[2].row][combination[2].column]
      
      if(firstSquareSymbol 
        && firstSquareSymbol == secondSquareSymbol
         &&  firstSquareSymbol ==thirdSquareSymbol)
         {
         winner = players[firstSquareSymbol];
         }
    }

  function handlePlayerChange(rowIndex,colIndex){
    setactivePlayer((currAcPlayer)=>currAcPlayer === 'X' ? 'O' : 'X');
    setgameTurns((prvsTurns)=>{
    
     let currPlayer = 'X';

     if(prvsTurns.length > 0 && prvsTurns[0].player == 'X'){
       currPlayer = 'O';
      }      
      const updatedTurns = [
       {square :{ row : rowIndex , col : colIndex}, player : currPlayer }
       ,...prvsTurns
      ]

      return updatedTurns;
    })
  }
  function handleReMatch(){
    setgameTurns([])
  }

  function handlePlayerNameChange(symbol,playerName){
    
    setPlayersName((prevplayer)=>{
         return {
          ...prevplayer,
          [symbol] : playerName
         }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player intialName='Player 1' symbol='X' isActive={activePlayer === 'X'} handlePlayerNameChange={handlePlayerNameChange} />
          <Player intialName='Player 2' symbol='O' isActive={activePlayer === 'O'} handlePlayerNameChange={handlePlayerNameChange}/>   
        </ol>
        {(winner || hasdraw) && <GameOver winner={winner} handleReMatch={handleReMatch}/>}
        <GameBoard onPlayerChange={handlePlayerChange} activePlayerSymbol={activePlayer} board={gameboard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
