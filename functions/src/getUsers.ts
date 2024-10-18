import { GeoPoint, Timestamp, getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";
import { type UserInfo } from "./createUser";

type Error = { error: string };

type RequestData = {
  activityName?: string;
  location: GeoPoint;
  radius?: number;
  count?: number;
  searchExact?: boolean;
  afterTime?: Timestamp;
  sort?: "LOCATION" | "TIME";
};

type ResponseData =
  | Error
  | {
      activityName: string | undefined;
      totalResults: number;
      users: UserInfo[];
    };

const MAX_RADIUS_ALLOWED = 12;
const MAX_RESULTS_COUNT = 15;
// const TIME_RANGE = new Date(Date.now() - 60 * 60 * 1000); // 1 Hour back

/**
 * Returns all the Users with provided filter inputs
 * @param activityName the activities that needs to be searched
 * @param location the base location around which the search needs to be made
 * @param radius the radius around base location that needs to be searched for.
 * @param count the max number of results that will be returned. The returned results might be less
 * @param searchExact should perform exact or fuzzy search for activityName
 * @param afterTime return only resulsts after timestamp
 * @param sort sort based on nearest to you(Default) or based on time.
 * @returns List of all Users who are match the selected search criteria
 */
export const getUsers = onCall<RequestData, Promise<ResponseData>>(
  async (request) => {
    const {
      activityName,
      location,
      radius = MAX_RADIUS_ALLOWED,
      count = MAX_RESULTS_COUNT,
    } = request.data;

    if (!location) {
      return {
        error: "A base location is needed to find the nearby activities",
      };
    }

    if (radius > MAX_RADIUS_ALLOWED) {
      return {
        error: `Too big radius. Max allowed: ${MAX_RADIUS_ALLOWED}`,
      };
    }

    if (count > MAX_RESULTS_COUNT) {
      return {
        error: `Cannot return so many results. Max allowed: ${MAX_RESULTS_COUNT}`,
      };
    }

    await getFirestore()
      .collection("activities")
      .where("FIELD_NAME", "==", "FIELD_VALUE")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          console.log(doc.id, doc.data());
        });
      });

    const DUMMY_RESPONSE: ResponseData = {
      activityName,
      totalResults: 2,
      users: [
        {
          userId: "111",
          userName: "Test User1",
          email: "test1@gmail.com",
          profileURL: "https://abc.com",
        },
        {
          userId: "111",
          userName: "Test User1",
          email: "test2@gmail.com",
          profileURL: "https://abc.com",
          location: new GeoPoint(65, 68),
        },
      ],
    };

    return DUMMY_RESPONSE;
  }
);
