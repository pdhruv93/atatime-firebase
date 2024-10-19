import { getFirestore } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { type UserInfo } from "./types";

type RequestData = Partial<Omit<UserInfo, "userId" | "email">> &
  Pick<UserInfo, "userId">;

/**
 * Updates the provided user fields
 * UserId is only accepted for finding the correct user and is not updatable
 * Email is not updatable
 */
export const updateUser = onCall<RequestData>(async (request) => {
  const { userId, ...restOfFields } = request.data;

  if (!userId) {
    throw new HttpsError(
      "invalid-argument",
      "Missing userId. Cannot update without userId"
    );
  }

  await getFirestore()
    .collection("users")
    .doc(userId)
    .set(
      {
        ...restOfFields,
      },
      { merge: true }
    );
});
