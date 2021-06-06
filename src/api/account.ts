import HttpClient  from '../util/HttpClient';

const prefix = `/account`;
/**
 * @desc 회원가입
 * @param id(Number)
 * @param age(String)
 * @param birthday(String)
 * @param birthyear
 * @param gender(String)
 */
export const insertAccount = (params: {}) =>
  HttpClient.post(`${prefix}/insert_acc`, {
    params,
  });