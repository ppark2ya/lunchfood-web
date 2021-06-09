import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';

// test('render Login', () => {
//   const { getByText } = render(<Login />);
//   const titleElement = getByText(/Login/i);
//   expect(titleElement).toBeInTheDocument();
// });

describe('insertAccount api test', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 });
  const baseUrl = 'https://lunch.nolmungshimung.com';

  mock.onPost(`${baseUrl}/insert_acc`).reply(200, {
    id: '',
    age: '',
    birthday: '',
    birthyear: '',
    gender: '',
  });

  it('response 200', async () => {});

  it('response 404', async () => {});

  it('response 422', async () => {});

  it('response 500', async () => {});
});
