import React, { useState, useEffect } from 'react';
import { CalendarDay } from '../../typescript/types';
import { db, getUserId } from '../../firebase/firebase';
import { convertDateFromTimestamp, convertCentsToDollars } from '../../utils';

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
              cost: dayDetail.cost,
              calories: dayDetail.calories,
            });
          });

          setCalendarList(calendarData);
        });
    }
  }, [userLoggedIn, setCalendarList]);

  return (
    <div className="page">
      {calendarList &&
        !!calendarList.length &&
        calendarList.map((calendarDay) => (
          <div className="list__wrapper" key={calendarDay.dateString}>
            <h2>{convertDateFromTimestamp(calendarDay.timeStamp)}</h2>
            {calendarDay.recipes && (
              <CalendarDayList
                recipeList={calendarDay.recipes}
                date={calendarDay.dateString}
              />
            )}

            <div className="list__summary">
              {calendarDay.cost && (
                <>
                  <p>
                    Estimated price: {convertCentsToDollars(calendarDay.cost)}
                  </p>
                  <p>
                    {`Estimated Calorie intake:
                    ${Math.round(calendarDay.calories * 100) / 100} kcal`}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      {calendarList && !calendarList.length && 'No recipes in the calendar :('}
      {!calendarList && <Loader />}
    </div>
  );
}
