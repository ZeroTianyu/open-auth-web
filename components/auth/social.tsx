"use client";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGitee } from "react-icons/si";
import { IoLogoWechat } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGoogle className="h-5 w-5" />
      </Button>

      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGithub className="h-5 w-5" />
      </Button>

      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <SiGitee className="h-5 w-5" />
      </Button>

      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <IoLogoWechat className="h-5 w-5" />
      </Button>
    </div>
  );
}
