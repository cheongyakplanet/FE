'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-day-picker';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { CalendarFold } from 'lucide-react';
import { OctagonAlert } from 'lucide-react';
import { MousePointerClick } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarUi } from '@/components/ui/calendar';

import { useGetSubscriptionByMonth } from '@/services/subscription/hooks/useGetSubscriptionByMonth';

dayjs.extend(isBetween);

export default function Calendar() {
  const router = useRouter();

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
  }, [date, subscriptionList]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!date) return null;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="mb-8 ml-5 w-full max-w-xl md:mb-16">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <CalendarFold className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-slate-900">청약 캘린더</h1>
          </div>
          <div className="mt-2 flex items-center gap-2 text-slate-600">
            <MousePointerClick className="h-4 w-4" />
            <p>날짜를 선택해 청약 일정을 확인해보세요.</p>
          </div>
        </div>
        <CalendarUi
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ko}
          onMonthChange={(month) => {
            setDate((prev) => {
              if (!prev) return month;
              return new Date(month.getFullYear(), month.getMonth(), prev.getDate());
            });
          }}
          components={{
            CaptionLabel: ({ displayMonth }) => (
              <div className="text-md font-semibold text-indigo-900">
                {format(displayMonth, 'yyyy년 MM월', { locale: ko })}
              </div>
            ),
            Day: ({ date: dayDate }) => {
              const formattedDate = dayjs(dayDate).format('YYYY-MM-DD');
              const count = subCount?.[formattedDate];

              const todayDate = dayjs().isSame(dayDate, 'day');
              const clickedDate = dayjs(date).isSame(dayDate, 'day');

              const weekend = dayDate.getDay();
              const weekendColor = weekend === 0 ? 'text-red-500' : weekend === 6 ? 'text-blue-500' : 'text-slate-700 ';
              return (
                <div className={`h-16 w-16 ${clickedDate ? 'rounded-xl border border-indigo-100 bg-indigo-50' : ''}`}>
                  <Button
                    onClick={() => setDate(dayDate)}
                    className="flex flex-col items-center justify-center rounded-md p-1"
                  >
                    <div className={`${weekendColor} ${todayDate ? 'font-bold text-indigo-900' : ''} `}>
                      {dayDate.getDate()}
                    </div>
                    {count && (
                      <Badge className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] text-white hover:bg-indigo-500">
                        {count}
                      </Badge>
                    )}
                  </Button>
                </div>
              );
            },
          }}
          classNames={{
            months: 'flex w-full ',
            head_row: 'flex w-full pb-2 text-xs text-gray-500',
            head_cell: 'flex w-full ',
            row: 'flex w-full',
            caption: 'relative flex justify-center',
            nav_button_previous:
              'absolute left-2 top-1/2 -translate-y-1/2 border-none shadow-none hover:bg-transparent',
            nav_button_next: 'absolute right-10 top-1/2 -translate-y-1/2 border-none shadow-none  hover:bg-transparent',
          }}
        />
        <div className="ml-16 mt-5 text-xs text-gray-400">
          달력의 숫자는 해당 날짜에 시작되는 청약 건수를 의미합니다.
        </div>
      </div>

      <div className="mb-8 ml-6 max-w-md md:mb-0 md:ml-3">
        <div className="mt-10 text-xl font-bold text-gray-900">
          <span className="text-indigo-600">{dayjs(date).format('MM월 DD일')}</span>에 가능한 청약을 확인해 보세요
        </div>
        <div className="mt-5 max-h-96 space-y-4 overflow-y-auto">
          {filteredList.length > 0 ? (
            filteredList.map((sub) => (
              <div
                className="w-full cursor-pointer rounded-lg border border-indigo-200 bg-indigo-50 p-2 shadow-md hover:shadow-lg"
                key={sub.houseNm}
                onClick={() => router.push(`/subscription/${sub.id}`)}
              >
                <div className="flex justify-center text-sm font-bold text-indigo-900">{sub.houseNm}</div>
                <div className="mt-1 flex justify-center text-xs text-indigo-700">
                  {sub.rceptBgnde} ~ {sub.rceptEndde}
                </div>
              </div>
            ))
          ) : (
            <div className="mt-16 flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-8">
              <OctagonAlert className="text-indigo-500" strokeWidth={1} size={48} />
              <p className="mt-3 text-slate-600">진행 중인 청약이 없습니다.</p>
              <p className="mt-1 text-sm text-slate-400">다른 날짜를 선택해 청약 일정을 확인해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
