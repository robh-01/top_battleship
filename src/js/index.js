//comment this "style.css" import while testing
import "../style.css";

class Ship {
  constructor(length) {
    if (length < 1) throw new Error("length of the ship cannot be less than 1");
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
export { Ship };
