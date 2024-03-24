import React from "react";
import { FaUserSecret } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

interface Props {
  count: number;
}

export default function UserCount({ count }: Props) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <IconContext.Provider value={{ color: "#fafafa" }}>
        <FaUserSecret />
        <span className="text-sm text-primary-white">
          {count}/<span className="text-primary-white/50">100</span>
        </span>
      </IconContext.Provider>
    </div>
  );
}
