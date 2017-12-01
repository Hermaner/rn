// import Base64 from 'base-64';
import md5 from 'md5';
import BASE64 from './base64';
import configObj from './config';
import Global from '../global';

// const config = configObj.configHong;

// 测试配置
const config = configObj.configShgDev;
// 正式配置
// const config = configObj.configShgPro;

const base64 = BASE64.encoder;

const apiurl = config.apiurl;
export const dev = config.dev;
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
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
    store: Global.store,
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
  return request(`${apiurl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: obj2form(systemParam(data)),
  });
}

export function get(url, data) {
  const purl = `${apiurl}${url}?${obj2form(systemParam(data))}`;
  console.log(purl);
  return request(purl, {
    method: 'GET',
  });
}
