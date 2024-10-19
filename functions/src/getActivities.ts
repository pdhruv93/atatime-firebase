import { getFirestore, FieldPath } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

type RequestData = {
  searchTerm?: string;
};

type ResponseData = string[];

/**
 * Returns all the activities with provided filter inputs
 * @param searchTerm the activities that needs to be searched. If nothing provided all the activities will be returned
 * @returns List of all activities for selected search criteria
 */
export const getActivities = onCall<RequestData, Promise<ResponseData>>(
  async (request) => {
    const { searchTerm } = request.data;
    const activities: string[] = ["exercising", "playing", "@gym"];

    const snapshot = await getFirestore()
      .collection("activities")
      .where(FieldPath.documentId(), ">=", searchTerm)
      .get();

    snapshot.docs.forEach(() => {
      /* hello */
    });

    return activities;
  }
);
