// @ts-check
describe("handler", () => {
  test("prepares outgoing data", () => {
    const event = {
      body:
        '{"createdAt":"March 17, 2018 at 02:00PM","name":"Afternoon Run","distanceMeters":"21375.5","elapsedTimeInSeconds":"7515"}'
    };
    const expected = {
      body: {
        value1:
          "Afternoon Run (13.3 mi) March 17, 2018 at 02:00PM for 125 minutes"
      },
      json: true,
      method: "POST",
      uri: "https://maker.ifttt.com/trigger/IFTTT_EVENT/with/key/IFTTT_KEY"
    };
    post.mockResolvedValueOnce(null);
    handler(event, null, () => {}).then(() => {
      expect(post.mock.calls[0][0]).toEqual(expected);
    });
  });

  test("sends message successfully", () => {
    const event = {
      body:
        '{"createdAt":"March 17, 2018 at 02:00PM","name":"Afternoon Run","distanceMeters":"21375.5","elapsedTimeInSeconds":"7515"}'
    };
    const expected = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Message sent!"
      })
    };
    post.mockResolvedValueOnce(null);
    handler(event, null, () => {})
      .then(data => {
        expect(data).toEqual(expected);
      })
      .catch(error => {
        expect(error).toBeFalsy();
      });
  });

  test("fails to send message", () => {
    const event = {
      body:
        '{"createdAt":"March 17, 2018 at 02:00PM","name":"Afternoon Run","distanceMeters":"21375.5","elapsedTimeInSeconds":"7515"}'
    };
    const expected = new Error("HI CLAY");
    post.mockRejectedValueOnce(expected);
    handler(event, null, () => {})
      .then(data => {
        expect(data).toBeFalsy();
      })
      .catch(error => {
        expect(error).toEqual(expected);
      });
  });
});
