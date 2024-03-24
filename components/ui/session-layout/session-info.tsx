import { Button } from "@/components/ui/button";
import Image from "next/image";
import exitIcon from "/public/images/exit-session.svg";

export default function Session_Info() {
  return (
    <div className="flex justify-between items-center bg-white bg-opacity-5">
      <Button className="bg-opacity-0 visibility: invisible">
        <Image priority src={exitIcon} width={50} height={50} alt="Exit Session" />
      </Button>
      <div className="flex flex-col items-center">
        <strong>
          <span className="text-2xl text-white">Class Name</span>
        </strong>
        <span className="text-[1rem] text-green-400">User Count</span>
      </div>
      <Button className="bg-opacity-0">
        <Image priority src={exitIcon} width={50} height={50} alt="Exit Session" />
      </Button>
    </div>
  );
}
