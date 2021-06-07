import HttpClient from '../util/HttpClient';

const prefix = '/account';
/**
 * @desc 회원가입
 * @param id: 사용자 id(Number)
 * @param age: 나이(String)
 * @param birthday: 생일(String)
 * @param birthyear(String)
 * @param gender: 성별(String)
 */
export const insertAccount = (requestBody: any) =>
  HttpClient.post(`${prefix}/insert_acc`, requestBody);
