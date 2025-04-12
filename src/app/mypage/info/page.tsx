'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useGetMypage } from '@/services/member/hooks/useGetMypage';

export default function Info() {
  const { data: data } = useGetMypage();
  const mypage = data?.data;

  const [activeEdit, setActiveEdit] = useState(true);

  const formSchema = z.object({
    username: z.string(),
    email: z.string(),
    property: z.string(),
    income: z.preprocess((v) => Number(v), z.number()),
    isMarried: z.string(),
    numChild: z.preprocess((v) => Number(v), z.number()),
    numHouse: z.preprocess((v) => Number(v), z.number()),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      property: '',
      income: 0,
      isMarried: '',
      numChild: 0,
      numHouse: 0,
    },
  });

  const onSubmit = () => {
    console.log('수정사항', form.getValues());
  };

  useEffect(() => {
    if (mypage) {
      form.reset({
        username: mypage.username ?? '',
        email: mypage.email ?? '',
        property: mypage.property ?? '',
        income: mypage.income ?? 0,
        isMarried: mypage.isMarried === true ? 'O' : 'X',
        numChild: mypage.numChild ?? 0,
        numHouse: mypage.numHouse ?? 0,
      });
    }
  }, [mypage]);

  return (
    <div>
      <div className="flex w-full justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>개인 정보</CardTitle>
            {/* <CardDescription></CardDescription> */}
            <Button onClick={() => setActiveEdit(false)}>수정</Button>
          </CardHeader>

          <CardContent className="info-placeholder">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">이름</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={activeEdit} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">이메일</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={activeEdit} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="property"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">재산</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={mypage?.property === null ? '등록된 재산이 없습니다.' : ''}
                          disabled={activeEdit}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">소득</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={activeEdit} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="isMarried"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">결혼 여부</FormLabel>
                      <FormControl className="min-w-0 flex-1">
                        <Select onValueChange={field.onChange} value={field.value?.toString()} disabled={activeEdit}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={mypage?.isMarried === true ? 'O' : 'X'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">O</SelectItem>
                            <SelectItem value="false">X</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="numChild"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">자녀</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={activeEdit} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="numHouse"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/3 text-base">집</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={activeEdit} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit">수정 완료</Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <button className="text-xs">탈퇴하기</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
