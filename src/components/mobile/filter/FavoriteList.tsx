import React, { memo, useCallback } from 'react';
import { AccountPlaceInfo } from 'api/types';
import FavoriteItem from './FavoriteItem';

interface IProps {
  items?: AccountPlaceInfo[];
  onDelete: any;
}
function FavoriteList({ items, onDelete }: IProps) {

  const favoriteItems = items?.map((item, index) => (
    <FavoriteItem
      key={index}
      {...item}
      onDelete={onDelete}
    />
  ));
  return <div>{favoriteItems}</div>;
}

export default memo(FavoriteList);
