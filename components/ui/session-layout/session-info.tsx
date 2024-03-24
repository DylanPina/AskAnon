"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import exitIcon from "/public/images/exit-session.svg";
import infoIcon from "/public/images/info-icon.svg";

export default function SessionInfo() {
  const [showInfo, setShowInfo] = useState(false);
  const username = "YourUsername"; // to replace
  const professorName = "ProfessorName"; // to replace
  return (
    <div className="flex justify-between items-center bg-white bg-opacity-5">
      <div className="relative ml-2 mt-2">
        <Button
          className="bg-opacity-0 large-button"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          size="icon"
        >
          <Image
            priority
            src={infoIcon} // Your info icon
            width={50}
            height={50}
            alt="Info"
          />
        </Button>
        {showInfo && (
          <div className="absolute z-10 -right-40 w-48 p-2 bg-white rounded shadow-md">
            <p>Username: {username}</p>
            <p>Professor: {professorName}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <strong>
          <span className="text-2xl text-white">Class Name</span>
        </strong>
        <span className="text-[1rem] text-green-400">User Count</span>
      </div>
      <Button size="icon" className="mr-2 bg-opacity-0">
        <Image priority src={exitIcon} width={50} height={50} alt="Exit Session" />
      </Button>
    </div>
  );
}
