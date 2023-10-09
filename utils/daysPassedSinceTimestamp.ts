export const daysPassedSinceTimestamp = (startTimestamp: number): number => {
  const currentTimestamp = new Date().getTime() / 1000;
  const timeDiffSecs = currentTimestamp - ( startTimestamp / 1000 );
  return parseFloat((timeDiffSecs / (60 * 60 * 24)).toFixed(8));
};
