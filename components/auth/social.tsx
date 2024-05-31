import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGitee } from "react-icons/si";
import { IoLogoWechat } from "react-icons/io5";
import { Button } from "@/components/ui/button";
/**
* 根据类型发起OAuth2授权申请
* @param type 三方OAuth2登录提供商类型
*/
const thirdLogin = (baseUrl: string, type: string) => {
  window.location.href = `${baseUrl}/oauth2/authorization/${type}`;
}

export default function Social() {
  const baseUrl = process.env.BASE_URL || "";

  return (
    <div className="flex items-center w-full gap-x-2">
      {/* <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => { thirdLogin("google") }}
      >
        <FaGoogle className="h-5 w-5" />
      </Button> */}
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => { thirdLogin(baseUrl, "github") }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>


      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => { thirdLogin(baseUrl,"gitee") }}
      >
        <SiGitee className="h-5 w-5" />
      </Button>

      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => { thirdLogin(baseUrl,"wechat") }}
      >
        <IoLogoWechat className="h-5 w-5" />
      </Button>
    </div>
  );
}
