import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔒Open Auth
        </h1>
        <p className="text-white text-lg">一个简单的认证服务</p>
        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              登录
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
