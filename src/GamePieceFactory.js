/**
 * Creates a new game piece object.
 * @param {*} id The id of the piece.
 * @param {*} player The player that owns this piece.
 * @param {*} x The initial x-coordinate of the piece.
 * @param {*} y The initial y-coordinate of the piece.
 */
export function Create(id, player, x, y) {
    return { 
        id: id, 
        player: player, 
        isKing: false, 
        isSelected: false, 
        xPos: x, 
        yPos: y,
        dragStart: null,
        dragEnd: null
    };
}