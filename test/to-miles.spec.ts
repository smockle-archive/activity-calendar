import { toMiles } from "../src/lib/to-miles.mjs";
const threshold: number = 0.000001;

describe("toMiles", () => {
  test("default", () => {
    const meters: number = 3284.6;
    const expected: number = 2.04095582;
    const actual: number = toMiles(meters);
    expect(Math.abs(actual - expected)).toBeLessThan(threshold);
  });
});
