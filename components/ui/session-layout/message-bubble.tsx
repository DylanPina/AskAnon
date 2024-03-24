"use client";

import React from "react";
import { Message } from "@/lib/definitions/message";
import { useUser } from "@auth0/nextjs-auth0/client";

type MessageBubbleProps = {
  group: Message[];
  isProfessor: boolean;
  professorEmail: string;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  group,
  professorEmail,
}) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-between">
      {group.map((message, idx) => (
        <div
          key={idx}
          className={`${message.uid === user?.email ? "items-end" : "items-start"}`}
        >
          {idx === 0 && (
            <div
              className={`flex ${message.uid !== user?.email ? "justify-start" : "justify-end"} items-center`}
            >
              {message.uid !== user?.email && (
                <>
                  <div className="mt-1 mr-2 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {/* Show user's initials if message is from user, otherwise show fake name initials */}
                    {message.uid === user?.email
                      ? user?.name?.slice(0, 2).toUpperCase() || "Professor"
                      : message.fakeName.slice(0, 2).toUpperCase()}
                  </div>
                  {/* Show user's real name if message is from user, otherwise show fake name */}
                  <span className="text-white">
                    {message.uid === user?.email
                      ? user?.name
                      : message.fakeName}
                  </span>
                </>
              )}
              <span className="text-sm text-gray-500 ml-4">
                {new Date(
                  message.createdAt.seconds * 1000,
                ).toLocaleTimeString()}{" "}
                {/* Adjust if your time format is different */}
              </span>
            </div>
          )}
          <div
            className={`flex ${message.uid === user?.email ? "justify-end" : "justify-start"} ${message.uid !== user?.email ? "ml-12" : ""}`}
          >
            <span
              className={`px-4 py-2 rounded-lg inline-block mb-1 ${message.uid === professorEmail ? "bg-purple-500 text-primary-white" : message.uid === user?.email ? "bg-blue-300" : "bg-gray-300"} text-gray-600`}
            >
              {message.content}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
