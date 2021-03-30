import React, { useState, useEffect } from 'react';
import { CalendarDay } from '../../typescript/types';
import { db } from '../../firebase';
import { convertDateFromTimestamp } from '../../utils';

import Loader from '../../components/Loader/Loader';

import { getUserId } from '../../firebase-calendar-utils';
import CalendarDayList from '../../components/CalendarDayList/CalendarDayList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CalendarPage({ userLoggedIn }: any) {
  const [calendarList, setCalendarList] = useState<CalendarDay[]>();

  useEffect(() => {
    const userId = getUserId();

    if (userId) {
      const unsubscribe = db
        .collection('user-data')
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

    // const queryDb = async () => {
    //   // const userId = getUserId();
    //   // const calendarData: CalendarDay[] = [];

    //   if (userId) {
    //     const userRef = db.collection('user-data').doc(userId);
    //     const calendarRef = userRef.collection('calendar');
    //     const calendarSnapshot = await calendarRef.get();

    //     calendarSnapshot.forEach((doc) => {
    //       const dayDetail = doc.data();

    //       calendarData.push({
    //         dateString: doc.id,
    //         timeStamp: dayDetail.date,
    //         recipes: dayDetail.recipes_list,
    //       });
    //     });

    //     setCalendarList(calendarData);
    //   }
    // };

    // if (userLoggedIn) queryDb();
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
