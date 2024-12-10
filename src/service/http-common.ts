import axios from 'axios';

export function httpCommon(url: string) {
  return axios.create({
    baseURL: url,
  });
}
