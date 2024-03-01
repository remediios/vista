'use client';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

const SelectCalendar = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'dateSelection',
    },
  ]);

  return (
    <DateRange
      date={new Date()}
      showDateDisplay={false}
      rangeColors={['#16a34a']}
      ranges={range}
      onChange={(item) => setRange([item.dateSelection] as any)}
      minDate={new Date()}
      direction="vertical"
    />
  );
};

export default SelectCalendar;
