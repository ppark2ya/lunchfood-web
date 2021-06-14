import { useState, useCallback } from 'react';
import { ApiResponse, BestMenu } from 'api/types';
import { getBestMenuList } from 'api/recommend';
import { checkToday, insertHistory } from 'api/history';

function useHistory() {
  const [bestMenuList, setBestMenuList] = useState<ApiResponse<BestMenu[]>>();
  const [todayMenu, setTodayMenu] = useState<ApiResponse<BestMenu[]>>();
  const [insertHisResult, setInsertHisResult] = useState<ApiResponse>();

  const asyncGetBestMenuList = useCallback(
    async (requestBody: { id: number; interval_date: number }) => {
      try {
        const { data } = await getBestMenuList(requestBody);
        setBestMenuList(data);
      } catch (e) {
        console.error(e);
        setBestMenuList(undefined);
      }
    },
    [],
  );

  const asyncCheckToday = useCallback(async (id: number) => {
    try {
      const { data } = await checkToday(id);
      setTodayMenu(data);
    } catch (e) {
      console.error(e);
      setTodayMenu(undefined);
    }
  }, []);

  const asyncInsertHistory = useCallback(
    async (requestBody: {
      id: number;
      place_id: number;
      place_name: string;
      category_name: string;
      good_bad: number;
      x: string;
      y: string;
    }) => {
      try {
        const { data } = await insertHistory(requestBody);
        setInsertHisResult(data);
      } catch (e) {
        console.error(e);
        setInsertHisResult(undefined);
      }
    },
    [],
  );

  return {
    bestMenuList,
    todayMenu,
    insertHisResult,
    asyncGetBestMenuList,
    asyncCheckToday,
    asyncInsertHistory,
  };
}

export default useHistory;
