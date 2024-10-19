import { type GeoPoint } from "firebase-admin/firestore";

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
