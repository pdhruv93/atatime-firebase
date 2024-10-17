import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

export type UserInfo = {
  userId: string;
  userName: string;
  profileURL: string;
  notificationDeviceId?: string;
  preferences?: Map<string, string>;
  socialMediaAccounts?: Map<string, string>;
};

type RequestData = UserInfo;

export const createOrUpdateUser = onCall<RequestData>(async (request) => {
  const {
    userId,
    userName,
    profileURL,
    notificationDeviceId = "",
    preferences = new Map<string, string>(),
    socialMediaAccounts = new Map<string, string>(),
  } = request.data;

  await getFirestore().collection("users").doc(userId).set(
    {
      userId,
      userName,
      profileURL,
      notificationDeviceId,
      preferences,
      socialMediaAccounts,
    },
    { merge: true }
  );
});
