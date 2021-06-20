import React, { CSSProperties, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { ICommonStyleProps } from 'style/types';
import SearchButton from 'components/common/SearchButton';

const EditContainer = styled.div<ICommonStyleProps>`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  width: 85%;
  height: 50px;
  background-color: ${(props) => props.theme.color.backGray};
  border-radius: ${(props) => props.theme.border.radius};
  float: left;

  input {
    color: ${(props) => props.theme.color.black};
    font-size: 1rem;
    padding-left: 2rem;
    width: 90%;
  }

  & input + span:after {
    content: '';
    width: 1rem;
    height: 1rem;
    display: inline-block;
    background-image: url(src/assets/mb_ic_input_clear.png);
    background-size: cover;
    margin-right: 1.5vw;
    vertical-align: middle;
  }
`;

const ViewContainer = styled(EditContainer)`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.backGray};
`;

interface IInputProps {
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  value: string;
  mode: 'edit' | 'view';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onClick?: () => void;
}

function Input(props: IInputProps) {
  const { value, mode, onChange, placeholder, onClear, onClick } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
      inputRef.current?.focus();
    }
  }, [onClear, inputRef]);

  return (
    <>
      {mode === 'edit' ? (
        <EditContainer {...props} onClick={() => {}}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {value.length > 0 && <span onClick={handleClear} />}
        </EditContainer>
      ) : (
        <ViewContainer>
          <input type="text" value={value} readOnly />
        </ViewContainer>
      )}

      <SearchButton onClick={onClick} />
    </>
  );
}

export default Input;
