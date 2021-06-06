import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;

    font: {
      family: string;
      size: string;
    };

    color: {
      main: string;
    };
  }
}
