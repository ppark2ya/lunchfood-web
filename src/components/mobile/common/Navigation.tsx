import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Home } from 'assets/mb_ic_home.svg';
import { ReactComponent as Location } from 'assets/mb_ic_location.svg';
import { ReactComponent as MenuHistory } from 'assets/mb_ic_menu_history.svg';
import { ReactComponent as MyMenu } from 'assets/mb_ic_mymenu.svg';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100vw;
  height: 8vh;
  background-color: #fafafa;
  padding-top: 0.5vh;
`;
const Content = styled.div<{ isActive: boolean; path: string }>`
  flex: 1;
  text-align: center;

  .icon {
    svg {
      width: ${(props) => (props.path === '/main/recommend' ? '5vw' : '4vw')};
      path {
        fill: ${(props) =>
          props.isActive ? props.theme.color.red : props.theme.color.fontGray};
      }
    }
  }
  .title {
    color: ${(props) =>
      props.isActive ? props.theme.color.red : props.theme.color.fontGray};
  }
`;

interface NaviTypes {
  icon: any;
  title: string;
  path: string;
  isActive: boolean;
}
const initialState: NaviTypes[] = [
  {
    icon: <Home />,
    path: '/main/recommend',
    title: '홈',
    isActive: true,
  },
  {
    icon: <Location />,
    path: '/main/address',
    title: '위치설정',
    isActive: false,
  },
  {
    icon: <MenuHistory />,
    path: '/main/history',
    title: '식사기록',
    isActive: false,
  },
  {
    icon: <MyMenu />,
    path: '/main/filter',
    title: '내점심줄',
    isActive: false,
  },
];
function Navigation() {
  const history = useHistory();
  const [items, setItems] = useState<NaviTypes[]>(initialState);

  const onMenuClick = useCallback((path: string) => {
    history.push(path);
  }, []);

  useEffect(() => {
    const { pathname } = history.location;
    const newItems = initialState.map((item) => {
      return {
        ...item,
        isActive: ~item.path.indexOf(pathname) ? true : false,
      };
    });
    setItems(newItems);
  }, [history.location.pathname]);

  const naviItems = items.map((item) => (
    <SvgItem {...item} key={item.path} onMenuClick={onMenuClick} />
  ));

  return <Container>{naviItems}</Container>;
}

interface IProps extends NaviTypes {
  onMenuClick: (path: string) => void;
}
function SvgItem({ icon, title, path, isActive, onMenuClick }: IProps) {
  return (
    <Content isActive={isActive} path={path} onClick={() => onMenuClick(path)}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
    </Content>
  );
}

export default Navigation;
