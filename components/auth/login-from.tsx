"use client";
import Image from "next/image";
import CardWrapper from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import useSWR from "swr";
import { getCaptchaCode, login } from "@/lib/api/auth";
import { useSearchParams } from "next/navigation";
export default function LoginFrom() {
  const { data } = useSWR("/api/getCaptcha", getCaptchaCode);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
      code: "",
      captchaId: "",
      loginType: "passwordLogin",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    if (data) {
      values.captchaId = data?.data.captchaId;
    }

    login(values).then((e) => {
      if (e.success) {
        const target = searchParams.get("target");
        if (target) {
          window.location.href = target;
        }
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="欢迎回来"
      backButtonLabel="还没有账号？"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4">
                      <Input {...field} type="text" className="basis-3/5" />
                      {data ? (
                        <Image
                          className="basis-2/5"
                          src={data.data.imageData}
                          width={130}
                          height={34}
                          alt="验证码"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message="" />
          <FormSuccess message="" />
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
