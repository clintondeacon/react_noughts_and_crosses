export default function GameBoard({onSelectSquare,gameBoard,winner}){

    return (
        <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null || winner}>
                                {playerSymbol}
                            </button>
                        </li>
                    ))}
                </ol>

            </li>
        ))}
        </ol>
    );


}