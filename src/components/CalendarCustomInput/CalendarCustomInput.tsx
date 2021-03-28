import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { CalendarCustomInputProps } from '../../typescript/types';

const CalendarCustomInput = ({ value, onClick }: CalendarCustomInputProps) => (
  <button
    type="button"
    title="Add this recipe to your calendar"
    className="calendar-icon"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faCalendarAlt} />
  </button>
);

export default CalendarCustomInput;
