// import axios from 'axios';

export default async function callAPI({ url, method, data }) {
  try {
    let headers = {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    };
    const response = await fetch(url, {
      method,
      headers,
      body: data,
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}
