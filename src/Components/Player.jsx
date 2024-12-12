import React, { useState } from 'react'

function Player({intialName,symbol,isActive,handlePlayerNameChange}) {
const [ editing , setEditing ] = useState(false);
const [playerName, setplayerName] = useState(intialName)

function handleEdit(){
  setEditing((prvState)=> !prvState);
  if(editing){
    handlePlayerNameChange(symbol,playerName);
  }
}

function handlePlayerEdit(event){
  setplayerName(event.target.value);
}

let Playername = <span className="player-name">{playerName}</span> ;

if(editing){
  Playername =  <input type="text" required onChange={handlePlayerEdit} value={playerName}/>  
} 

  return (
    <li className={isActive ? 'active':undefined}>
      <span className="player">
      {Playername}
    <span className="player-symbol">{symbol}</span>
      </span>
    <button  onClick={handleEdit}>{editing ? 'Save':'Edit'}</button>
  </li>
  )
}

export default Player