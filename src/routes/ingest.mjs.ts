import { toMiles } from "../lib/to-miles.mjs";
import { round } from "lodash";
import { load as dotenv } from "dotenv-safe";
dotenv();

export default async function(req, res) {
  // Clean data from IFTTT
  const { createdAt, name, distanceMeters, elapsedTimeInSeconds } = req.body;
  const distanceMiles = round(toMiles(parseFloat(distanceMeters)), 1);
  const elapsedTimeInMinutes = round(parseInt(elapsedTimeInSeconds, 10) / 60);
  // Prepare request
  const { IFTTT_EVENT, IFTTT_KEY } = process.env;
  const options = {
    method: "POST",
    uri: `https://maker.ifttt.com/trigger/${IFTTT_EVENT}/with/key/${IFTTT_KEY}`,
    body: {
      value1: `${name} (${distanceMiles} mi) ${createdAt} for ${elapsedTimeInMinutes} minutes`
    },
    json: true
  };
  // Send data to IFTTT
  const [error, data] = await to(request(options));
  return res.send(error || data);
}
