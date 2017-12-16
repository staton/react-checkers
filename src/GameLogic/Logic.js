const _ = require('underscore');

/**
 * Checks whether or not a piece should be kinged.
 * @param {*} selectedPiece The piece that will be checked.
 */
export function checkIfShouldKing(selectedPiece) {
    return (!selectedPiece.isKing 
        && ((selectedPiece.player === 1 && selectedPiece.xPos === 7)
            || (selectedPiece.player === 2 && selectedPiece.xPos === 0)));
}

/**
 * Gets the possible squares a piece can move to.
 * @param {*} piece The piece the user chose to play.
 * @param {*} pieces Every piece currently on the board.
 * @param {*} onlyGetJumpMoves Determines whether or not we should only search for moves that
 * are possible via jumping an opponent's piece. Used for checking "double/triple/etc jump" moves.
 */
export function getPossibleMoves(piece, pieces, onlyGetJumpMoves) {

    let possibleMoves = [];
    let isNotKingSquare;
    let xDirection;
    let isTwoBeforeKingSquare;
    let player = piece.player;
    let x = piece.xPos;
    let y = piece.yPos;
    let isKing = piece.isKing;

    if (player === 1) {
        isNotKingSquare = (x <= 6);
        xDirection = 1;
        isTwoBeforeKingSquare = (x <= 5);
    } else {
        isNotKingSquare = (x >= 1);
        xDirection = -1;
        isTwoBeforeKingSquare = (x >= 2);
    }

    if (isKing) {
        
        if (y >= 1) {
            let leftPiece = _.findWhere(pieces, { xPos: (x + (xDirection * -1)), yPos: (y - 1) });

            if (leftPiece === undefined) {
                if (!onlyGetJumpMoves) {
                    possibleMoves.push({ xPos: (x + (xDirection * -1)), yPos: (y - 1) });
                }
            } else if (y >= 2 
                //&& x <= xTwoBeforeKingSquare
                && leftPiece.player !== player 
                && _.findWhere(pieces, { xPos: (x + (xDirection * -2)), yPos: (y - 2) }) === undefined) {
                    possibleMoves.push({ xPos: (x + (xDirection * -2)), yPos: (y - 2) });
            }
        }

        if (y <= 6) {
            let rightPiece = _.findWhere(pieces, { xPos: (x + (xDirection * -1)), yPos: (y + 1) });

            if (rightPiece === undefined) {
                if (!onlyGetJumpMoves) {
                    possibleMoves.push({ xPos: (x + (xDirection * -1)), yPos: (y + 1) });
                }
            } else if (y <= 5
                //&& x <= xTwoBeforeKingSquare
                && rightPiece.player !== player
                && _.findWhere(pieces, { xPos: (x + (xDirection * -2)), yPos: (y + 2) }) === undefined) {
                    possibleMoves.push({ xPos: (x + (xDirection * -2)), yPos: (y + 2) });
            }
        }

    }
        
    if (isNotKingSquare) {

        if (y >= 1) {
            let leftPiece = _.findWhere(pieces, { xPos: (x + xDirection), yPos: (y - 1) });

            if (leftPiece === undefined) {
                console.log("left piece is undefined. only get jump moves: " + onlyGetJumpMoves);
                if (!onlyGetJumpMoves) {
                    possibleMoves.push({ xPos: (x + xDirection), yPos: (y - 1) });
                }
            } else if (y >= 2 
                && isTwoBeforeKingSquare
                && leftPiece.player !== player 
                && _.findWhere(pieces, { xPos: (x + (xDirection * 2)), yPos: (y - 2) }) === undefined) {
                    possibleMoves.push({ xPos: (x + (xDirection * 2)), yPos: (y - 2) });
            }
        }

        if (y <= 6) {
            let rightPiece = _.findWhere(pieces, { xPos: (x + xDirection), yPos: (y + 1) });

            if (rightPiece === undefined) {
                console.log("right piece is undefined. only get jump moves: " + onlyGetJumpMoves);
                if (!onlyGetJumpMoves) {
                    possibleMoves.push({ xPos: (x + xDirection), yPos: (y + 1) });
                }
            } else if (y <= 5
                && isTwoBeforeKingSquare
                && rightPiece.player !== player
                && _.findWhere(pieces, { xPos: (x + (xDirection * 2)), yPos: (y + 2) }) === undefined) {
                    possibleMoves.push({ xPos: (x + (xDirection * 2)), yPos: (y + 2) });
            }
        }
    }

    console.log("POSSIBLE MOVES: ");
    for (let i = 0; i < possibleMoves.length; i++) {
        console.log("x: " + possibleMoves[i].xPos + ", y: " + possibleMoves[i].yPos);
    }

    return possibleMoves;
}

