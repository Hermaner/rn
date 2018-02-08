/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 好友列表
 */
import { observer } from 'mobx-react/native';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { Mcolor, st } from '../../utils';
import socketStore from '../../components/socket/SocketStore';
import { TOpacity } from '../../components';

const moment = require('moment');

moment.locale('zh-cn');
const styles = StyleSheet.create({
  list: {
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  con: {
    ...st.frcenter,
    borderBottomColor: '#e2e2e2',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
  },
  conLast: {
    borderBottomWidth: 0,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 3,
    marginRight: 8,
  },
  right: {
    flex: 1,
  },
  top: {
    ...st.frcenter,
    height: 25,
  },
  name: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  msg: {
    fontSize: 14,
    color: '#666',
    lineHeight: 25,
  },
});

@observer
class SessionList extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      items: [],
      hasLogin: false,
    };
  }
  componentDidMount() {
    this.init();
  }
  init = () => {
    if (global.memberId) {
      this.setState({
        hasLogin: true,
      }, () => {
        global.socketStore.socket.emit('messagelist', {
          user: global.userData,
        });
      });
    }
    this.emitSession = DeviceEventEmitter.addListener('emitSession', () => {
      this.setState({
        hasLogin: true,
      }, () => {
        global.socketStore.socket.emit('messagelist', {
          user: global.userData,
        });
      });
    });
  }
  _renderRow = (item, index) => (
    <TOpacity
      style={styles.list}
      key={index}
      content={
        <View style={[styles.con, index === this.state.items.length - 1 && styles.conLast]}>
          <CachedImage source={{ uri: item.user.imgUrl }} style={styles.img} />
          <View style={styles.right}>
            <View style={styles.top}>
              <Text style={styles.name} numberOfLines={1}>{decodeURI(item.user.userName)}</Text>
              <Text style={styles.date} numberOfLines={1}>{item.latestTime}</Text>
            </View>
            <Text style={styles.msg}>{item.lastMessage.message.message}</Text>
          </View>
        </View>
      }
      onPress={() => {
        this.props.push({ key: 'ChatRoom',
          params: {
            item,
          },
        });
      }}
    />
  )
  render() {
    const { hasLogin } = this.state;
    if (!hasLogin) {
      return null;
    }
    const items = global.socketStore.chatList;
    return (
      <ScrollView
        style={{ flex: 1 }}
      >
        {
          items.map((item, index) => (
            <View key={index}>
              {this._renderRow(item, index)}
            </View>
          ))
        }
      </ScrollView>
    );
  }
}
SessionList.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(SessionList);
