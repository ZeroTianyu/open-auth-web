import { FaGithub } from "react-icons/fa";
import { SiGitee } from "react-icons/si";
import { IoLogoWechat } from "react-icons/io5";
import { Button } from "@/components/ui/button";
/**
* 根据类型发起OAuth2授权申请
* @param type 三方OAuth2登录提供商类型
*/
const thirdLogin = (type: string) => {
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${type}`;
}

export default function Social() {
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
        onClick={() => { thirdLogin("github") }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>


      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => { thirdLogin("gitee") }}
      >
        <SiGitee className="h-5 w-5" />
      </Button>

      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => { thirdLogin("wechat") }}
      >
        <IoLogoWechat className="h-5 w-5" />
      </Button>
    </div>
  );
}
