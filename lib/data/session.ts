import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { generateGoofyName } from "./goofy_names";

/**
 * Creates a session in the database
 *
 * @param professorEmail - ID of the professor creating the session
 * @param sessionName - Name of the session
 */
export async function createSession(
  professorEmail: string,
  sessionName: string,
) {
  if (!sessionName) {
    throw new Error("Session name is required");
  }

  if (await sessionExists(sessionName)) {
    throw new Error(`Session: [${sessionName}] already exists`);
  }

  const docRef = await setDoc(doc(db, "sessions", sessionName), {
    professor: professorEmail,
  });
  return docRef;
}

/**
 * Join a session
 *
 * @param uid - ID of the user joining the session
 * @param sessionName - Name of the session
 */
export async function joinSession(uid: string, sessionName: string) {
  if (!(await sessionExists(sessionName))) {
    throw new Error(`Session: [${sessionName}] does not exist`);
  }

  if (await userExistsInSession(sessionName, uid)) {
    throw new Error(
      `User: [${uid}] already exists in session: [${sessionName}]`,
    );
  }

  let attempts = 0;
  let goofyName = generateGoofyName();
  let nameExists = await nameExistsInSession(sessionName, goofyName);

  while (nameExists && attempts < 10) {
    goofyName = generateGoofyName();
    nameExists = await nameExistsInSession(sessionName, goofyName);
    attempts++;
  }

  if (nameExists) {
    throw new Error(
      `Could not generate a unique fake name after ${attempts} attempts`,
    );
  }

  await addDoc(collection(db, "sessions", sessionName, "users"), {
    uid: uid,
    fakeName: goofyName,
  });
}

/**
 * Leave a session
 *
 * @param uid - ID of the user leaving the session
 * @param sessionName - Name of the session
 */
export async function leaveSession(uid: string, sessionName: string) {
  if (!(await sessionExists(sessionName))) {
    throw new Error(`Session: [${sessionName}] does not exist`);
  }

  const usersRef = collection(db, "sessions", sessionName, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error(
      `User: [${uid}] does not exist in session: [${sessionName}]`,
    );
  }

  const userDoc = querySnapshot.docs[0];
  await deleteDoc(userDoc.ref);
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

/** Checks if user exists in a session
 *
 * @param sessionName - ID of the session to check
 * @param uid - ID of the user to check
 */
export async function userExistsInSession(
  sessionName: string,
  uid: string,
): Promise<boolean> {
  const usersRef = collection(db, "sessions", sessionName, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

/**
 * Checks if a name exists in a session
 *
 * @param sessionName - ID of the session to check
 * @param name - Name to check
 */
export async function nameExistsInSession(
  sessionName: string,
  name: string,
): Promise<boolean> {
  const usersRef = collection(db, "sessions", sessionName, "users");
  const q = query(usersRef, where("fakeName", "==", name));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

/**
 * Deletes a session given a sessionName.
 *
 * @param sessionName - ID of the session to delete.
 */
export async function deleteSession(sessionName: string) {
  const sessionRef = doc(db, "sessions", sessionName);

  try {
    await deleteDoc(sessionRef);
    console.log(
      `Session with ID ${sessionName} has been successfully deleted.`,
    );
  } catch (error) {
    console.error("Error deleting session:", error);
  }
}

/**
 * Checks if a user is a professor
 *
 * @param uid - ID of the user to check
 */
export async function isProfessor(uid: string) {
  const docRef = doc(db, "professors", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

/**
 * Gets the fakeName associated with the uid in the session
 *
 * @param sessionName - Name of the session
 * @param uid - ID of the user
 */
export async function getFakeName(
  sessionName: string,
  uid: string,
): Promise<string> {
  const usersRef = collection(db, "sessions", sessionName, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error(
      `User: [${uid}] does not exist in session: [${sessionName}]`,
    );
  }

  const userDoc = querySnapshot.docs[0];
  return userDoc.data().fakeName;
}

/**
 * Get number of users in a session
 *
 * @param sessionName - Name of the session
 */
export async function getUserCount(sessionName: string): Promise<number> {
  const usersRef = collection(db, "sessions", sessionName, "users");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}

/**
 * Remove a message from a session
 *
 * @param sessionId - ID of the session
 * @param messageId - ID of the message
 */
export async function deleteMessage(sessionId: string, messageId: string) {
  const messageRef = doc(db, "sessions", sessionId, "messages", messageId);
  await deleteDoc(messageRef);
}
