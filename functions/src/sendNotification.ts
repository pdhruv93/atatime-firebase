import { getMessaging, type MulticastMessage } from "firebase-admin/messaging";
import { onCall } from "firebase-functions/v2/https";

type RequestData = {
  title: string;
  body?: string;
  deviceIds: string[];
};

export const sendNotification = onCall<RequestData>(async (request) => {
  const { deviceIds, title, body } = request.data;

  const MESSAGE: MulticastMessage = {
    notification: {
      title,
      body,
    },
    tokens: deviceIds,
  };

  await getMessaging().sendEachForMulticast(MESSAGE, false);
});
