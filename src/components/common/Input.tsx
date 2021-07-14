import React, { CSSProperties, useRef, useCallback, memo } from 'react';
import styled from 'styled-components';
import { ICommonStyleProps } from 'style/types';
import SearchButton from 'components/common/SearchButton';

const Container = styled.div`
  display: flex;
  margin: 1vh 0px;
`;

const EditText = styled.div<ICommonStyleProps>`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  width: 85%;
  height: 50px;
  background-color: ${(props) => props.theme.color.backGray};
  border-radius: ${(props) => props.theme.border.radius};

  input {
    color: ${(props) => props.theme.color.black};
    font-size: 1rem;
    padding-left: 1rem;
    width: 90%;
  }

  & input + span:after {
    content: '';
    width: 1rem;
    height: 1rem;
    display: inline-block;
    background-image: url(/src/assets/mb_ic_input_clear.png);
    background-size: cover;
    margin-right: 1.5vw;
    vertical-align: middle;
  }
`;

const ViewText = styled(EditText)`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.backGray};
`;

interface IInputProps {
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  value: string;
  mode: 'edit' | 'view';
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onClick?: () => void;
}

function Input({
  className,
  style,
  placeholder,
  value,
  mode,
  label,
  onChange,
  onClear,
  onClick,
}: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
      inputRef.current?.focus();
    }
  }, [onClear, inputRef]);

  return (
    <>
      {label && <label htmlFor={label}>{label}</label>}
      <Container>
        {mode === 'edit' ? (
          <EditText className={className} style={style}>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.code === 'Enter') {
                  onClick && onClick();
                }
              }}
            />
            {value.length > 0 && <span onClick={handleClear} />}
          </EditText>
        ) : (
          <ViewText className={className} style={style} onClick={onClick}>
            <input id={label} type="text" value={value} readOnly />
          </ViewText>
        )}
        <SearchButton onClick={onClick} />
      </Container>
    </>
  );
}

export default memo(Input);
