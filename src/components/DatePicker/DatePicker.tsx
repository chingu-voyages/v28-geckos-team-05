import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

import { DatePickerProps } from '../../typescript/types';
import CalendarCustomInput from '../CalendarCustomInput/CalendarCustomInput';

const DatePickerCalendar = (props: DatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => props.onChangeDate(date)}
      customInput={React.createElement(CalendarCustomInput)}
    />
  );
};

export default DatePickerCalendar;
