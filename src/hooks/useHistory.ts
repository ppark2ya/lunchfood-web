import { useState, useCallback } from 'react';
import { getPlaceHistory, insertDayMenu, deleteDayMenu } from 'api/history';
import { ApiResponse, HistoryDayMenu } from 'api/types';

function useHistory() {
  const [historyDayMenuList, setHistoryDayMenuList] = useState<
    ApiResponse<HistoryDayMenu[]>
  >();
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
        setHistoryDayMenuList(data);
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
        setInsertResult(data);
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
        setDeleteResult(data);
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

export default useHistory;
