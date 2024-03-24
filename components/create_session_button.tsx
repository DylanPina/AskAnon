"use client";

import React from "react";
import { Button } from "./ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CreateSessionButton() {
  const { user } = useUser();

  return (
    <Button className="bg-primary-gray w-9/12 border border-white hover:bg-white hover:text-primary-gray">
      Create new session
    </Button>
  );
}
