import { useState, useCallback } from 'react';
import { ApiResponse, BestMenu } from 'api/types';
import { getBestMenuList } from 'api/recommend';
import { checkToday, insertHistory } from 'api/history';

function useRecommend() {
  const [bestMenuList, setBestMenuList] = useState<BestMenu[]>();
  const [insertHisResult, setInsertHisResult] = useState<ApiResponse>();

  const asyncGetBestMenuList = useCallback(
    async (requestBody: { id: number; interval_date: number }) => {
      try {
        const { data } = await getBestMenuList(requestBody);
        if (data.resultCode === 200) {
          asyncCheckToday(requestBody.id, data.data!!);
        } else {
          setBestMenuList(undefined);
        }
      } catch (e) {
        console.error(e);
        setBestMenuList(undefined);
      }
    },
    [],
  );

  const asyncCheckToday = useCallback(
    async (id: number, bestMenuParam: BestMenu[]) => {
      try {
        const { data } = await checkToday(id);
        if (data.resultCode === 200) {
          if (bestMenuParam) {
            setBestMenuList([...data.data!!, ...bestMenuParam]);
          }
        } else {
          setBestMenuList(bestMenuParam);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

  const asyncInsertHistory = useCallback(
    async (requestBody: {
      id: number;
      place_id: number;
      place_name: string;
      category_name: string;
      good_bad: number;
      x: number;
      y: number;
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
    insertHisResult,
    asyncGetBestMenuList,
    asyncCheckToday,
    asyncInsertHistory,
  };
}

export default useRecommend;
