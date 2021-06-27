import React, { useCallback, useState } from 'react';
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
      width: ${(props) => (props.path === '/recommend' ? '5vw' : '4vw')};
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
  id: number;
  icon: any;
  title: string;
  path: string;
  isActive: boolean;
}

function Navigation() {
  const history = useHistory();
  const [items, setItems] = useState<NaviTypes[]>([
    {
      id: 0,
      icon: <Home />,
      path: '/recommend',
      title: '홈',
      isActive: true,
    },
    {
      id: 1,
      icon: <Location />,
      path: '/address',
      title: '위치설정',
      isActive: false,
    },
    {
      id: 2,
      icon: <MenuHistory />,
      path: '/history',
      title: '식사기록',
      isActive: false,
    },
    {
      id: 3,
      icon: <MyMenu />,
      path: '/filter',
      title: '내점심줄',
      isActive: false,
    },
  ]);

  const onMenuClick = useCallback(
    (id: number, path: string) => {
      const newItems = items.map((item) => {
        return {
          ...item,
          isActive: item.id === id ? true : false,
        };
      });
      setItems(newItems);
      history.push(path);
    },
    [items, history],
  );

  const naviItems = items.map((item) => (
    <SvgItem {...item} key={item.id} onMenuClick={onMenuClick} />
  ));

  return <Container>{naviItems}</Container>;
}

interface IProps extends NaviTypes {
  onMenuClick: (id: number, path: string) => void;
}
function SvgItem({ id, icon, title, path, isActive, onMenuClick }: IProps) {
  return (
    <Content
      isActive={isActive}
      path={path}
      onClick={() => onMenuClick(id, path)}
    >
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
    </Content>
  );
}

export default Navigation;
