import { useState, useCallback } from 'react';
import { AccountPlaceInfo } from 'api/types';
import {
  insertSelectedPlace,
  updateFilter,
  getSelectedPlace,
  deleteSelectedPlace,
} from 'api/filter';
import { COMMON_MESSAGE } from 'Constants';

function useFilter() {
  const [selectedPlaceList, setSelectedPlaceList] =
    useState<AccountPlaceInfo[]>();

  const asyncInsertSelectedPlace = useCallback(
    async (requestBody: {
      id: number;
      place_id: number;
      place_name: string;
    }) => {
      try {
        const { data } = await insertSelectedPlace(requestBody);
        if (data.resultCode === 200) {
          window.alert('자주 이용하는 음식점이 저장되었습니다.');
        } else {
          window.alert(COMMON_MESSAGE.FILTER_MESSAGE.SAVE_FAIL);
        }
      } catch (e) {
        window.alert(COMMON_MESSAGE.FILTER_MESSAGE.SAVE_FAIL);
      }
    },
    [],
  );

  const asyncUpdateFilter = useCallback(
    async (requestBody: {
      id: number;
      radius: number;
      radius_on: number;
      place_on: number;
      set_date: number;
      date_on: number;
    }) => {
      try {
        const { data } = await updateFilter(requestBody);
        if (data.resultCode === 200) {
          window.alert('내점심줄 정보가 저장되었습니다!');
        } else {
          window.alert(COMMON_MESSAGE.FILTER_MESSAGE.SAVE_FAIL);
        }
      } catch (e) {
        window.alert(COMMON_MESSAGE.FILTER_MESSAGE.SAVE_FAIL);
      }
    },
    [],
  );

  const asyncGetSelectedPlace = useCallback(async (id: number) => {
    try {
      const { data } = await getSelectedPlace(id);
      if (data.resultCode === 200) {
        setSelectedPlaceList(data.data);
      } else {
        setSelectedPlaceList(undefined);
      }
    } catch (e) {
      setSelectedPlaceList(undefined);
      window.alert(COMMON_MESSAGE.FILTER_MESSAGE.DATA_LOAD_FAIL);
    }
  }, []);

  const asyncDeleteSelectedPlace = useCallback(
    async (requestBody: { id: number; place_id: number }) => {
      try {
        if (window.confirm('삭제하시겠습니까?')) {
          const { data } = await deleteSelectedPlace(requestBody);
          if (data.resultCode === 200) {
            window.alert('삭제되었습니다.');
            asyncGetSelectedPlace(requestBody.id);
          } else {
            window.alert(COMMON_MESSAGE.FILTER_MESSAGE.SAVE_FAIL);
          }
        }
      } catch (e) {
        window.alert(COMMON_MESSAGE.FILTER_MESSAGE.SAVE_FAIL);
      }
    },
    [],
  );

  return {
    selectedPlaceList,
    asyncInsertSelectedPlace,
    asyncUpdateFilter,
    asyncGetSelectedPlace,
    asyncDeleteSelectedPlace,
  };
}

export default useFilter;
