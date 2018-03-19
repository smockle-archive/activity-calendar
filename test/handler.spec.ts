import { promisify } from "util";
import {
  handler as _handler,
  HandlerRequest,
  HandlerResponse
} from "../src/bin/index.mjs";
const handler = promisify(_handler);

describe("handler", () => {
  test("sends message successfully", () => {
    const event: HandlerRequest = {
      body: {
        createdAt: "March 17, 2018 at 02:00PM",
        name: "Afternoon Run",
        distanceMeters: "21375.5",
        elapsedTimeInSeconds: "7515"
      }
    };
    const expected: HandlerResponse = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Message sent!"
      })
    };
    handler(event, null)
      .then((data: HandlerResponse | null) => {
        expect(data).toEqual(expected);
      })
      .catch((error: Error | null) => {
        expect(error).toBeFalsy();
      });
  });
});
