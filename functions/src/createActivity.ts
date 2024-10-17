import {
  type GeoPoint,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

type RequestData = {
  location: GeoPoint;
};

export const createActivity = onCall<RequestData>(async (request) => {
  const { location } = request.data;

  if (!location) {
    return {
      error: "The current location where the activity is happening is required",
    };
  }

  const createdDocument = await getFirestore()
    .collection("activities")
    .add({ userId: request.auth?.uid, time: Timestamp.now(), location });

  return {
    createdDocId: createdDocument.id,
  };
});
