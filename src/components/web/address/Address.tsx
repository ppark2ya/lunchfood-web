import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import ModalPortal from 'components/web/modal/portal/ModalPortal';
import useAddress from 'hooks/useAddress';
import AddressList from 'components/common/AddressList';
import isEmpty from 'utils/isEmpty';

const StyledAddress = styled.main`
  .main-section {
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
    font-size: 18px;
    line-height: 30px;
    /* identical to box height, or 167% */

    text-align: center;
    letter-spacing: 0.2em;

    color: #666666;
  }

  .app-name {
    width: 390px;
    height: 54px;
    margin-top: 15px;
  }

  .border-line {
    width: 940px;
    height: 0px;
    margin-top: 50px;

    border: 1px solid #e0e0e0;
  }

  .search-section {
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

  .mycoord-section {
    margin-top: 30px;
    width: 340px;
  }
`;

const StyledModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-contents {
    background: white;
    height: 50vh;
    overflow-y: auto;
    border-radius: ${(props) => props.theme.border.radius};
  }
`;

function Address() {
  const [value, onChange, onClear] = useInput('');
  const [isShow, setIsShow] = useState(false);
  const {
    addressRoadItems,
    asyncGetAddressList,
    onAddressClick,
  } = useAddress();

  const toggleModal = useCallback(() => {
    setIsShow((prev) => !prev);
  }, []);

  const modal = useMemo(
    () => (
      <ModalPortal>
        <StyledModal>
          <div className="modal-contents">
            <AddressList
              items={addressRoadItems}
              onAddressClick={onAddressClick}
            />
          </div>
        </StyledModal>
      </ModalPortal>
    ),
    [addressRoadItems, onAddressClick],
  );

  return (
    <StyledAddress>
      {isShow && modal}
      <div className="main-section">
        <span className="title">
          <strong>점심 고민</strong>은 이제 그만!!
        </span>
        <img className="app-name" src="src/assets/img_address_appname.png" />
        <span className="border-line" />
        <div className="search-section">
          <Input
            mode={'edit'}
            value={value}
            placeholder="동명(읍, 면)으로 검색(EX. 신림동)"
            onChange={onChange}
            onClear={onClear}
            onClick={() => {
              asyncGetAddressList(value, toggleModal);
            }}
          />
        </div>
        <div className="mycoord-section">
          <Button componentType="enable">내 위치로 검색하기</Button>
        </div>
      </div>
    </StyledAddress>
  );
}

export default Address;
