import { getFirestore } from "firebase-admin/firestore";
import { onRequest, HttpsError } from "firebase-functions/v2/https";

export const createActivity = onRequest(async (req, res) => {
  const { location } = req.query;

  if (!location) {
    throw new HttpsError(
      "invalid-argument",
      "The current location where the activity is happening is required"
    );
  }

  const writeResult = await getFirestore()
    .collection("activities")
    .add({ userId: "dummy", location });

  res.json({ createdEntryId: writeResult.id });
});
