import React, { memo } from 'react';
import { AccountPlaceInfo } from 'api/types';
import FavoriteItem from './FavoriteItem';

interface IProps {
  items?: AccountPlaceInfo[];
  id: number;
  onDelete: (requestBody: { id: number; place_id: number }) => Promise<void>;
}

function FavoriteList({ items, id, onDelete }: IProps) {

  const favoriteItems = items?.map((item, index) => (
    <FavoriteItem
      key={index}
      {...item}
      onDelete={() => onDelete({
        id,
        place_id: item.place_id
      })}
    />
  ));
  return <div>{favoriteItems}</div>;
}

export default memo(FavoriteList);
