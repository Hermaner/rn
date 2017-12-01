import md5 from 'md5';
import BASE64 from './base64';
import configObj from './config';

const config = configObj.configDev;
// const config = configObj.configPro;

const base64 = BASE64.encoder;

function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
export function systemParam(data) {
  const defaultdata = {
    format: 'json',
    timestamp: parseInt(new Date().getTime() / 1000, 10).toString(),
    nick: config.nick,
    name: config.name,
    orgCode: Global.orgCode,
    store: Global.storeName,
    op: Global.op,
  };
  Object.assign(defaultdata, data);
  const { nick, method, timestamp, name, format } = defaultdata;
  defaultdata.sign = md5(`${base64(nick)}${base64(method)}${base64(timestamp)}${base64(name)}${base64(format)}`);
  return defaultdata;
}

export function obj2form(data) {
  let string = '';
  for (const key of Object.keys(data)) {
    string += `&${key}=${encodeURIComponent(data[key])}`;
  }
  return string.substr(1, string.length);
}
export function post(url, data) {
  return request(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: obj2form(systemParam(data)),
  });
}

export function get(url, data) {
  const purl = `${Global.apiurl}${url}?${obj2form(systemParam(data))}`;
  console.log(purl);
  return request(purl, {
    method: 'GET',
  });
}
