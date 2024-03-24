"use client";
import React from "react";
import { Message } from "@/lib/definitions/message";
import { useUser } from "@auth0/nextjs-auth0/client";
import firebase from "firebase/app";
import { Timestamp } from "firebase/firestore";

type MessageBubbleProps = {
  group: Message[];
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ group }) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-between">
      {group.map((message, idx) => (
        <div
          key={idx}
          className={`${
            message.uid === "1"
              ? //user?.sub
                "items-end"
              : "items-start"
          }`}
        >
          {idx === 0 && (
            <div
              className={`flex ${
                message.uid !== "1"
                  ? //user?.sub
                    "justify-start"
                  : "justify-end"
              } items-center`}
            >
              {message.uid !== "1" && (
                //user?.sub
                <>
                  <div className="mt-1 mr-2 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {message.fakeName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-white">{message.fakeName}</span>
                </>
              )}
              <span className="text-sm text-gray-500 ml-4">
                {message.createdAt ? message.createdAt.toDate().toLocaleTimeString() : "Unknown time"}
              </span>
            </div>
          )}
          <div
            className={`flex ${
              message.uid === "1"
                ? //user?.sub
                  "justify-end"
                : "justify-start"
            } ${message.uid !== user?.sub ? "ml-12" : ""}`}
          >
            <span
              className={`px-4 py-2 rounded-lg inline-block mb-1 ${
                message.uid === "1"
                  ? //user?.sub
                    "bg-blue-300"
                  : "bg-gray-300"
              } text-gray-600`}
            >
              {message.content}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
