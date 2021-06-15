import { createGlobalStyle } from 'styled-components';

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
}
`;

export default GlobalStyle;
