import {
  type GeoPoint,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { getFormattedActivityName } from "./utils";

type RequestData = {
  activityName: string;
  location: GeoPoint;
};

const MAX_ACTIVITY_NAME_LEN = 12;

export const createActivity = onCall<RequestData>(async (request) => {
  const { activityName, location } = request.data;
  const formattedActivityName = getFormattedActivityName(activityName);

  if (!activityName) {
    throw new HttpsError(
      "invalid-argument",
      "Missing activity name. Cannot create activity without activity name"
    );
  }

  if (activityName.length > MAX_ACTIVITY_NAME_LEN) {
    throw new HttpsError(
      "invalid-argument",
      `Too long activity name. Max allowed: ${MAX_ACTIVITY_NAME_LEN}`
    );
  }

  if (!location) {
    return {
      error: "The location where the activity is happening is required",
    };
  }

  await getFirestore()
    .collection("activities")
    .doc(formattedActivityName)
    .set({ userId: request.auth?.uid, time: Timestamp.now(), location });

  return;
});
