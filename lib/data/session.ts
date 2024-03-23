import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Creates a session in the database
 *
 * @param professorId - ID of the professor creating the session
 * @param sessionName - Name of the session
 */
export async function createSession(professorId: string, sessionName: string) {
  if (!sessionName) {
    throw new Error("Session name is required");
  }

  if (await sessionExists(sessionName)) {
    throw new Error(`Session: [${sessionName}] already exists`);
  }

  const docRef = await setDoc(doc(db, "sessions", sessionName), {
    professor: professorId,
    messages: [],
    users: [],
    banned_users: [],
  });
  return docRef;
}

/**
 * Checks if a session already exists in the database.
 *
 * @param sessionName - Name of the session to check.
 * @returns Boolean indicating whether the session exists.
 */
export async function sessionExists(sessionName: string): Promise<boolean> {
  const sessionRef = doc(collection(db, "sessions"), sessionName);
  const docSnap = await getDoc(sessionRef);
  return docSnap.exists();
}
