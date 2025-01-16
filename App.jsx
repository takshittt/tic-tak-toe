import { useState } from "react";
import './App.css'
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board]; 
    newBoard[index] = isNext ? "X" : "O";
    setBoard(newBoard);
    setIsNext(!isNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsNext(true);
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board board={board} onClick={handleClick} />
      <div className="info">
        {winner ? <h2>Winner: {winner}</h2> : <h2>Next Player: {isNext ? "X" : "O"}</h2>}
      </div>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
}

function Board({ board, onClick }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}

function Square({ value, onClick }) {
  return (
    <div className={`square ${value ? "disabled" : ""}`} onClick={onClick}>
      {value}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
