import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { mockMessages } from "@/lib/mock-data/messages-mock-data";
import { db } from "@/firebase/firebase";

export async function GET() {
  // seedMessages("123", mockMessages);
  return Response.json({ message: `Seeding complete!` });
}

async function seedMessages(documentId: any, newElements: any): Promise<any> {
  const docRef = doc(db, "sessions", documentId);
  try {
    await updateDoc(docRef, {
      messages: arrayUnion(...newElements),
    });
    console.log(
      `Successfully added ${newElements.length} messages to session ${documentId}`,
    );
  } catch (error) {
    console.error("Error seeding messages: ", error);
  }

  return Response.json(docRef);
}
