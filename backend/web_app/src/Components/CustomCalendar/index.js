import { Cancel } from '@mui/icons-material';
import { Calendar as CalendarIcon } from 'Components/Icons';
import moment from 'moment';
import { CalendarFooter, ProjectDates } from 'Pages/ProjectOverviewPage/styles';
import { useRef } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import { useOnClickOutside } from 'usehooks-ts';

const CustomCalendar = props => {
  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isReset, setReset] = useState(props.clearable);
  const onToggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };
  const handleClickOutside = () => {
    setShowCalendar(false);
  };
  useOnClickOutside(calendarRef, handleClickOutside);
  return (
    <div ref={calendarRef} style={{ width: '248px' }}>
      <ProjectDates
        disabled={!props.isAuthorized}
        onClick={() =>
          props.isAuthorized && isReset ? onToggleCalendar() : ''
        }
      >
        <CalendarIcon
          onClick={() => (props.isAuthorized ? onToggleCalendar() : '')}
        />{' '}
        {!isReset ? (
          <div className="d-flex justify-content-between align-items-center w-100">
            <span
              onClick={() => (props.isAuthorized ? onToggleCalendar() : '')}
            >
              {moment.utc(props.state[0]?.startDate).local().format('ll')} -{' '}
              {moment.utc(props.state[0]?.endDate).local().format('ll')}
            </span>
            <>
              {props.clearable && (
                <Cancel
                  fontSize="13"
                  onClick={() => {
                    setShowCalendar(false);
                    setReset(true);
                    props.onDateChange(null, null, true);
                  }}
                />
              )}
            </>
          </div>
        ) : (
          <span style={{ color: '#808080' }}>Search By Date</span>
        )}
      </ProjectDates>
      {showCalendar ? (
        <div style={{ display: 'flex', width: '328px' }}>
          <DateRange
            editableDateInputs={false}
            onChange={item => props.setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={props.state}
            showMonthAndYearPickers={false}
            weekStartsOn={1}
            rangeColors={['#F9F5FF']}
            weekdayDisplayFormat="EEEEEE"
            className="dropdown-menu"
            color="#6941C6"
            dateDisplayFormat="MMM d, yyyy"
            {...props}
          />
          <CalendarFooter variant="primary">
            <Button variant="light" onClick={onToggleCalendar}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                props.onDateChange(
                  props.state[0].startDate,
                  props.state[0].endDate,
                );
                onToggleCalendar();
                setReset(false);
              }}
            >
              Apply
            </Button>
          </CalendarFooter>
        </div>
      ) : null}
    </div>
  );
};

export default CustomCalendar;
