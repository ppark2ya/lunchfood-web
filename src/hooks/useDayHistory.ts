import { useState, useCallback } from 'react';
import { getPlaceHistory, insertDayMenu, deleteDayMenu } from 'api/history';
import { ApiResponse, HistoryDayMenu } from 'api/types';

function useDayHistory() {
  const [historyDayMenuList, setHistoryDayMenuList] =
    useState<HistoryDayMenu[]>();
  const [insertResult, setInsertResult] = useState<ApiResponse>();
  const [deleteResult, setDeleteResult] = useState<ApiResponse>();

  const asyncGetPlaceHistory = useCallback(
    async (requestBody: {
      id: number;
      year: string;
      month: string;
      interval_date: number;
    }) => {
      try {
        const { data } = await getPlaceHistory(requestBody);
        if (data.resultCode === 200) {
          setHistoryDayMenuList(data.data);
        } else {
          setHistoryDayMenuList(undefined);
        }
      } catch (e) {
        console.error(e);
        setHistoryDayMenuList(undefined);
      }
    },
    [],
  );

  const asyncInsertDayMenu = useCallback(
    async (requestBody: HistoryDayMenu) => {
      try {
        const { data } = await insertDayMenu(requestBody);
        if (data.resultCode === 200) {
          setInsertResult(data);
        } else {
          setInsertResult(undefined);
        }
      } catch (e) {
        console.error(e);
        setInsertResult(undefined);
      }
    },
    [],
  );

  const asyncDeleteDayMenu = useCallback(
    async (requestBody: { id: number; date: string }) => {
      try {
        const { data } = await deleteDayMenu(requestBody);
        if (data.resultCode === 200) {
          setDeleteResult(data);
        } else {
          setDeleteResult(undefined);
        }
      } catch (e) {
        console.error(e);
        setDeleteResult(undefined);
      }
    },
    [],
  );

  return {
    historyDayMenuList,
    insertResult,
    deleteResult,
    asyncGetPlaceHistory,
    asyncInsertDayMenu,
    asyncDeleteDayMenu,
  };
}

export default useDayHistory;
