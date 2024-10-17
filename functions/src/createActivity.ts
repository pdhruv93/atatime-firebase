import {
  type GeoPoint,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

type RequestData = {
  activityName: string;
  location: GeoPoint;
};

const MAX_ACTIVITY_NAME_LEN = 12;

export const createActivity = onCall<RequestData>(async (request) => {
  const { activityName, location } = request.data;

  if (!location) {
    return {
      error: "The current location where the activity is happening is required",
    };
  }

  if (activityName.length > MAX_ACTIVITY_NAME_LEN) {
    return {
      error: `Too long activity name. Max allowed: ${MAX_ACTIVITY_NAME_LEN}`,
    };
  }

  const formattedActivityName = activityName.replace(/ /g, "_");

  const createdDocument = await getFirestore()
    .collection("activities")
    .doc(formattedActivityName)
    .update({ userId: request.auth?.uid, time: Timestamp.now(), location });

  return {
    createdDocument,
  };
});
