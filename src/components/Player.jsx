import {useState} from "react";

export default function Player({name, symbol, isActive, changePlayerName, ...props}) {

    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing((editing) => !editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
        changePlayerName(symbol, event.target.value);
    }

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
              {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" required value={playerName} onChange={handleChange} />}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick() }>
                {isEditing?'Save' :'Edit'}
            </button>
        </li>
    );
}