import { Ship, GameBoard } from "./index.js";

describe("ship class works as expected", () => {
  test("creates a new ship as expected", () => {
    let testShip = new Ship(3);
    expect(testShip.length).toBe(3);
    expect(testShip.hitNumber).toBe(0);
  });

  test("throw error when attempting to create a ship of length less than 1 or greater than 5", () => {
    expect(() => new Ship(0)).toThrow(
      "length of the ship cannot be less than 1 or greater than 5",
    );
    expect(() => new Ship(6)).toThrow(
      "length of the ship cannot be less than 1 or greater than 5",
    );
  });

  test("increase the number of hits when hit() method is called", () => {
    let testShip = new Ship(4);
    testShip.hit();
    expect(testShip.hitNumber).toBe(1);
  });

  test("throw error when trying to hit a already sunk ship", () => {
    let testShip = new Ship(3);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(() => testShip.hit()).toThrow("can not hit a already sunk ship");
  });

  test("the ship sinks after hitting it, its length times", () => {
    let testShip = new Ship(3);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });
});

describe("GameBoard class works as expected", () => {
  test("creates a objects with board(7 * 7) as a property with null value initialized ", () => {
    let testBoard = new GameBoard(7);
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        expect(testBoard.board[i][j]).toBeNull();
      }
    }
  });

  test("throws error when the dimension is a negative number", () => {
    expect(() => new GameBoard(-2)).toThrow(
      "cannot generate a board whose dimension is not in between 5 and 10 (both inclusive)",
    );
  });

  test("throws error when the dimension is not in range of 5-10", () => {
    expect(() => new GameBoard(0)).toThrow(
      "cannot generate a board whose dimension is not in between 5 and 10 (both inclusive)",
    );
    expect(() => new GameBoard(4)).toThrow(
      "cannot generate a board whose dimension is not in between 5 and 10 (both inclusive)",
    );
    expect(() => new GameBoard(11)).toThrow(
      "cannot generate a board whose dimension is not in between 5 and 10 (both inclusive)",
    );
  });

  describe("place function works as expected", () => {
    test("can place a ship horizontally in positive x direction", () => {
      let ship1 = new Ship(4);
      let testBoard = new GameBoard(7);
      testBoard.place(ship1, [2, 3], "+x");
      for (let i = 3; i <= 6; i++) {
        expect(testBoard.board[2][i]).toContain(ship1);
      }
    });

    test("can place a ship horizontally in negative x direction", () => {
      let ship1 = new Ship(4);
      let testBoard = new GameBoard(7);
      testBoard.place(ship1, [2, 3], "-x");
      for (let i = 3; i >= 0; i--) {
        expect(testBoard.board[2][i]).toContain(ship1);
      }
      // console.table(testBoard.board);
    });

    test("can place a ship vertically in positive y direction", () => {
      let ship1 = new Ship(4);
      let testBoard = new GameBoard(7);
      testBoard.place(ship1, [4, 3], "+y");
      // console.table(testBoard.board);
      for (let i = 4; i >= 1; i--) {
        expect(testBoard.board[i][3]).toContain(ship1);
      }
    });

    test("can place a ship vertically in negative y direction", () => {
      let ship1 = new Ship(4);
      let testBoard = new GameBoard(7);
      testBoard.place(ship1, [1, 4], "-y");
      // console.table(testBoard.board);
      for (let i = 1; i <= 4; i++) {
        expect(testBoard.board[i][4]).toContain(ship1);
      }
    });

    test("throw error when trying to place ship outside the board(+ve x)", () => {
      let ship1 = new Ship(4);
      let testBoard = new GameBoard(7);
      expect(() => testBoard.place(ship1, [4, 5], "+x")).toThrow(
        "can not place ship out of the board",
      );
    });
    test("throw error when trying to place ship outside the board(-ve x)", () => {
      let ship1 = new Ship(3);
      let testBoard = new GameBoard(7);
      expect(() => testBoard.place(ship1, [4, 1], "-x")).toThrow(
        "can not place ship out of the board",
      );
    });
    test("throw error when trying to place ship outside the board(+ve x)", () => {
      let ship1 = new Ship(5);
      let testBoard = new GameBoard(7);
      expect(() => testBoard.place(ship1, [3, 3], "+y")).toThrow(
        "can not place ship out of the board",
      );
    });
    test("throw error when trying to place ship outside the board(+ve x)", () => {
      let ship1 = new Ship(4);
      let testBoard = new GameBoard(7);
      expect(() => testBoard.place(ship1, [5, 2], "-y")).toThrow(
        "can not place ship out of the board",
      );
    });
  });

  describe("receiveAttack method works as expected", () => {
    test("receives a attack on the area where there is a ship part and set its content to 'O'", () => {
      let testBoard = new GameBoard(7);
      let testShip = new Ship(4);
      testBoard.place(testShip, [3, 3], "+x");
      testBoard.receiveAttack([3, 5]);
      expect(testBoard.board[3][5]).toBe("O");
    });

    test("receives a attack on the area where there is no ship part and set its content to 'X'", () => {
      let testBoard = new GameBoard(7);
      let testShip = new Ship(4);
      testBoard.place(testShip, [3, 3], "+x");
      testBoard.receiveAttack([2, 5]);
      expect(testBoard.board[2][5]).toBe("X");
    });

    test("ship which is at the attack coordinate receives the hit", () => {
      let testBoard = new GameBoard(7);
      let testShip = new Ship(5);
      testBoard.place(testShip, [1, 1], "-y");
      testBoard.receiveAttack([3, 1]);
      testBoard.receiveAttack([2, 1]);
      expect(testShip.hitNumber).toBe(2);
    });

    test("return an error when attempting to attack a region that has already been hit", () => {
      let testBoard = new GameBoard(7);
      let testShip = new Ship(5);
      testBoard.place(testShip, [1, 1], "-y");
      testBoard.receiveAttack([3, 1]);
      expect(() => {
        testBoard.receiveAttack([3, 1]);
      }).toThrow(
        "region co-ordinates [3][1] has already been hit, can't hit a same region twice",
      );
    });
  });

  describe("allShipSunk method works as expected", () => {
    test("return false when all the ships are not sunk", () => {
      let testBoard = new GameBoard(7);
      let testShip1 = new Ship(5);
      let testShip2 = new Ship(3);
      testBoard.place(testShip1, [0, 0], "+X");
      testBoard.place(testShip2, [1, 0], "+x");
      testBoard.receiveAttack([0, 0]);
      testBoard.receiveAttack([1, 0]);
      expect(testBoard.allShipSunk()).toBe(false);
    });

    test("return true when all ship are sunk", () => {
      let testBoard = new GameBoard(7);
      let testShip1 = new Ship(5);
      let testShip2 = new Ship(3);
      testBoard.place(testShip1, [0, 0], "+X");
      testBoard.place(testShip2, [1, 0], "+x");

      for (let i = 0; i < 5; i++) {
        testShip1.hit();
      }
      for (let i = 0; i < 3; i++) {
        testShip2.hit();
      }
      expect(testBoard.allShipSunk()).toBe(true);
    });

    test("return false when some ships are sunk and some are not", () => {
      let testBoard = new GameBoard(7);
      let testShip1 = new Ship(5);
      let testShip2 = new Ship(3);
      testBoard.place(testShip1, [0, 0], "+X");
      testBoard.place(testShip2, [1, 0], "+x");

      for (let i = 0; i < 5; i++) {
        testShip1.hit();
      }

      expect(testBoard.allShipSunk()).toBe(false);
    });
  });
});
