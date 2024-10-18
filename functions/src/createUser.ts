import { type GeoPoint, getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

export type UserInfo = {
  userId: string;
  userName: string;
  email: string;
  profileURL?: string;
  location?: GeoPoint;
  notificationDeviceId?: string;
  preferences?: Map<string, string>;
  socialMediaAccounts?: Map<string, string>;
};

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
