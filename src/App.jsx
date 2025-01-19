import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winniing_combinations.js";
import {GameOver} from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveHasWinner(gameBoard){
    let totalTurns = 0;

    for(const gameBoardRow of gameBoard){
        for(const gameBoardCol of gameBoardRow){
            if(gameBoardCol){
                totalTurns = (totalTurns+1);
            }
        }
    }

    for(const combination of WINNING_COMBINATIONS){

        if (
            gameBoard[combination[0].row][combination[0].column]
            &&
            gameBoard[combination[0].row][combination[0].column] === gameBoard[combination[1].row][combination[1].column]
            &&
            gameBoard[combination[0].row][combination[0].column] === gameBoard[combination[2].row][combination[2].column]
        ) {
            return gameBoard[combination[0].row][combination[0].column];
        }

    }

    return (totalTurns === 9?'draw':false);
}

function deriveActivePlayer(ganeTurns){
    let currentPlayer = "X";

    if(ganeTurns.length  > 0 && ganeTurns[0].player === "X"){
        currentPlayer = "O";
    }

    return currentPlayer;
};

function App() {

    const [players, setPlayers] = useState({
        "X": "Player 1",
        "O": "Player 2"
    });

    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = initialGameBoard.map(array => [...array]);

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    let winner = deriveHasWinner(gameBoard);

    function handlePlayerName(symbol,playername){
        setPlayers((prevNames) => {
            return {
                ...prevNames,
                [symbol]:playername
            };
        });
    }

    function handleSelectSquare(rowIndex,colIndex){

        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            const updatedTurns = [
                {square: {row:rowIndex,col:colIndex},player:currentPlayer},
                ...prevTurns
            ];

            return updatedTurns;

        });
    }

    function restartMatch(){
        console.log('Rematch button pressed')
        setGameTurns([]);
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={players.X} symbol="X" changePlayerName={handlePlayerName} isActive={activePlayer === "X"} />
                    <Player name={players.O} symbol="O" changePlayerName={handlePlayerName} isActive={activePlayer === "O"} />
                </ol>
                {winner && ( <GameOver players={players} winner={winner} doRematch={restartMatch} /> )}
                <GameBoard
                    onSelectSquare={handleSelectSquare} gameBoard={gameBoard} winner={winner}

                />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
