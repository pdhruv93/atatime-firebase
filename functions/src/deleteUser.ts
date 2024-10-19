import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { type UserInfo } from "./types";

type RequestData = {
  userId: UserInfo["userId"];
  deleteOtherStoredData?: boolean;
};

export const deleteUser = onCall<RequestData>(async (request) => {
  const { userId, deleteOtherStoredData = true } = request.data;

  if (!userId) {
    throw new HttpsError(
      "invalid-argument",
      "Missing userId. Cannot delete without userId"
    );
  }

  const userSnapshot = await getFirestore()
    .collection("users")
    .doc(userId)
    .get();

  if (userSnapshot.exists) {
    await userSnapshot.ref.delete();
    const userData = userSnapshot.data() as UserInfo;

    if (deleteOtherStoredData && userData.profileURL) {
      await getStorage().bucket().file(userData.profileURL).delete();
    }
  }
});
