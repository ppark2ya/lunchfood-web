import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/web/login/Login';

// describe('<Login />', () => {
//   it('has input and a button', () => {
//     const { getByText, getByPlaceholderText } = render(<Login />);
//     getByPlaceholderText('할 일을 입력하세요'); // input 이 있는지 확인
//     getByText('등록'); // button이 있는지 확인
//   });
// });

test('render Login', () => {
  const { getByText } = render(<Login />);
  const titleElement = getByText(/Login/i);
  expect(titleElement).toBeInTheDocument();
});
