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

  header {
    height: 90px;
    border-width: 1px;
    border-color: #E0E0E0;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-bottom-style: solid;
  }

  header > #logo {
    position: absolute;
    width: 200px;
    height: 28px;
    left: 360px;
    top: 31px;
  }

  header > .item {
    position: absolute;
    width: 55px;
    height: 15px;
    top: 37px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: -0.02em;

    color: #222222;
  }

  header #item-1 {
    left: 1149px;
  }

  header #item-2 {
    left: 1324px;
  }

  header #item-3 {
    left: 1499px;
  }

  main .loginsection {
    position: absolute;
    width: 1200px;
    height: 660px;
    left: 360px;
    top: 160px;

    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 20px;
  }

  .loginsection .imagesection {
    position: absolute;
    width: 690px;
    height: 660px;
    left: 360px;
    top: 160px;
    
    background: #EAEAEA;
    border-radius: 20px 0px 0px 20px;
  }

  .imagesection #mainimage {
    position: absolute;
    width: 466px;
    height: 463px;
    left: 472px;
    top: 248px;
  }

  .imagesection #loginlogo {
    position: absolute;
    width: 265px;
    height: 36.69px;
    left: 1172px;
    top: 304.61px;
  }

  .loginsection #kakaologinbtn {
    position: absolute;
    width: 340px;
    height: 52px;
    left: 1135px;
    top: 395px;
    
    background: #F4DC01;
    border-radius: 5px;
  }

  .loginsection #signupbtn {

    position: absolute;
    width: 340px;
    height: 52px;
    left: 1135px;
    top: 459px;
    
    background: #FFFFFF;
    border: 1px solid #222222;
    box-sizing: border-box;
    border-radius: 5px;
  }
}
`;

export default GlobalStyle;
