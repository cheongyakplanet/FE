"use client";

import { useSignupStore } from "@/stores/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { signupInfo } from "@/types/auth";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "이메일이 올바르지 않아요." }),
  password: z.string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .regex(/(?=.*[a-zA-Z])/, { message: "비밀번호에 영문자가 최소 1개 포함되어야 합니다." })
    .regex(/(?=.*\d)/, { message: "비밀번호에 숫자가 최소 1개 포함되어야 합니다." })
    .regex(/(?=.*[@$!%*?&])/, { message: "비밀번호에 특수문자(@,$,!,%,*,?,&)가 최소 1개 포함되어야 합니다." })
    .regex(/^[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호에 허용되지 않은 문자가 포함되어 있습니다." }),
  name: z.string()
})

export default function SignUp() {
  const signupStore = useSignupStore();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })

  const onSubmit = async (data: signupInfo) => {
    try {
    await signupStore.signup(data.email, data.password, data.name);

    } catch(error) {
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
              control = {form.control}
              name = "name"
              render = {({field}) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="별명을 입력해 주세요." {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}></FormField>
        <FormField
          control = {form.control}
          name = "email"
          render = {({field}) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력해 주세요." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}></FormField>
          <FormField
            control = {form.control}
            name = "password"
            render = {({field}) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input placeholder="비밀번호를 입력해 주세요." {...field}/>
                </FormControl>
                <FormDescription>비밀번호는 영문자, 특수문자, 숫자를 포함하여 총 8글자 이상이어야 합니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}></FormField>

            <Button type="submit">회원가입하기</Button>
      </form>
    </Form>
  );
}
