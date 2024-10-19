import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";
import { type UserInfo } from "./types";

type RequestData = Pick<UserInfo, "userName" | "email">;

/**
 * Creates a new User with name and email address
 */
export const createUser = onCall<RequestData>(async (request) => {
  const { userName, email } = request.data;

  const addedUserDoc = await getFirestore().collection("users").add({
    userName,
    email,
  });

  return {
    createdUserId: addedUserDoc.id,
  };
});
