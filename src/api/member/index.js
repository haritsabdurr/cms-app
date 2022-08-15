import callAPI from '../../config/axios';

export async function getDataFromArya(data) {
  const url = `http://192.168.17.144:8888/signup`;
  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function getDataFromArya2() {
  const url = `http://192.168.17.144:8888/users`;
  return callAPI({
    url,
    method: 'GET',
  });
}
