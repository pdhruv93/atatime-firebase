import { getMessaging, type MulticastMessage } from "firebase-admin/messaging";
import { HttpsError, onCall } from "firebase-functions/v2/https";

type RequestData = {
  title: string;
  body?: string;
  deviceIds: string[];
};

export const sendNotification = onCall<RequestData>(async (request) => {
  const { deviceIds, title, body } = request.data;

  if (!title) {
    throw new HttpsError(
      "invalid-argument",
      "Title is needed for sending the message"
    );
  }

  if (!deviceIds || deviceIds.length == 0) {
    throw new HttpsError(
      "invalid-argument",
      "There should be some valid device Ids to send message"
    );
  }

  const MESSAGE: MulticastMessage = {
    notification: {
      title,
      body,
    },
    tokens: deviceIds,
  };

  await getMessaging().sendEachForMulticast(MESSAGE, false);
});
