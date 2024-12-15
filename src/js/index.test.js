import { Ship } from "./index.js";

describe("ship class works as expected", () => {
  test("creates a new ship as expected", () => {
    let testShip = new Ship(3);
    expect(testShip.length).toBe(3);
    expect(testShip.hitNumber).toBe(0);
  });

  test("throw error when attempting to create a ship of length less than 1", () => {
    expect(() => new Ship(0)).toThrow(
      "length of the ship cannot be less than 1",
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
