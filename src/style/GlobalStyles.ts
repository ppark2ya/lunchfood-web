import { createGlobalStyle } from 'styled-components';

// https://www.npmjs.com/package/@fontsource/noto-sans-kr -> 폰트 쉽게 적용해봤는데 bold 처리가 안되서 일단 롤백함
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    margin: 0;
    padding: 0;
  }
  body {
    height: 100%;
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  ol, ul, li {
    list-style: none;
  }
  span {
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
  }
  #root {
    width: 100%;
    min-height: 100vh;
  }
}
`;

export default GlobalStyle;
