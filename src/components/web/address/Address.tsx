import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import { getAddressList } from 'api/address';
import ModalPortal from 'modal/portal/ModalPortal';
import SearchResult from 'modal/contents/SearchResult';

const StyledAddress = styled.main`
  .mainsection {
    display: flex;
    width: 1200px;
    height: 660px;
    margin-left: calc(360 / 1920 * 100%);
    margin-top: 70px;
    flex-direction: column;
    align-items: center;

    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 20px;
  }

  .title {
    width: 250px;
    height: 30px;
    margin-top: 47px;

    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-size: 18px;
    line-height: 30px;
    /* identical to box height, or 167% */

    text-align: center;
    letter-spacing: 0.2em;

    color: #666666;
  }

  .appname {
    width: 390px;
    height: 54px;
    margin-top: 15px;
  }

  .borderline {
    width: 940px;
    height: 0px;
    margin-top: 50px;

    border: 1px solid #e0e0e0;
  }

  .searchsection {
    margin-top: 52px;
    width: 580px;
    & > div:first-child {
      width: 520px;
    }
    & > div:last-child {
      width: 52px;
      margin-left: 8px;
    }
  }

  .mycoordsection {
    margin-top: 30px;
    width: 340px;
  }
`;

function Address() {
  const [value, onChange, onClear] = useInput('');

  return (
    <StyledAddress>
      <div className="mainsection">
        <span className="title">
          <strong>점심 고민</strong>은 이제 그만!!
        </span>
        <img className="appname" src="src/assets/img_address_appname.png" />
        <span className="borderline" />
        <div className="searchsection">
          <Input
            mode={'edit'}
            value={value}
            placeholder="동명(읍, 면)으로 검색(EX. 신림동)"
            onChange={onChange}
            onClear={onClear}
            onClick={() => showSearchResultModal(value)}
          />
        </div>
        <div className="mycoordsection">
          <Button componentType="enable">내 위치로 검색하기</Button>
        </div>
      </div>
    </StyledAddress>
  );
}

function showSearchResultModal(keyword: string) {
  //const result = getAddressList(keyword);
  //console.log(result);
  //  TO-DO : SearchReseultModal 호출
  <ModalPortal>
    <SearchResult value={keyword} />;
  </ModalPortal>;
}

export default Address;
