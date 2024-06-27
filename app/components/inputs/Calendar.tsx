import { FC } from "react";

import { DateRange, Range, RangeKeyDict } from "react-date-range"; //Range is used to represent a date range, while RangeKeyDict is used to represent a dictionary of date ranges

// importing css files like so is the only way to get the calendar to work
import "react-date-range/dist/styles.css"; // main style file 
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
  return <DateRange 
    rangeColors={['#262626']} // sets the color of the range
    ranges={[value]}
    date={new Date()}
    onChange={onChange}
    direction="vertical" // sets the direction of the calendar
    showDateDisplay={false} // hides the date display
    minDate={new Date()}
    disabledDates={disabledDates}
  />;
};

export default Calendar;
