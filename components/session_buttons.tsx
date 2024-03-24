"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import CreateSessionButton from "@/components/create_session_button";
import JoinSessionButton from "@/components/join_session_button";

export default function SessionButtons() {
  const [sessionCode, setSessionCode] = useState("");

  const handleInputChange = (e: any) => {
    setSessionCode(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-5">
      <Input
        className="bg-primary-white text-black"
        placeholder="Enter session code..."
        value={sessionCode}
        onChange={handleInputChange}
      />
      <div className="flex flex-col items-center space-y-3">
        <JoinSessionButton sessionCode={sessionCode} />
        <CreateSessionButton sessionCode={sessionCode} />
      </div>
    </div>
  );
}
