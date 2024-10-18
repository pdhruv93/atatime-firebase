import {
  type GeoPoint,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";
import { getFormattedActivityName } from "./utils";

type RequestData = {
  activityName: string;
  location: GeoPoint;
};

const MAX_ACTIVITY_NAME_LEN = 12;

export const createActivity = onCall<RequestData>(async (request) => {
  const { activityName, location } = request.data;
  const formattedActivityName = getFormattedActivityName(activityName);

  if (activityName.length > MAX_ACTIVITY_NAME_LEN) {
    return {
      error: `Too long activity name. Max allowed: ${MAX_ACTIVITY_NAME_LEN}`,
    };
  }

  if (!location) {
    return {
      error: "The location where the activity is happening is required",
    };
  }

  const createdDocument = await getFirestore()
    .collection("activities")
    .doc(formattedActivityName)
    .set({ userId: request.auth?.uid, time: Timestamp.now(), location });

  return {
    createdDocument,
  };
});
