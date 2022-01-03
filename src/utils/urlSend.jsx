import isEmpty from 'ramda/src/isEmpty';
import { BASE_URL } from "./constants";

const urlSend = ({ method = 'GET', url, data = {}, headers = {} }) => {
  const requestData = { method };
  if (!isEmpty(data)) { requestData.body = JSON.stringify(data) }
  if (!isEmpty(headers)) { requestData.headers = headers; }

  return fetch(`${BASE_URL}${url}.json`, requestData)
    .then((res) => {
      console.log('[REQUEST]', res);
      if (!res.ok) {
        console.log(res.errors);
        throw new Error(res.errors);
      }
      const tmp = res;
      console.log(tmp.json());
      return res.json();
    });

}

export { urlSend };