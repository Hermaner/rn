/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 网络层封装
 */


import {
    Alert
} from 'react-native';

export default async function fetchLocal (input: string, init?: Object): Object {
  let result = await fetch(input, init);
  let resultJson = await result.json();
  console.log(result)
  return resultJson
}
