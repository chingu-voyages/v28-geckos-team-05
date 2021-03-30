import React, { useState, useEffect } from 'react';
import { CalendarDay } from '../../typescript/types';
import { db, getUserId } from '../../firebase';
import { convertDateFromTimestamp } from '../../utils';

import Loader from '../../components/Loader/Loader';
import CalendarDayList from '../../components/CalendarDayList/CalendarDayList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CalendarPage({ userLoggedIn }: any) {
  const [calendarList, setCalendarList] = useState<CalendarDay[]>();

  useEffect(() => {
    const userId = getUserId();

    if (userId) {
      db.collection('user-data')
        .doc(userId)
        .collection('calendar')
        .onSnapshot((calendarSnapshot) => {
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
        });
    }
  }, [userLoggedIn, setCalendarList]);

  return (
    <div className="page">
      {calendarList ? (
        calendarList.map((calendarDay) => (
          <div className="list__wrapper" key={calendarDay.dateString}>
            <h2>{convertDateFromTimestamp(calendarDay.timeStamp)}</h2>
            {calendarDay.recipes && (
              <CalendarDayList
                recipeList={calendarDay.recipes}
                date={calendarDay.dateString}
              />
            )}
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
