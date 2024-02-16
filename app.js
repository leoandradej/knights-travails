const KNIGHT_MOVES = [
    [1,2], [1,-2],
    [2,1], [2,-1],
    [-1,2], [-1,-2],
    [-2,1], [-2,-1]
];

const checkMoves = (xMove, yMove) => {
    const [validX, validY] = [1 + xMove, 2 + yMove];
    if (validX >= 0 && validX <= 7 && validY >= 0 && validY <= 7) {
        return [validX, validY];
    }
}

const possibleMoves = () => {
    return KNIGHT_MOVES
        .map(move => checkMoves(move[0], move[1]))
        .filter(move => move !== undefined);
}

console.log(possibleMoves())