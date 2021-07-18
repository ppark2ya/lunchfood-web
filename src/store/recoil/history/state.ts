import { atom } from 'recoil';
import { HistoryDayMenu } from 'api/types';

export const placeNameState = atom({
  key: 'placeNameState',
  default: '',
});

export const menuNameState = atom({
  key: 'menuNameState',
  default: '',
});

export const historyDayMenuState = atom<HistoryDayMenu>({
  key: 'historyDayMenuState',
  default: {
    id: 0, // 사용자 id
    place_id: 0, // 카카오 api에서 넘어온 식당 식별자(BestMenu.id)
    place_name: '', // 식당이름
    menu_name: '', // 음식명
    category: '', // 식당종류
    score: '0', // 평점
    menu_diary: '', // 짧은 글
    menu_image_1: '',
    menu_image_2: '',
    menu_image_3: '',
    menu_image_4: '',
    menu_image_5: '',
    inserted_date: '',
  },
});
