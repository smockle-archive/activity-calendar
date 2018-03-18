import { Handler, Context, Callback } from "aws-lambda";
import { round } from "lodash";
import * as request from "request-promise";
import { toMiles } from "../lib/to-miles.mjs";
import { load as dotenv } from "dotenv-safe";
dotenv();

export interface HandlerRequest {
  [key: string]: any;
  body: {
    [key: string]: any;
    createdAt: string;
    name: string;
    distanceMeters: string;
    elapsedTimeInSeconds: string;
  };
}

export interface HandlerResponse {
  statusCode: number;
  body: string;
}

export const handler: Handler = (
  event: HandlerRequest,
  context: Context,
  callback: Callback
) => {
  // Clean incoming data (from IFTTT)
  const { createdAt, name, distanceMeters, elapsedTimeInSeconds } = event.body;
  const distanceMiles: number = round(toMiles(parseFloat(distanceMeters)), 1);
  const elapsedTimeInMinutes: number = round(
    parseInt(elapsedTimeInSeconds, 10) / 60
  );
  // Prepare outgoing data
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
  const response: HandlerResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Message sent!"
    })
  };
  request(options)
    .then(() => callback(null, response))
    .catch(error => callback(error));
};
