import React from 'react';
import styled from 'styled-components';
import ModalPortal from 'modal/portal/ModalPortal';
import AddressList from 'components/mobile/address/AddressList';
import { AddressRoadItem, CoordItemParams } from 'api/types';

const StyledModal = styled.div`
  .modalcontainer {
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modalcontents {
    background: white;
  }
`;

interface IProps {
  items?: AddressRoadItem[];
  onAddressClick: (params: CoordItemParams) => Promise<void>;
}

function SearchResult({ items, onAddressClick }: IProps) {
  return (
    <ModalPortal>
      <StyledModal>
        <div className="modalcontainer">
          <div className="modalcontents">
            <AddressList items={items} onAddressClick={onAddressClick} />
          </div>
        </div>
      </StyledModal>
    </ModalPortal>
  );
}

export default SearchResult;
