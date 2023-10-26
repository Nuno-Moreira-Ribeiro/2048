const {
    moveLeft,
    moveDown,
    moveRight,
    moveUp,
} = require('../script');



test('Test unitaire pour moveLeft', () => {
    const board = [
        [2, 0, 0, 2],
        [2, 2, 4, 4],
        [0, 0, 2, 2],
        [2, 2, 2, 2]
    ];
    console.log("LEFT");
    moveLeft(board);
    console.log(board);

    // Assurez-vous que le résultat du déplacement à gauche est correct
    expect(board).toEqual([
        [4, 0, 0, 0],
        [4, 8, 0, 0],
        [4, 0, 0, 0],
        [4, 4, 0, 0]
    ]);
});

test('Test unitaire pour moveRight', () => {
    const board = [
        [2, 0, 0, 2],
        [2, 2, 4, 4],
        [0, 0, 2, 2],
        [8, 2, 2, 2]
    ];
    console.log("RIGHT");
    moveRight(board);
    console.log(board);

    // Assurez-vous que le résultat du déplacement à droite est correct
    expect(board).toEqual([
        [0, 0, 0, 4],
        [0, 0, 4, 8],
        [0, 0, 0, 4],
        [0, 8, 2, 4]
    ]);
});

test('Test unitaire pour moveUp', () => {
    const board = [
        [2, 0, 0, 2],
        [2, 2, 4, 4],
        [0, 0, 2, 2],
        [2, 2, 2, 2]
    ];
    console.log("UP");
    moveUp(board);
    console.log(board);

    // Assurez-vous que le résultat du déplacement vers le haut est correct
    expect(board).toEqual([
        [4, 4, 4, 2],
        [2, 0, 4, 4],
        [0, 0, 0, 4],
        [0, 0, 0, 0]
    ]);
});

test('Test unitaire pour moveDown', () => {
    const board = [
        [2, 0, 0, 2],
        [2, 2, 4, 4],
        [0, 0, 2, 2],
        [2, 2, 2, 2]
    ];

    moveDown(board);
    console.log("DOWN");
    console.log(board);

    // Assurez-vous que le résultat du déplacement vers le bas est correct
    expect(board).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 2],
        [2, 0, 4, 4],
        [4, 4, 4, 4]
    ]);
});