import React from 'react';
import './App.css';

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

  for (let index = 0; index < lines.length; index += 1) {
    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

class Square extends React.Component {
  render() {
    const { value, onSquareClick, disabled } = this.props;

    return (
      <button className="square" onClick={onSquareClick} disabled={disabled}>
        {value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(index) {
    const { squares, onSquareClick, disabled } = this.props;

    return (
      <Square
        value={squares[index]}
        onSquareClick={() => onSquareClick(index)}
        disabled={disabled}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      hasStarted: false,
    };
  }

  resetGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      hasStarted: true,
    });
  }

  handleClick(index) {
    if (!this.state.hasStarted) {
      return;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      hasStarted: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const isDraw =
      !winner && current.squares.every((square) => square !== null);

    const moves = history.map((step, move) => {
      const desc = move ? `前往第 ${move} 步` : '回到遊戲開始';

      return (
        <li key={move}>
          <button className="history-button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status = '請按「開始遊戲」開始對戰';
    if (this.state.hasStarted && winner) {
      status = `獲勝者：${winner}`;
    } else if (this.state.hasStarted && isDraw) {
      status = '平手';
    } else if (this.state.hasStarted) {
      status = `下一位玩家：${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const buttonText =
      this.state.hasStarted && !winner && !isDraw ? '重新開始' : '開始遊戲';

    return (
      <main className="game-shell">
        <h1 className="game-title">OX 遊戲</h1>
        <div className="game-actions">
          <button className="primary-button" onClick={() => this.resetGame()}>
            {buttonText}
          </button>
        </div>
        <div className="game">
          <section className="game-board">
            <div className="status">{status}</div>
            <Board
              squares={current.squares}
              onSquareClick={(index) => this.handleClick(index)}
              disabled={!this.state.hasStarted || winner || isDraw}
            />
          </section>
          <aside className="game-info">
            <h2>歷史步驟</h2>
            <ol>{moves}</ol>
          </aside>
        </div>
      </main>
    );
  }
}

function App() {
  return <Game />;
}

export default App;
