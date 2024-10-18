import { getFirestore, FieldPath } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

type Error = { error: string };

type RequestData = {
  searchTerm?: string;
  searchExact?: boolean;
};

type ResponseData =
  | Error
  | {
      activities: string[];
    };

/**
 * Returns all the activities with provided filter inputs
 * @param searchTerm the activities that needs to be searched. If nothing provided all the activities will be returned
 * @param searchExact should perform exact or fuzzy search for activityName
 * @returns List of all activities for selected search criteria
 */
export const getActivities = onCall<RequestData, Promise<ResponseData>>(
  async (request) => {
    const { searchTerm, searchExact = false } = request.data;

    await getFirestore()
      .collection("activities")
      .where(FieldPath.documentId(), "in", searchTerm)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          console.log(doc.id, doc.data());
        });
      });

    return [];
  }
);
