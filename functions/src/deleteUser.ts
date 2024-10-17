import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

type RequestData = {
  userId: string;
};

export const deleteUser = onCall<RequestData>(async (request) => {
  const { userId } = request.data;

  await getFirestore().collection("users").doc(userId).delete();
});
