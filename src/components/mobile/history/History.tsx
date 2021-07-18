import React, { useCallback, useEffect, useState } from 'react';
import Calendar, {
  CalendarTileProperties,
  ViewCallbackProperties,
} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import useDayHistory from 'hooks/useDayHistory';
import format from 'date-fns/format';
import isEmpty from 'utils/isEmpty';
import { useHistory } from 'react-router-dom';
import { HistoryDayMenu } from 'api/types';
import { useSetRecoilState } from 'recoil';
import { historyDayMenuState } from 'store/recoil/history/state';

const Container = styled.div`
  padding: 4vw;

  .daymenu-calendar {
    width: 100%;
    border: none;

    .react-calendar__tile {
      padding: 1.75em 0.5em;
      height: 80px;
    }
    .react-calendar__tile--now {
      background: transparent;
    }
    .react-calendar__tile--active {
      background: transparent;
      & abbr {
        background-image: url(/src/assets/calendar_day_background.svg);
        background-size: cover;
        background-repeat: no-repeat;
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
    }
    .react-calendar__month-view__days__day--weekend {
      color: black;
    }
    .selected-day {
      background: ${(props) => props.theme.color.red};
      border-radius: 4px;
      color: white;
      padding: 2px;
      margin-top: 5px;
    }
  }
`;

export default function Histroy() {
  const history = useHistory();
  const { historyDayMenuList, asyncGetPlaceHistory } = useDayHistory();
  const [value, setValue] = useState(new Date());
  const historyDayMenuRecoilState = useSetRecoilState(historyDayMenuState);

  useEffect(() => {
    const formatDate = format(new Date(), 'yyyy-MM');
    const [year, month] = formatDate.split('-');

    asyncGetPlaceHistory({
      id: localStorage.id,
      year,
      month,
      interval_date: 0,
    });
  }, []);

  function tileContent({ date }: CalendarTileProperties) {
    const selectedDay = historyDayMenuList?.filter(
      (hist) => hist.inserted_date === format(date, 'yyyy-MM-dd'),
    );
    const content = !isEmpty(selectedDay) ? (
      <div className="selected-day">{selectedDay!![0].place_name}</div>
    ) : (
      <div></div>
    );
    return content;
  }

  const onActiveStartDateChange = useCallback(
    ({ activeStartDate }: ViewCallbackProperties) => {
      const formatDate = format(activeStartDate, 'yyyy-MM');
      const [year, month] = formatDate.split('-');

      asyncGetPlaceHistory({
        id: localStorage.id,
        year,
        month,
        interval_date: 0,
      });
    },
    [],
  );

  const onChange = useCallback(
    (value: Date) => {
      setValue(value);
      const selectedDay = historyDayMenuList?.filter(
        (hist) => hist.inserted_date === format(value, 'yyyy-MM-dd'),
      );
      if (!isEmpty(selectedDay)) {
        historyDayMenuRecoilState(selectedDay!![0]);
        history.push('/main/history/daymenu');
      }
    },
    [historyDayMenuList],
  );

  return (
    <Container>
      <Calendar
        className="daymenu-calendar"
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        formatDay={(locale: string, date: Date) => format(date, 'd')} // 표시되는 날짜
        onActiveStartDateChange={onActiveStartDateChange}
        prev2Label={null}
        next2Label={null}
      />
    </Container>
  );
}
