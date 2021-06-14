import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <img id="logo" src="src\assets\img_gnb_title.png" />
      <Link className="item" id="item-1" to="/address">
        위치설정
      </Link>
      <Link className="item" id="item-2" to="/history">
        식사기록
      </Link>
      <Link className="item" id="item-3" to="/filter">
        내 점심 줄
      </Link>
    </header>
  );
}

export default Header;
