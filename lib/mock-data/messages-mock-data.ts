import { Timestamp } from "firebase/firestore";
import { Message } from "../definitions/message";

export const mockMessages: Message[] = [
  {
    uid: "3",
    fakeName: "Elongated Muskrat",
    content: "What class is this?",
    createdAt: Timestamp.now(),
  },
  {
    uid: "1",
    fakeName: "Anonymous Moose",
    content: "content",
    createdAt: Timestamp.now(),
  },
  {
    uid: "1",
    fakeName: "Anonymous Moose",
    content: "more content",
    createdAt: Timestamp.now(),
  },
  {
    uid: "1",
    fakeName: "Anonymous Moose",
    content: "even more content",
    createdAt: Timestamp.now(),
  },
  {
    uid: "2",
    fakeName: "Angry Panda",
    content: "Can you go over problem 3?",
    createdAt: Timestamp.now(),
  },
  {
    uid: "2",
    fakeName: "Angry Panda",
    content: "Can you go over problem 4?",
    createdAt: Timestamp.now(),
  },
  {
    uid: "3",
    fakeName: "Elongated Muskrat",
    content: "What class is this?",
    createdAt: Timestamp.now(),
  },
  {
    uid: "1",
    fakeName: "Anonymous Moose",
    content: "content",
    createdAt: Timestamp.now(),
  },
];
