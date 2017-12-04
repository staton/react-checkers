const _ = require('underscore');

export function removePieces(selectedPiece, pieces) {
    // return the coordinates of pieces to remove.
    // Let the board actually remove the pieces from the view.
}

export function checkIfShouldKing(selectedPiece) {
    // return true or false.
    // let the board update the selected piece.

    return (!selectedPiece.isKing 
        && ((selectedPiece.player === 1 && selectedPiece.xPos === 7)
            || (selectedPiece.player === 2 && selectedPiece.xPos === 0)));
}

/*
export function getPossibleMoves(player, x, y, isKing, pieces) {
    // let the board worry about the highlighting.
    // Just return the coordinates of each possible move.
    let possibleMoves = [];

    if (pieces === undefined || pieces.length === 0) {
        console.warn("Logic - getPossibleMoves - NO PIECES!");
        return possibleMoves;
    }

    if (player == 1) {
        // red piece

        if (isKing) {

        }
            
        if (x <= 6) {
            if (y >= 1) {
                let leftPiece = _.findWhere(pieces, { xPos: (x + 1), yPos: (y - 1) });

                if (leftPiece === undefined) {
                    possibleMoves.push({ xPos: (x + 1), yPos: (y - 1) });
                } else if (y >= 2 
                    && x <= 5
                    && leftPiece.player == 2 
                    && _.findWhere(pieces, { xPos: (x + 2), yPos: (y - 2) }) === undefined) {
                        possibleMoves.push({ xPos: (x + 2), yPos: (y - 2) });
                    }
            }

            if (y <= 6) {
                let rightPiece = _.findWhere(pieces, { xPos: (x + 1), yPos: (y + 1) });

                if (rightPiece === undefined) {
                    possibleMoves.push({ xPos: (x + 1), yPos: (y + 1) });
                } else if (y <= 5
                    && x <= 5
                    && rightPiece.player == 2
                    && _.findWhere(pieces, { xPos: (x + 2), yPos: (y + 2) }) === undefined) {
                        possibleMoves.push({ xPos: (x + 2), yPos: (y + 2) });
                    }
            }
        }

    } else if (player == 2) {
        // black piece

        if (isKing) {
            
        }
        
        if (x >= 1) {
            if (y >= 1) {
                let leftPiece = _.findWhere(pieces, { xPos: (x - 1), yPos: (y - 1) });

                if (leftPiece === undefined) {
                    possibleMoves.push({ xPos: (x - 1), yPos: (y - 1) });
                } else if (y >= 2 
                    && x >= 2
                    && leftPiece.player == 1 
                    && _.findWhere(pieces, { xPos: (x - 2), yPos: (y - 2) }) === undefined) {
                        possibleMoves.push({ xPos: (x - 2), yPos: (y - 2) });
                    }
            }

            if (y <= 6) {
                let rightPiece = _.findWhere(pieces, { xPos: (x - 1), yPos: (y + 1) });
                console.log(rightPiece);
                if (rightPiece === undefined) {
                    possibleMoves.push({ xPos: (x - 1), yPos: (y + 1) });
                } else if (y <= 5
                    && x >= 2
                    && rightPiece.player == 1
                    && _.findWhere(pieces, { xPos: (x - 2), yPos: (y + 2) }) === undefined) {
                        possibleMoves.push({ xPos: (x - 2), yPos: (y + 2) });
                    }
            }
        }
    }

    console.log("POSSIBLE MOVES: ");
    for (let i = 0; i < possibleMoves.length; i++) {
        console.log("x: " + possibleMoves[i].xPos + ", y: " + possibleMoves[i].yPos);
    }

    return possibleMoves;
}
*/
export function getPossibleMoves(player, x, y, isKing, pieces, onlyGetJumpMoves) {

    let possibleMoves = [];

    let isNotKingSquare;
    let xDirection;
    let isTwoBeforeKingSquare;

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