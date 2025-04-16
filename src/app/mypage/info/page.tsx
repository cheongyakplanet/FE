'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUserRound } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { PencilOff } from 'lucide-react';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDeleteMember } from '@/services/member/hooks/useDeleteMember';
import { useGetMypage } from '@/services/member/hooks/useGetMypage';
import { usePatchMyinfo } from '@/services/member/hooks/usePatchMyinfo';
import { MyInfoDto } from '@/services/member/types';

export default function Info() {
  const { data: data } = useGetMypage();
  const mypage = data?.data;
  const { mutate: patchMyinfo } = usePatchMyinfo();
  const { mutate: deleteMember } = useDeleteMember();

  const [activeEdit, setActiveEdit] = useState(true);
  const [editMessage, setEditMessage] = useState('수정하기');
  const [initValues, setInitValues] = useState<Partial<MyInfoDto>>({});

  const router = useRouter();

  const formSchema = z.object({
    username: z.string(),
    email: z.string(),
    property: z.string(),
    income: z.string(),
    isMarried: z.preprocess((v) => v === 'true', z.boolean()),
    numChild: z.preprocess((v) => Number(v), z.number()),
    numHouse: z.preprocess((v) => Number(v), z.number()),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      property: '',
      income: '',
      isMarried: false,
      numChild: 0,
      numHouse: 0,
    },
  });

  const onSubmit = () => {
    if (activeEdit) {
      const currentValues = form.getValues();
      const changedFields: Partial<MyInfoDto> = {};

      (Object.keys(currentValues) as (keyof MyInfoDto)[]).forEach((key) => {
        const current = currentValues[key];
        const init = initValues[key];

        if (current !== undefined && current !== init) {
          changedFields[key] = current as any;
        }
      });
      patchMyinfo(changedFields);
    }
  };

  const withdraw = () => {
    deleteMember();
    router.push('/');
  };

  useEffect(() => {
    if (mypage) {
      const values = {
        username: mypage.username ?? '',
        email: mypage.email ?? '',
        property: mypage.property?.toString() ?? '',
        income: mypage.income?.toString() ?? '',
        isMarried: mypage?.isMarried ?? false,
        numChild: mypage.numChild ?? 0,
        numHouse: mypage.numHouse ?? 0,
      };
      form.reset(values);
      setInitValues(values);
    }
  }, [mypage]);

  useEffect(() => {
    setEditMessage(activeEdit ? '수정하기' : '수정 완료');
  }, [activeEdit]);

  return (
    <div>
      <div className="flex w-full justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center">
              <CircleUserRound className="mr-1" />
              <div>개인 정보</div>
            </CardTitle>
            <CardDescription>청약 조회에 사용됩니다.</CardDescription>
          </CardHeader>

          <CardContent className="info-placeholder">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700"
                    onClick={() => setActiveEdit(!activeEdit)}
                  >
                    {activeEdit ? (
                      <div className="flex">
                        <Pencil className="mr-1" />
                        수정하기
                      </div>
                    ) : (
                      <div className="flex">
                        <PencilOff className="mr-1" />
                        수정완료
                      </div>
                    )}
                  </Button>
                </div>
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
                        <Input
                          {...field}
                          placeholder={mypage?.income === null ? '등록된 소득이 없습니다.' : ''}
                          disabled={activeEdit}
                        />
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
                        <Select
                          onValueChange={(value) => field.onChange(value === 'true')}
                          value={field.value.toString()}
                          disabled={activeEdit}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={mypage?.isMarried === true ? '기혼' : '미혼'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">기혼</SelectItem>
                            <SelectItem value="false">미혼</SelectItem>
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
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger className="p-1 text-xs text-red-400 hover:underline">탈퇴하기</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>탈퇴하시면 더 이상 청약플래닛을 이용하실 수 없습니다.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>유지할래요</AlertDialogCancel>
                  <AlertDialogAction onClick={withdraw} className="bg-red-100 text-black hover:bg-red-200">
                    탈퇴할게요
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
