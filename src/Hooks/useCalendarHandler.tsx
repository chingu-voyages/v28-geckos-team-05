import { useState, useEffect } from 'react';

import { getUserId } from '../firebase';
import { stockCalendarData } from '../firebase-calendar-utils';
import { convertDateToString } from '../utils';
import { RecipeProps } from '../typescript/types';

export default function useCalendarHandler({
  recipe,
  storedDate,
}: RecipeProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [newStoredDate, setNewStoredDate] = useState<string>('');
  const [activeDate, setActiveDate] = useState<string>('');
  const [activeNotification, setActiveNotification] = useState(false);

  useEffect(() => {
    setUserId(getUserId());

    if (storedDate) {
      setNewStoredDate(storedDate);
    }
  }, [storedDate, setNewStoredDate]);

  const onChangeDate = async (date: Date | [Date, Date] | null) => {
    if (userId) {
      const stocked = await stockCalendarData(date, recipe, userId);

      if (stocked) {
        setActiveNotification(true);
        setActiveDate(convertDateToString(date));

        setTimeout(() => {
          setActiveNotification(false);
        }, 2000);
      }
    }
  };

  return {
    userId,
    newStoredDate,
    activeDate,
    activeNotification,
    onChangeDate,
  };
}
