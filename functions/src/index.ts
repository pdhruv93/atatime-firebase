import { initializeApp } from "firebase-admin/app";

export { createActivity } from "./createActivity";
export { getActivities } from "./getActivities";
export { createUser } from "./createUser";
export { deleteUser } from "./deleteUser";
export { getUsers } from "./getUsers";
export { sendNotification } from "./sendNotification";
export { updateUser } from "./updateUser";

initializeApp();
