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
export default async function fetchLocal(input: string, init?: Object): Object {
  const result = await fetch(input, init);
  const resultJson = await result.json();
  return resultJson;
}
