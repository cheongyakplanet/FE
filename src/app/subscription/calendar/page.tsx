'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-day-picker';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { CalendarSearch } from 'lucide-react';

import { Calendar as CalendarUi } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetSubscriptionByMonth } from '@/services/subscription/hooks/useGetSubscriptionByMonth';

dayjs.extend(isBetween);

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { year, month } = useMemo(() => {
    if (!date) return { year: '', month: '' };
    return {
      year: dayjs(date).format('YYYY'),
      month: dayjs(date).format('MM'),
    };
  }, [date]);

  const { data: getSubscriptionByMonth } = useGetSubscriptionByMonth(year, month, !!year && !!month);
  const subscriptionList = getSubscriptionByMonth?.data;
  const subCount = subscriptionList?.reduce(
    (acc, curr) => {
      const date = curr.rceptBgnde;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const filteredList = useMemo(() => {
    if (!subscriptionList || !date) return [];
    return subscriptionList.filter((sub) => {
      const start = dayjs(sub.rceptBgnde);
      const end = dayjs(sub.rceptEndde);
      const clicked = dayjs(date);
      return clicked.isBetween(start, end, 'day', '[]');
    });
  }, [date]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!date) return null;
  return (
    <div className="flex">
      <CalendarUi
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full max-w-xl"
        locale={ko}
        formatters={{
          formatCaption: (month: Date) => format(month, 'yyyy년 M월', { locale: ko }),
        }}
        components={{
          Day: ({ date }) => {
            const formattedDate = dayjs(date).format('YYYY-MM-DD');
            const count = subCount?.[formattedDate];

            return (
              <Button
                onClick={() => setDate(date)}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-md p-1"
              >
                <span className="font-medium">{date.getDate()}</span>
                {count && (
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                    {count}
                  </span>
                )}
              </Button>
            );
          },
        }}
        classNames={{
          months: 'flex w-full ', // ✅ 월 영역 꽉 채우기
          head_row: 'flex w-full pb-2 text-xs font-medium text-gray-500 justify-center', // ✅ 요일 (Su Mo...) 줄도 가득
          head_cell: 'flex w-full justify-center', // ✅ 요일 칸 넓히고 예쁘게
          row: 'flex w-full', // ✅ 날짜 줄도 가득
          cell: 'h-16 w-16', // ✅ 날짜 셀(칸) 크게 키우기
          day: 'h-16 w-16 flex justify-start p-1', // ✅ 날짜 버튼도 크게
          day_selected: 'rounded border border-indigo-100 bg-indigo-50',
          day_today: 'font-bold text-blue-600',
          caption: 'pl-48 pt-1 relative text-xl font-bold',
          nav_button_next: 'absolute right-3',
          nav_button_previous: 'absolute left-7',
        }}
      />

      <div className="ml-3">
        <div className="text-xl font-bold text-gray-900">
          <span className="text-gray-600">{dayjs(date).format('MM월 DD일')}</span>에 가능한 청약을 확인해보세요.
        </div>
        <div className="mt-2 space-y-2">
          {filteredList.map((item) => (
            <div className="rounded-lg border border-slate-300 p-2" key={item.houseNm}>
              <div className="text-sm font-semibold text-slate-800">{item.houseNm}</div>
              <div className="mt-1 text-xs text-slate-500">
                청약 기간: {item.rceptBgnde} ~ {item.rceptEndde}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="space-y-3">
        {filteredList.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-sm">
            <div className="font-semibold text-slate-800">{item.houseNm}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
