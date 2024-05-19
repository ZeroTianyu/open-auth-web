"use client";

import { consentParameters } from "@/lib/api/auth";
import { ConsentRequest } from "@/lib/api/auth/typings";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/ui/loading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsentSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";
import instance from "@/lib/api";
import qs from "query-string";
import { Result } from "@/lib/api/typings";

export default function ConsentFrom() {
  const searchParams = useSearchParams();
  const scopeString = searchParams.get("scope");
  const clientId = searchParams.get("client_id");
  const state = searchParams.get("state");
  const userCode = searchParams.get("user_code");

  const form = useForm<z.infer<typeof ConsentSchema>>({
    resolver: zodResolver(ConsentSchema),
    defaultValues: {
      scope: scopeString?.split(" "),
    },
  });

  const req: ConsentRequest = {
    scope: scopeString,
    client_id: clientId,
    state: state,
  };
  const { data, error, isLoading } = useSWR("/oauth2/consent/parameters", () =>
    consentParameters(req)
  );
  if (isLoading) <LoadingSpinner />;

  function onSubmit(reqData: z.infer<typeof ConsentSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(reqData, null, 2)}</code>
        </pre>
      ),
    });
    const requestURI = data?.data.requestURI;

    if (requestURI) {
      instance
        .post<Result<string>>(
          "/api" + requestURI,
          qs.stringify({
            client_id: clientId,
            state: state,
            scope: reqData.scope,
            user_code: userCode,
          }),
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        )
        .then((e) => {
          window.location.href = e.data.data;
        });
    }
  }
  return (
    <CardWrapper
      headerLabel="确认授权"
      backButtonLabel="还没有账号？"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="scope"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    {data && data.data.clientName}
                  </FormLabel>
                  <FormDescription>
                    此第三方应用请求获得以下权限:
                  </FormDescription>
                </div>
                {data &&
                  data.data.scopes &&
                  data?.data.scopes.map((item) => (
                    <FormField
                      key={item.scope}
                      control={form.control}
                      name="scope"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.scope}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.scope)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.scope,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.scope
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.description}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center justify-center gap-9">
            <Button type="submit">取消</Button>
            <Button type="submit">确认</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
