import { useState, useCallback } from 'react';
import { ApiResponse, AccountPlaceInfo } from 'api/types';
import {
  insertSelectedPlace,
  updateFilter,
  getSelectedPlace,
  deleteSelectedPlace,
} from 'api/filter';

function useFilter() {
  const [insertResult, setInsertResult] = useState<ApiResponse>();
  const [updateResult, setUpdateResult] = useState<ApiResponse>();
  const [selectedPlaceList, setSelectedPlaceList] = useState<
    ApiResponse<AccountPlaceInfo[]>
  >();
  const [deleteResult, setDeleteResult] = useState<ApiResponse>();

  const asyncInsertSelectedPlace = useCallback(
    async (requestBody: {
      id: number;
      place_id: number;
      place_name: string;
    }) => {
      try {
        const { data } = await insertSelectedPlace(requestBody);
        setInsertResult(data);
      } catch (e) {
        console.error(e);
        setInsertResult(undefined);
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
        setUpdateResult(data);
      } catch (e) {
        console.error(e);
        setUpdateResult(undefined);
      }
    },
    [],
  );

  const asyncGetSelectedPlace = useCallback(async (id: number) => {
    try {
      const { data } = await getSelectedPlace(id);
      setSelectedPlaceList(data);
    } catch (e) {
      console.error(e);
      setSelectedPlaceList(undefined);
    }
  }, []);

  const asyncDeleteSelectedPlace = useCallback(
    async (requestBody: { id: number; place_id: number }) => {
      try {
        const { data } = await deleteSelectedPlace(requestBody);
        setDeleteResult(data);
      } catch (e) {
        console.error(e);
        setDeleteResult(undefined);
      }
    },
    [],
  );

  return {
    insertResult,
    updateResult,
    selectedPlaceList,
    deleteResult,
    asyncInsertSelectedPlace,
    asyncUpdateFilter,
    asyncGetSelectedPlace,
    asyncDeleteSelectedPlace,
  };
}

export default useFilter;
