import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";
import { type UserInfo } from "./createUser";

type RequestData = Partial<Omit<UserInfo, "userId" | "email">> &
  Pick<UserInfo, "userId">;

/**
 * Updates the provided user fields
 * UserId is only accepted for finding the correct user and is not updatable
 * Email is not updatable
 */
export const updateUser = onCall<RequestData>(async (request) => {
  const { userId, ...restOfFields } = request.data;

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
