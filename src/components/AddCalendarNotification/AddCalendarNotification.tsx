import React from 'react';
import './AddCalendarNotification.scss';

export default function AddCalendarNotification({
  activeDate,
}: {
  activeDate: string;
}) {
  return (
    <div className="calendar__notification">
      Recipe added to calendar <br /> on Date <strong>{activeDate}</strong>
    </div>
  );
}
