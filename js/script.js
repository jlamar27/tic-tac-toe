document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.querySelector('.game--container');
    const msgEl = document.querySelector('.game--status');
    const restartButton = document.querySelector('.game--restart');
    
    class Square {
        constructor(domElement) {
            this.domElement = domElement;
            this.value = null;
        }
        
        render() {
            this.domElement.textContent = this.value;
        }
    }
    
    class TicTacToeGame {
        constructor(boardElement, messageElement) {
            this.boardElement = boardElement;
            this.messageElement = messageElement;
            this.squareEls = [...boardElement.querySelectorAll('.cell')];
            this.squares = this.squareEls.map(el => new Square(el));
            this.currentPlayer = 'X';
            this.winner = null;
            this.play();
        }
        
        play() {
            this.squareEls.forEach((square, idx) => {
                square.addEventListener('click', () => this.handleCellClick(idx));
            });
            restartButton.addEventListener('click', () => this.restartGame());
        }
        
        handleCellClick(idx) {
            if (this.squares[idx].value || this.winner) {
                return; 
            }
            
            console.log(`Clicked cell index: ${idx}`);

            this.squares[idx].value = this.currentPlayer;
            this.squares[idx].render();
            
            this.winner = this.checkWinner();
            if (this.winner) {
                msgEl.textContent = `Player ${this.currentPlayer} wins!`;
            } else if (this.squares.every(square => square.value)) {
                msgEl.textContent = "It's a draw!";
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                msgEl.textContent = `Player ${this.currentPlayer}'s Turn`;
            }
        }
        
        checkWinner() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            
            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (
                    this.squares[a].value &&
                    this.squares[a].value === this.squares[b].value &&
                    this.squares[a].value === this.squares[c].value
                ) {
                    return this.squares[a].value;
                }
            }
            return null;
        }
        
        restartGame() {
            this.squares.forEach(square => {
                square.value = null;
                square.render();
            });
            this.currentPlayer = 'X';
            this.winner = null;
            msgEl.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
    }
    
    const game = new TicTacToeGame(boardEl, msgEl);
});
