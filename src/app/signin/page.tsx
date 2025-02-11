"use client";

import React, { useState } from 'react'
import { useAuthStore } from '@/stores/auth';
import {useEffect} from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { signinInfo } from '@/types/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  userEmail: z.string(),
  // userEmail: z.string().email({message: "이메일 형식이 올바르지 않아요."}),
  userPassword: z.string()
  // userPassword: z.string().min(8, {message: "비밀번호는 최소 8자 이상입니다."})
})

export default function SignIn() {
  const authStore = useAuthStore();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   authStore.login("test@test", "1234"); 
  // }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      userPassword: ""
    }
  })

  const onSubmit = async (data: signinInfo) => { 
    try {
      await authStore.login(data.userEmail, data.userPassword);
      console.log(data);
      router.push('/');
    } catch(error){
      setErrorMessage("로그인 정보가 일치하지 않습니다.");
    }
  };

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control = {form.control}
        name = "userEmail"
        render = {({ field }) => (
          <FormItem>
            <FormLabel>아이디</FormLabel>
            <FormControl>
              <Input placeholder="아이디를 입력해 주세요." {...field} />
            </FormControl>
            <FormDescription>이메일 형식으로 입력해 주세요.</FormDescription>
            <FormMessage />
          </FormItem>
        )}></FormField>
      <FormField
        control = {form.control}
        name = "userPassword"
        render = {({ field }) => (
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input placeholder="비밀번호를 입력해 주세요." {...field} />
            </FormControl>
            <FormDescription>비밀번호는 특수문자를 포함하여 8글자 이상입니다.</FormDescription>
            <FormMessage />
          </FormItem>
        )}></FormField>

        <Button type="submit">로그인</Button>
        {errorMessage}
    </form>
  </Form>
  )
}
