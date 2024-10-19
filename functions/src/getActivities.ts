import { getFirestore, FieldPath } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

type Error = { error: string };

type RequestData = {
  searchTerm?: string;
};

type ResponseData = Error | string[];

/**
 * Returns all the activities with provided filter inputs
 * @param searchTerm the activities that needs to be searched. If nothing provided all the activities will be returned
 * @returns List of all activities for selected search criteria
 */
export const getActivities = onCall<RequestData, Promise<ResponseData>>(
  async (request) => {
    const { searchTerm } = request.data;
    const activities: string[] = [];

    const snapshot = await getFirestore()
      .collection("activities")
      .where(FieldPath.documentId(), ">=", searchTerm)
      .where(FieldPath.documentId(), "<", searchTerm + "\uf8ff")
      .get();

    console.log(":::::::::::::::", snapshot.docs);

    snapshot.docs.forEach((doc) => activities.push(doc.data()["data"]));

    return activities;
  }
);
