'use client';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

interface CalendarProps {
  reservations:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}

const SelectCalendar = ({ reservations }: CalendarProps) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'dateSelection',
    },
  ]);
  let disabledDates: Date[] = [];

  reservations?.forEach((reservation) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });

    disabledDates.push(...dateRange);
  });

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={range[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={range[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={['#16a34a']}
        ranges={range}
        onChange={(item) => setRange([item.dateSelection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
};

export default SelectCalendar;
