// @ts-check
const { _handler } = require("../src/index");

// Set environment variables
process.env.IFTTT_EVENT = "IFTTT_EVENT";
process.env.IFTTT_KEY = "IFTTT_KEY";

describe("handler", async () => {
  test("prepares outgoing data", async () => {
    let actual;
    await _handler(x => (actual = x))({
      body:
        '{"createdAt":"March 17, 2018 at 02:00PM","name":"Afternoon Run","distanceMeters":"21375.5","elapsedTimeInSeconds":"7515"}'
    });
    const expected = {
      hostname: "maker.ifttt.com",
      path: "/trigger/IFTTT_EVENT/with/key/IFTTT_KEY",
      body: {
        value1:
          "Afternoon Run (13.3 mi) March 17, 2018 at 02:00PM for 125 minutes"
      }
    };
    expect(actual).toEqual(expected);
  });

  test("sends message successfully", async () => {
    const actual = await _handler(x => x)({
      body:
        '{"createdAt":"March 17, 2018 at 02:00PM","name":"Afternoon Run","distanceMeters":"21375.5","elapsedTimeInSeconds":"7515"}'
    });
    const expected = {
      statusCode: 200,
      body: "Message sent!"
    };
    expect(actual).toEqual(expected);
  });

  test("fails to send message", async () => {
    let actual;
    try {
      await _handler(() => {
        throw new Error("HI CLAY");
      })({
        body:
          '{"createdAt":"March 17, 2018 at 02:00PM","name":"Afternoon Run","distanceMeters":"21375.5","elapsedTimeInSeconds":"7515"}'
      });
    } catch (error) {
      actual = error;
    }
    const expected = new Error("HI CLAY");
    expect(actual).toEqual(expected);
  });
});
