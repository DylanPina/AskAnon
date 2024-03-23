import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Check if an email belongs to a professor
 *
 * @param userId - ID of the user to check
 */
export async function isProfessor(email: string) {
  const docRef = doc(db, "professors", email);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}
