import React from 'react';
import styled from 'styled-components';
import { getAddressList } from 'api/address';
import ModalPortal from 'modal/portal/ModalPortal';

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
    padding: 1rem;
    width: 400px;
    height: auto;
  }
`;

interface SearchResultProps {
  value: string;
}

function SearchResult({ value }: SearchResultProps) {
  return (
    <ModalPortal>
      <StyledModal>
        <div className="modalcontainer">
          <div className="modalcontents">
            <h1>{value}</h1>
            <button>닫기</button>
          </div>
        </div>
      </StyledModal>
    </ModalPortal>
  );
}

export default SearchResult;
