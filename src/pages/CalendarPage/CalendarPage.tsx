import React, { useState, useEffect } from 'react';
import { getCalendarData } from '../../firebase-calendar-utils';
import { CalendarDay } from '../../typescript/types';

export default function CalendarPage() {
  const [calendarList, setCalendarList] = useState<Promise<null>>();

  useEffect(() => {
    const calendarData = async getCalendarData();
    setCalendarList(calendarData);
  }, []);

  return (
    <div className="calendar">
      {calendarData &&
        calendarData.map((el) => (
          <div key={el.dateString}>{el.dateString}</div>
        ))}
    </div>
  );
}
