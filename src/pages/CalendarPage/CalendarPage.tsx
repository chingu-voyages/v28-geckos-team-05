import React, { useState, useEffect } from 'react';
import { CalendarDay } from '../../typescript/types';
import { db } from '../../firebase';
import { getUserId } from '../../firebase-calendar-utils';

import CalendarDayList from '../../components/CalendarDayList/CalendarDayList';

export default function CalendarPage() {
  const [calendarList, setCalendarList] = useState<CalendarDay[]>();

  useEffect(() => {
    const queryDb = async () => {
      const userId = getUserId();

      if (userId) {
        const userRef = db.collection('user-data').doc(userId);
        const calendarRef = userRef.collection('calendar');

        const calendarSnapshot = await calendarRef.get();

        const calendarData: CalendarDay[] = [];

        calendarSnapshot.forEach((doc) => {
          const dayDetail = doc.data();

          calendarData.push({
            dateString: doc.id,
            timeStamp: dayDetail.date,
            recipes: dayDetail.recipes_list,
          });
        });

        setCalendarList(calendarData);
      }
    };

    queryDb();
  }, [setCalendarList]);

  return (
    <div className="page">
      {calendarList &&
        calendarList.map((calendarDay) => (
          <div className="list__wrapper" key={calendarDay.dateString}>
            <h2>{calendarDay.dateString}</h2>
            {calendarDay.recipes && (
              <CalendarDayList    
                recipeList={calendarDay.recipes}
                date={calendarDay.dateString}
              />
            )}
          </div>
        ))}
    </div>
  );
}
