'use client';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { Calculator as CalculatorIcon, Check, CircleHelp, Info } from 'lucide-react';
import { ArrowBigRight, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

dayjs.extend(minMax);

export default function Calculator() {
  const [homelessPeriod, setHomelessPeriod] = useState<number | string>('');

  const [isMarried, setIsMarried] = useState(false);
  const [myAncestor, setMyAncestor] = useState<number | string>('');
  const [spouseAncestor, setSpouseAncestor] = useState<number | string>('');
  const [descendant, setDescendant] = useState<number | string>('');

  const [spouseAccountPeriod, setSpouseAccountPeriod] = useState<number | string>('');

  const [showResult, setShowResult] = useState(false);
  const [familyCount, setFamilyCount] = useState(0);
  const [familyCountScore, setFamilyCountScore] = useState(0);

  const result = () => {
    setShowResult(true);

    if (isMarried) {
      setFamilyCount(Number(myAncestor) + Number(descendant));
    } else {
      setFamilyCount(Number(myAncestor) + Number(spouseAncestor) + Number(descendant) + 1);
    }

    accountCalculate();
  };

  useEffect(() => {
    if (familyCount < 6) {
      setFamilyCountScore(5 * (familyCount + 1));
    } else {
      setFamilyCountScore(35);
    }
  }, [familyCount]);

  useEffect(() => {
    setSpouseAccountPeriod('');
    setMyAncestor('');
    setSpouseAncestor('');
    setDescendant('');
  }, [isMarried]);

  const reset = () => {
    setIsMarried(false);
    setHomelessPeriod('');
    setSpouseAccountPeriod('');
    setMyAncestor('');
    setSpouseAncestor('');
    setDescendant('');
    setBirthday('');
    setAccountDate('');
  };

  const [birthday, setBirthday] = useState('');
  const [accountDate, setAccountDate] = useState('');

  const formatAccountDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let date = e.target.value.replace(/\D/g, '');

    if (date.length === 8) {
      let formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
      setAccountDate(formattedDate);
    } else {
      setAccountDate(date);
    }
  };

  const formatBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    let birthday = e.target.value.replace(/\D/g, '');

    if (birthday.length === 8) {
      let formattedBirthday = `${birthday.slice(0, 4)}-${birthday.slice(4, 6)}-${birthday.slice(6, 8)}`;
      setBirthday(formattedBirthday);
    } else {
      setBirthday(birthday);
    }
  };

  const [totalYear, setTotalYear] = useState(0);
  const [totalAccountYear, setTotalAccountYear] = useState(0);

  const accountCalculate = () => {
    const birth = dayjs(birthday);
    const adultYear = birth.add(19, 'year');
    const account = dayjs(accountDate);
    const now = dayjs();

    let juniorMonth = 0;
    if (account.isBefore(adultYear)) {
      const end = dayjs.min(adultYear, now);
      juniorMonth = end.diff(account, 'month');
      juniorMonth = Math.min(juniorMonth, 60);
    }

    let adultMonth = 0;
    if (now.isAfter(adultYear)) {
      adultMonth = now.diff(account, 'month');
    }

    const totalMonth = juniorMonth + adultMonth;
    const year = Math.floor(totalMonth / 12);
    setTotalYear(year);

    if (totalMonth < 6) {
      setTotalAccountYear(1);
    } else if (year < 1) {
      setTotalAccountYear(2);
    } else if (year < 15) {
      setTotalAccountYear(year + 2);
    } else {
      setTotalAccountYear(17);
    }
  };

  const total = Number(homelessPeriod) + Number(familyCountScore) + totalYear + Number(spouseAccountPeriod);

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

      <div className="flex flex-col justify-between md:flex-row">
        <Card className="mb-10 ml-5 w-[480px]">
          <CardHeader className="border-b border-slate-100">
            <CardTitle>청약가점 계산기</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">무주택기간을 선택해주세요.</p>
              </div>
              <Select value={String(homelessPeriod)} onValueChange={(val) => setHomelessPeriod(Number(val))}>
                <SelectTrigger className="ml-5 mt-2 h-8 w-[300px]">
                  <SelectValue placeholder="기간 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">유주택, 30세미만 미혼인 무주택 (0점) </SelectItem>
                  <SelectItem value="2">1년 미만 (2점)</SelectItem>
                  <SelectItem value="4">1년 이상 ~ 2년 미만 (4점)</SelectItem>
                  <SelectItem value="6">2년 이상 ~ 3년 미만 (6점)</SelectItem>
                  <SelectItem value="8">3년 이상 ~ 4년 미만 (8점)</SelectItem>
                  <SelectItem value="10">4년 이상 ~ 5년 미만 (10점)</SelectItem>
                  <SelectItem value="12">5년 이상 ~ 6년 미만 (12점)</SelectItem>
                  <SelectItem value="14">6년 이상 ~ 7년 미만 (14점)</SelectItem>
                  <SelectItem value="16">7년 이상 ~ 8년 미만 (16점)</SelectItem>
                  <SelectItem value="18">8년 이상 ~ 9년 미만 (18점)</SelectItem>
                  <SelectItem value="20">9년 이상 ~ 10년 미만 (20점)</SelectItem>
                  <SelectItem value="22">10년 이상 ~ 11년 미만 (22점)</SelectItem>
                  <SelectItem value="24">11년 이상 ~ 12년 미만 (24점)</SelectItem>
                  <SelectItem value="26">12년 이상 ~ 13년 미만 (26점)</SelectItem>
                  <SelectItem value="28">13년 이상 ~ 14년 미만 (28점)</SelectItem>
                  <SelectItem value="30">14년 이상 ~ 15년 미만 (30점)</SelectItem>
                  <SelectItem value="32">15년 이상 (32점)</SelectItem>
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
              <RadioGroup
                className="ml-5 mt-2 flex"
                value={String(isMarried)}
                onValueChange={(val) => setIsMarried(val === 'true')}
              >
                <div>
                  <RadioGroupItem value="false" className="mr-1" id="false" />
                  <Label className="cursor-pointer" htmlFor="false">
                    배우자 있음
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="true" className="ml-5 mr-1" id="true" />
                  <Label className="cursor-pointer" htmlFor="true">
                    배우자 없음
                  </Label>
                </div>
              </RadioGroup>
              <p className="ml-5 mt-2 flex items-center text-xs text-slate-500">
                <Info size={12} />
                동일 등본 내 3년 이상 계속하여 등재된 본인의 직계존속(부모/조부모)
              </p>
              <Select value={String(myAncestor)} onValueChange={(val) => setMyAncestor(Number(val))}>
                <SelectTrigger className="mb-3 ml-5 h-8 w-[300px]">
                  <SelectValue placeholder="인원 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0명</SelectItem>
                  <SelectItem value="1">1명</SelectItem>
                  <SelectItem value="2">2명</SelectItem>
                  <SelectItem value="3">3명</SelectItem>
                  <SelectItem value="4">4명</SelectItem>
                  <SelectItem value="5">5명</SelectItem>
                  <SelectItem value="6">6명 이상</SelectItem>
                </SelectContent>
              </Select>

              <p className="ml-5 mt-1 flex items-center text-xs text-slate-500">
                <Info size={12} />
                동일 등본 내 3년 이상 계속하여 등재된 배우자의 직계존속(부모/조부모)
              </p>
              <Select
                disabled={isMarried}
                value={String(spouseAncestor)}
                onValueChange={(val) => setSpouseAncestor(Number(val))}
              >
                <SelectTrigger className="mb-3 ml-5 h-8 w-[300px]">
                  <SelectValue placeholder="인원 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0명</SelectItem>
                  <SelectItem value="1">1명</SelectItem>
                  <SelectItem value="2">2명</SelectItem>
                  <SelectItem value="3">3명</SelectItem>
                  <SelectItem value="4">4명</SelectItem>
                  <SelectItem value="5">5명</SelectItem>
                  <SelectItem value="6">6명 이상</SelectItem>
                </SelectContent>
              </Select>

              <p className="ml-5 mt-1 flex items-center text-xs text-slate-500">
                <Info size={12} />
                동일 등본 내 등재(만 30세 이상은 1년 이상)된 미혼 직계비속(자녀/손자녀)
              </p>
              <Select value={String(descendant)} onValueChange={(val) => setDescendant(Number(val))}>
                <SelectTrigger className="ml-5 h-8 w-[300px]">
                  <SelectValue placeholder="인원 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0명</SelectItem>
                  <SelectItem value="1">1명</SelectItem>
                  <SelectItem value="2">2명</SelectItem>
                  <SelectItem value="3">3명</SelectItem>
                  <SelectItem value="4">4명</SelectItem>
                  <SelectItem value="5">5명</SelectItem>
                  <SelectItem value="6">6명 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">청약통장 순위기산일을 입력해주세요.</p>
              </div>
              <Input
                className="ml-5 mt-2 h-8 w-[300px] text-sm"
                placeholder="예) 19990101"
                onChange={formatAccountDate}
                value={accountDate}
              />
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">생년월일을 입력해주세요.</p>
              </div>
              <Input
                className="ml-5 mt-2 h-8 w-[300px] text-sm"
                placeholder="예) 20000101"
                onChange={formatBirthday}
                value={birthday}
              />

              <div className="ml-5 mt-1 flex text-xs text-red-300">
                <Info size={12} />
                <p>
                  미성년자로서 가입한 기간이 5년을 초과하면 5년만 인정 <br />
                  (주택공급에 관한 규칙 제10조제6항, 2024.7.1.부터 시행)
                </p>
              </div>
            </div>

            <div>
              <div className="flex">
                <Check size={20} color="red" />
                <p className="ml-1">배우자의 청약통장 가입기간을 입력해주세요.</p>
              </div>
              <Select
                value={String(spouseAccountPeriod)}
                disabled={isMarried}
                onValueChange={(val) => setSpouseAccountPeriod(Number(val))}
              >
                <SelectTrigger className="ml-5 mt-2 h-8 w-[300px]">
                  <SelectValue placeholder="기간 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1년 미만 (1점)</SelectItem>
                  <SelectItem value="2">1년 미상 ~ 2년 미만 (2점)</SelectItem>
                  <SelectItem value="3">2년 이상 (3점)</SelectItem>
                </SelectContent>
              </Select>
              <p className="ml-5 mt-1 flex items-start text-xs text-slate-400">
                <Info size={12} />
                배우자는 청약통장 가입기간의 50%만 인정되며, 최대 3점까지 인정 <br />
                (본인과 배우자의 통장가입기간 합산 점수는 최대 17점까지 인정)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 pt-4">
            <Button onClick={reset} className="bg-indigo-500 hover:bg-indigo-400">
              <RotateCcw /> 초기화
            </Button>
            <Button onClick={result} className="bg-indigo-500 hover:bg-indigo-400">
              결과보기
              <ArrowBigRight />
            </Button>
          </CardFooter>
        </Card>

        <div className="mb-5 ml-5 w-[480px]">
          {showResult && (
            <div className="flex flex-col rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-xl font-bold">청약가점 계산 결과를 확인해보세요</p>

              <div className="mt-5 flex justify-between">
                <div className="space-y-5">
                  <p className="flex">
                    <Check size={20} color="green" className="mr-1" />
                    무주택 기간{' '}
                  </p>
                  <p className="flex">
                    <Check size={20} color="green" className="mr-1" />
                    부양가족수{' '}
                  </p>
                  <p className="flex">
                    <Check size={20} color="green" className="mr-1" />
                    청약통장 순위기산일
                  </p>
                  <p className="flex">
                    <Check size={20} color="green" className="mr-1" />
                    배우자의 청약통장 가입 기간{' '}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-5">
                  <div className="flex">
                    <span className="mr-1 text-lg font-bold">{homelessPeriod === '' ? 0 : homelessPeriod}</span>
                    <span className="flex items-end">점</span>
                  </div>
                  <div className="flex">
                    <span className="mr-1 text-lg font-bold">{familyCountScore}</span>
                    <span className="flex items-end">점</span>
                  </div>
                  <div className="flex">
                    <span className="mr-1 text-lg font-bold">{totalAccountYear}</span>
                    <span className="flex items-end">점</span>
                  </div>

                  <div className="flex">
                    <span className="mr-1 text-lg font-bold">
                      {spouseAccountPeriod === '' ? 0 : spouseAccountPeriod}
                    </span>
                    <span className="flex items-end">점</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 border-t" />
              <span className="mt-3 flex items-end justify-end text-lg font-semibold">
                총<span className="ml-2 mr-1 text-xl text-indigo-500">{total}</span>점
              </span>
            </div>
          )}
          {!showResult && (
            <div className="flex flex-col rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="mb-2 text-lg font-semibold text-slate-600">아직 가점 계산기를 사용하지 않으셨네요!</p>
              <p className="text-sm text-slate-500">
                왼쪽 항목을 모두 입력하신 후 <br />
                <span className="font-medium text-indigo-600">청약 가점 계산 결과</span>를 확인해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
