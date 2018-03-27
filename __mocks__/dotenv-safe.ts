export const load = jest.fn(() => {
  process.env.IFTTT_EVENT = "IFTTT_EVENT";
  process.env.IFTTT_KEY = "IFTTT_KEY";
});
