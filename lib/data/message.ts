import { db } from "@/firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getFakeName, sessionExists } from "./session";

/**
 * Creates a message in a session
 *
 * @param sessionId - ID of the session
 * @param uid - ID of the user sending the message
 * @param fakeName - Fake name of the user
 * @param content - Content of the message
 */
export async function createMessage(
  sessionId: string,
  uid: string,
  content: string,
) {
  if (!(await sessionExists(sessionId))) {
    throw new Error(
      `Failed to create a message! Session: [${sessionId}] does not exist`,
    );
  }

  const fakeName = await getFakeName(sessionId, uid);
  if (!fakeName) {
    throw new Error(
      `Failed to create a message! User: [${uid}] does not exist in session: [${sessionId}]`,
    );
  }

  const messageRef = await addDoc(
    collection(db, "sessions", sessionId, "messages"),
    {
      uid: uid,
      fakeName: fakeName,
      content: content,
      createdAt: Timestamp.now(),
    },
  );

  return messageRef;
}
