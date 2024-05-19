import instance from "@/lib/api";
import qs from "query-string";
import { Result } from "@/lib/api/typings";
import {
  CaptchaResponse,
  ConsentRequest,
  ConsentResponse,
  LoginRequest,
} from "@/lib/api/auth/typings";

// 验证码
export const getCaptchaCode = (): Promise<Result<CaptchaResponse>> =>
  instance.get("/api/getCaptcha").then((e) => {
    return e.data;
  });;

// 登录
export const login = (values: LoginRequest): Promise<Result<any>> =>
  instance.post(
    "/api/login",
    {
      ...values,
    },
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  ).then((e) => {
    return e.data;
  });;

// 获取授权参数
export const consentParameters = (
  values: ConsentRequest
): Promise<Result<ConsentResponse>> =>
  instance
    .get("/api/oauth2/consent/parameters?" + qs.stringify(values))
    .then((e) => {
      return e.data;
    });
