import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { onCall } from "firebase-functions/v2/https";
import { type UserInfo } from "./createUser";

type RequestData = {
  userId: string;
  deleteOtherStoredData?: boolean;
};

export const deleteUser = onCall<RequestData>(async (request) => {
  const { userId, deleteOtherStoredData = true } = request.data;

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
