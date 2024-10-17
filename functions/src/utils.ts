/* eslint-disable require-jsdoc */

export function getFormattedActivityName(activityName: string) {
  return activityName.replace(/ /g, "_");
}
