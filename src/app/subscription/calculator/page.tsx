'use client';

import { Calculator as CalculatorIcon, Check, CircleHelp, Info } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Calculator() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <CalculatorIcon className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-900">청약가점 계산</h1>
        </div>
        <div className="mt-2 gap-2 text-slate-600">
          <div className="ml-10 flex items-center">
            <CircleHelp className="mr-1 h-4 w-4" />
            <p>청약가점 제도란?</p>
          </div>
          <p className="ml-16 text-slate-600">
            동일 순위 내에서 경쟁이 있을 경우 무주택기간, 부양가족수 및 청약통장 가입기간을 기준으로 산정한 가점점수가
            높은 순으로 당첨자를 선정하는 제도입니다.
          </p>
        </div>
      </div>

      <div className="flex">
        <Card className="w-[480px]">
          <CardHeader>
            <CardTitle>청약가점 계산기</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">무주택기간을 선택해주세요.</p>
              </div>
              <Select>
                <SelectTrigger className="ml-5 mt-2 h-8 w-[300px]">
                  <SelectValue placeholder="선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
              <p className="ml-5 mt-1 flex items-center text-xs text-slate-400">
                <Info size={12} />
                미혼인 경우 만30세부터 기간을 산정합니다.
              </p>
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">부양가족수를 선택해주세요.</p>
              </div>
              <p className="ml-5 mt-2 flex items-center text-xs text-slate-500">
                <Info size={12} />
                동일 등본 내 3년 이상 계속하여 등재된 본인의 직계존속(부모/조부모)
              </p>
              <Select>
                <SelectTrigger className="mb-3 ml-5 h-8 w-[300px]">
                  <SelectValue placeholder="인원 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
              <p className="ml-5 mt-1 flex items-center text-xs text-slate-500">
                <Info size={12} />
                동일 등본 내 3년 이상 계속하여 등재된 배우자의 직계존속(부모/조부모)
              </p>
              <Select>
                <SelectTrigger className="mb-3 ml-5 h-8 w-[300px]">
                  <SelectValue placeholder="인원 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
              <p className="ml-5 mt-1 flex items-center text-xs text-slate-500">
                <Info size={12} />
                동일 등본 내 등재(만 30세 이상은 1년 이상)된 미혼 직계비속(자녀/손자녀)
              </p>
              <Select>
                <SelectTrigger className="ml-5 h-8 w-[300px]">
                  <SelectValue placeholder="인원 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">청약통장 순위기산일을 입력해주세요.</p>
              </div>
              <Select>
                <SelectTrigger className="ml-5 mt-2 h-8 w-[300px]">
                  <SelectValue placeholder="선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">생년월일을 입력해주세요.</p>
              </div>
              <Select>
                <SelectTrigger className="ml-5 mt-2 h-8 w-[300px]">
                  <SelectValue placeholder="선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
              <p className="ml-5 mt-1 flex text-xs text-red-300">
                <Info size={12} />
                <p>
                  미성년자로서 가입한 기간이 5년을 초과하면 5년만 인정 <br />
                  (주택공급에 관한 규칙 제10조제6항, 2024.7.1.부터 시행)
                </p>
              </p>
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">배우자의 청약통장 가입기간을 입력해주세요.</p>
              </div>
              <Select>
                <SelectTrigger className="ml-5 mt-2 h-8 w-[300px]">
                  <SelectValue placeholder="선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">apple</SelectItem>
                </SelectContent>
              </Select>
              <p className="ml-5 mt-1 flex items-start text-xs text-slate-400">
                <Info size={12} />
                배우자는 청약통장 가입기간의 50%만 인정되며, 최대 3점까지 인정 <br />
                (본인과 배우자의 통장가입기간 합산 점수는 최대 17점까지 인정)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>초기화</div>
            <div>결과보러가기</div>
          </CardFooter>
        </Card>

        <div>결과보기</div>
      </div>
    </div>
  );
}
