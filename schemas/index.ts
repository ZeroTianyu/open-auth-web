import * as z from "zod";

// 登录
export const LoginSchema = z.object({
  username: z.string().min(5, { message: "用户名最少5位" }),
  password: z.string().min(1, {
    message: "密码是必须的",
  }),
  code: z.string().length(4, {
    message: "验证码为4位",
  }),
  captchaId: z.string(),
  loginType: z.string(),
});

// 确认授权
export const ConsentSchema = z.object({
  scope: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "您必须至少选择一项。",
  }),
});
