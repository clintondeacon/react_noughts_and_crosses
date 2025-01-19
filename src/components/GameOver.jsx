export function GameOver({winner,doRematch,players}) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner === 'draw' ? <p>Game drawn</p> : <p>{players[winner]} won</p>}
            <p>
                <button onClick={doRematch}>Rematch!</button>
            </p>
        </div>

    );
}