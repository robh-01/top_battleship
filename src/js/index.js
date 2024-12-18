//comment this "style.css" import while testing
// import "../style.css";

class Ship {
  constructor(length) {
    if (length < 1 || length > 5)
      throw new Error(
        "length of the ship cannot be less than 1 or greater than 5",
      );
    this.length = length;
    this.hitNumber = 0;
  }

  hit() {
    if (this.hitNumber === this.length)
      throw new Error("can not hit a already sunk ship");
    this.hitNumber++;
  }

  isSunk() {
    if (this.hitNumber == this.length) return true;
    else return false;
  }
}

class GameBoard {
  constructor(dimension) {
    if (!(dimension >= 5 && dimension <= 10))
      throw new Error(
        "cannot generate a board whose dimension is not in between 5 and 10 (both inclusive)",
      );
    this.dimension = dimension;
    this.board = Array.from({ length: dimension }, () =>
      Array(dimension).fill(null),
    );
    this.shipList = [];
  }

  place(ship, pointToStartPlacing, directionToPlace) {
    let shipLength = ship.length;
    const [startX, startY] = pointToStartPlacing;

    if (directionToPlace === "+x") {
      //if the ship will reach outside the board after placement, throw error
      if (startY + ship.length - 1 > this.dimension)
        throw new Error("can not place ship out of the board");

      //if any region of the board we are trying to place ship contains a ship already throw error
      for (let i = 0; i < shipLength; i++) {
        if (this.board[startX][startY + i])
          throw new Error("trying to place ship in a preoccupied region");
      }
      //place the ship
      for (let i = 0; i < shipLength; i++) {
        this.board[startX][startY + i] = [ship]; //every part will contain with array with one element
        //referencing to the ship
      }
    }

    if (directionToPlace === "-x") {
      //if the ship will reach outside the board after placement, throw error
      if (startY - ship.length + 1 < 0)
        throw new Error("can not place ship out of the board");

      //if any region of the board we are trying to place ship contains a ship already throw error
      for (let i = 0; i < shipLength; i++) {
        if (this.board[startX][startY - i])
          throw new Error("trying to place ship in a preoccupied region");
      }

      //place the ship
      for (let i = 0; i < shipLength; i++) {
        this.board[startX][startY - i] = [ship];
      }
    }

    if (directionToPlace === "+y") {
      //if the ship will reach outside the board after placement, throw error
      if (startX - ship.length + 1 < 0)
        throw new Error("can not place ship out of the board");

      //if any region of the board we are trying to place ship contains a ship already throw error
      for (let i = 0; i < shipLength; i++) {
        if (this.board[startX - i][startY])
          throw new Error("trying to place ship in a preoccupied region");
      }

      //place the ship
      for (let i = 0; i < shipLength; i++) {
        this.board[startX - i][startY] = [ship];
      }
    }

    if (directionToPlace === "-y") {
      //if the ship will reach outside the board after placement, throw error
      if (startX + ship.length - 1 > this.dimension)
        throw new Error("can not place ship out of the board");

      for (let i = 0; i < shipLength; i++) {
        if (this.board[startX + i][startY])
          throw new Error("trying to place ship in a preoccupied region");
      }
      //place the ship
      for (let i = 0; i < shipLength; i++) {
        this.board[startX + i][startY] = [ship];
      }
    }

    this.shipList.push(ship);
  }

  receiveAttack(attackCoordinate) {
    let [attackX, attackY] = attackCoordinate;

    if (this.board[attackX][attackY]) {
      // if the region was already hit, throw error
      if (
        this.board[attackX][attackY] === "X" ||
        this.board[attackX][attackY] === "O"
      ) {
        throw new Error(
          `region co-ordinates [${attackX}][${attackY}] has already been hit, can't hit a same region twice`,
        );
      }
      this.board[attackX][attackY][0].hit(); //call the hit method on the ship at the area of the attack
      this.board[attackX][attackY] = "O";
    } else {
      this.board[attackX][attackY] = "X";
    }
  }

  allShipSunk() {
    return this.shipList.every((ship) => ship.isSunk());
  }
}
export { Ship, GameBoard };
