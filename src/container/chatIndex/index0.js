/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * App 入口文件
 */

import { observer } from 'mobx-react/native';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// import {
//   profileStore,
// } from '../../components/socket/storeSingleton';
import Login from '../../components/socket/Login';

@observer
class ImClient extends React.Component {
  constructor(props: Object) {
    super(props);
    this.setState({});
  }
  state: Object;
  render() {
    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
  },
});

export default ImClient;
