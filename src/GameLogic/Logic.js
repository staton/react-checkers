
export function removePieces(selectedPiece, squares) {
    // return the coordinates of pieces to remove.
    // Let the board actually remove the pieces from the view.
}

export function checkIfShouldKing(selectedPiece) {
    // return true or false.
    // let the board update the selected piece.
}

export function getPossibleMoves(selectedPiece, squares) {
    // let the board worry about the highlighting.
    // Just return the coordinates of each possible move.
}

export function initializeGamePieces() {
    let pieces = [24];
    let index = 0;

    for (let i = 0; i < 8; i++) {
        if (i < 3) {
            // Initialize player 1's pieces
            for (let j = ((i + 1) % 2); j < 8; j+=2) {
                pieces[index] = { 
                    id: index, 
                    player: 1, 
                    isKing: false, 
                    isSelected: false, 
                    xPos: i, 
                    yPos: j,
                    dragStart: null,
                    dragEnd: null
                };
                index++;
            }
        } else if (i >= 5) {
            // Initialize player 2's pieces
            for (let j = ((i + 1) % 2); j < 8; j+=2) {
                pieces[index] = { 
                    id: index, 
                    player: 2, 
                    isKing: false, 
                    isSelected: false, 
                    xPos: i, 
                    yPos: j,
                    dragStart: null,
                    dragEnd: null
                };
                index++;
            }
        }
    }

    return pieces;
}