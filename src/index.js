// @ts-check
const https = require("https");

const post = ({ method = "POST", body = {}, headers = {}, ...options }) =>
  new Promise((resolve, reject) => {
    const request = https.request(
      {
        method,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(JSON.stringify(body), "utf8"),
          ...headers
        },
        ...options
      },
      res => {
        res.on("data", resolve);
      }
    );
    request.on("error", reject);
    request.write(JSON.stringify(body));
    request.end();
  });

const handler = post => async event => {
  // Get environment variables
  const { IFTTT_EVENT, IFTTT_KEY } = process.env;
  if (!IFTTT_EVENT || !IFTTT_KEY) {
    throw new Error("Missing environment variables");
  }

  // Get run details (from IFTTT via AWS API Gateway)
  if (!event.body) {
    throw new Error("Missing event body");
  }
  const { createdAt, distanceMeters, elapsedTimeInSeconds, name } = JSON.parse(
    event.body
  );
  if (!createdAt || !distanceMeters || !elapsedTimeInSeconds || !name) {
    throw new Error("Missing event details");
  }

  // Convert values
  const distanceMiles = parseFloat(
    (parseFloat(distanceMeters) * 0.000621371).toFixed(1)
  );
  const elapsedTimeInMinutes = parseInt(
    (parseInt(elapsedTimeInSeconds, 10) / 60).toFixed(0)
  );

  try {
    // Post new values to IFTTT
    await post({
      hostname: "maker.ifttt.com",
      path: `/trigger/${IFTTT_EVENT}/with/key/${IFTTT_KEY}`,
      body: {
        value1: `${name} (${distanceMiles} mi) ${createdAt} for ${elapsedTimeInMinutes} minutes`
      }
    });
    return {
      statusCode: 200,
      body: "Message sent!"
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handler: handler(post),
  _handler: handler
};
