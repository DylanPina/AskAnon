import { Timestamp } from "firebase/firestore";

export type Message = {
  uid: string;
  fakeName: string;
  content: string;
  createdAt: Timestamp;
};
