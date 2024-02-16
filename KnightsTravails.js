const board = new Map();

const createSquare = (x, y) => {
    let predecessor;

    const KNIGHT_MOVES = [
        [1,2], [1,-2],
        [2,1], [2,-1],
        [-1,2], [-1,-2],
        [-2,1], [-2,-1]
    ];

    const displayMove = () => `[${x},${y}]`;
    const getPredecessor = () => predecessor;
    const setPredecessor = newPredecessor => {
        predecessor = predecessor || newPredecessor;
    }

    const checkMoves = (xMove, yMove) => {
        const [validX, validY] = [x + xMove, y + yMove];
        if (validX >= 0 && validX <= 7 && validY >= 0 && validY <= 7) {
            return createSquare(validX, validY);
        }
    }

    const possibleMoves = () => {
        return KNIGHT_MOVES
            .map(move => checkMoves(move[0], move[1]))
            .filter(move => move !== undefined);
    }

    if (board.has(displayMove())) {
        return board.get(displayMove());
    } else {
        const newSquare = { displayMove, getPredecessor, setPredecessor, possibleMoves };
        board.set(displayMove(), newSquare);
        return newSquare;
    }
}

const knightsTravails = (start, end) => {
    board.clear();

    const origin = createSquare(...start);
    const target = createSquare(...end);

    const queue = [origin];
    while (!queue.includes(target)) {
        const current = queue.shift();
        const moves = current.possibleMoves();
        moves.forEach(square => square.setPredecessor(current));
        queue.push(...moves);
    }

    const path = [target];
    while (!path.includes(origin)) {
        const prevSquare = path[0].getPredecessor();
        path.unshift(prevSquare);
    }
    console.log(`You made it in ${path.length - 1} moves!`);
    console.log(`Here's your path:`);
    path.forEach(move => console.log(move.displayMove()));
}

knightsTravails([3,3], [4,3]);