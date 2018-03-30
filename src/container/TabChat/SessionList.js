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
import RNFetchBlob from 'react-native-fetch-blob';
import Swipeout from 'react-native-swipeout';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    AppState,
    Platform,
    DeviceEventEmitter,
} from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { st, writeSessionList } from '../../utils';
import { TOpacity, UserSocket, SocketObser, NoData } from '../../components';

const moment = require('moment');

moment.locale('zh-cn');
const styles = StyleSheet.create({
  listContent: {
    flex: 1,
  },
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
    fontSize: 14,
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  msg: {
    fontSize: 13,
    color: '#888',
    lineHeight: 25,
  },
  badgeView: {
    position: 'absolute',
    top: 3,
    left: 45,
    height: 14,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '#ff0000',
    borderRadius: 7,
    ...st.jacenter,
    overflow: 'hidden',
  },
  badgeText: {
    fontSize: 11,
    color: '#fff',
  },
  noLogin: {
    flex: 1,
    ...st.jacenter,
  },
  noLoginText: {
    fontSize: 14,
    color: '#3292ff',
  },
});

@observer
class SessionList extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      items: [],
      hasLogin: false,
      rowId: '',
      isAllowScroll: true,
    };
  }
  componentDidMount() {
    if (SocketObser.socket) {
      this.init();
    }
    AppState.addEventListener('change', this.appStateChange);
    this.socket = SocketObser.socket;
    this.sessionEmit = DeviceEventEmitter.addListener('sessionEmit', () => {
      this.init();
    });
    this.offSessionEmit = DeviceEventEmitter.addListener('offSessionEmit', () => {
      this.socket.off('notifyMessageRead', this.notifyMessageRead);
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.appStateChange);
    this.sessionEmit.remove();
    this.offSessionEmit.remove();
    this.socket = null;
    if (this.socket) {
      this.socket.off('notifyMessageRead', this.notifyMessageRead);
    }
  }
  init = async () => {
    if (global.memberId) {
      if (!this.socket) {
        this.socket = await SocketObser.socket;
      }
      const { CacheDir } = RNFetchBlob.fs.dirs;
      const path = `${CacheDir}/${global.memberId}sessionList`;
      // RNFetchBlob.fs.unlink(path);
      RNFetchBlob.fs.exists(path)
      .then((exist) => {
        if (!exist) {
          RNFetchBlob.fs.createFile(path, '', 'utf8');
        } else {
          RNFetchBlob.fs.readFile(path, 'utf8')
          .then((data) => {
            if (!data) {
              return;
            }
            const items = JSON.parse(data);
            this.setState({
              items,
            });
          });
        }
      });
      this.socket.on('notifyGetChatList', this.notifyGetChatList); // 获取当前聊天列表
      this.socket.on('notifyMessageRead', this.notifyMessageRead); // 有人给我发了新消息
      this.socket.emit('sendGetChatList'); // 发送请求获取当前聊天列表
    }
  }
  appStateChange = (appState) => {
    if (Platform.OS === 'ios' && appState === 'inactive') {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
    if (Platform.OS === 'android' && appState === 'background') {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
    if (appState === 'active') {
      if (this.socket) {
        this.socket.connect();
      }
      if (this.socket) {
        this.socket.emit('sendGetChatList');
      }
    }
  }
  notifyMessageRead = () => {
    this.socket.emit('sendGetChatList');
  }
  notifyGetChatList = (lists) => {
    let { items } = this.state;
    const newLists = [];
    lists.forEach((list) => {
      let exit = false;
      items.forEach((item) => {
        if (item.id === list.id) {
          exit = true;
          item.lastChatObject = list.lastChatObject;
          item.showMemberNoReadCount = item.id === global.chatId ? '0' : list.showMemberNoReadCount;
        }
      });
      if (!exit) {
        newLists.push(list);
      }
    });
    items = newLists.concat(items);
    items.sort(
      (a, b) => b.lastChatObject.createdAt - a.lastChatObject.createdAt);
    writeSessionList(JSON.stringify(items));
    this.setState({
      items,
    });
  }
  del = (index) => {
    const { items } = this.state;
    const showMemberId = items[index].showMemberId;
    items.splice(index, 1);
    this.setState({
      items,
    });
    this.socket.emit('sendDeleteChat', {
      toMemberId: showMemberId,
    }); // 删除列表
    const { CacheDir } = RNFetchBlob.fs.dirs;
    const path = `${CacheDir}/${showMemberId}`;
    RNFetchBlob.fs.unlink(path);
    writeSessionList(JSON.stringify(items));
  }
  _renderRow = (data) => {
    const { showMemberNoReadCount, id, lastChatObject:
      { text, createdAt, type }, showImgUrl, showMemberId, showUserName } = data.item;
    return (
      <Swipeout
        // close={data.index !== rowId}
        onOpen={() => {
          this.setState({
            isAllowScroll: false,
            rowId: data.index,
          });
        }}
        onClose={() => { this.setState({ isAllowScroll: true }); }}
        autoClose
        right={[{
          text: '删除',
          backgroundColor: '#ff0000',
          color: '#fff',
          underlayColor: '#ff0000',
          onPress: () => this.del(data.index),
        }]}
      >
        <TOpacity
          style={styles.list}
          content={
            <View style={[styles.con]}>
              <CachedImage source={{ uri: `${showImgUrl}?imageView2/1/w/80` }} style={styles.img} />
              <View style={styles.right}>
                <View style={styles.top}>
                  <Text style={styles.name} numberOfLines={1}>
                    {decodeURI(showUserName)}
                  </Text>
                  <Text style={styles.date} numberOfLines={1}>{moment(createdAt).startOf('minute').fromNow()}</Text>
                </View>
                <Text style={styles.msg} numberOfLines={1}>{type === '1' ? text : type === '2' ? '图片' : type === '3' ? '产品' : '语音'}</Text>
              </View>
              {
                showMemberNoReadCount && showMemberNoReadCount > 0 &&
                <View style={styles.badgeView}>
                  <Text style={styles.badgeText}>{showMemberNoReadCount}</Text>
                </View>
              }
            </View>
          }
          onPress={() => {
            const { items } = this.state;
            global.chatId = id;
            items[data.index].showMemberNoReadCount = '0';
            writeSessionList(JSON.stringify(items));
            this.setState({
              items,
            });
            this.props.push({ key: 'ChatRoom',
              params: {
                item: {
                  memberId: showMemberId,
                  userName: showUserName,
                  imgUrl: showImgUrl,
                },
              },
            });
          }}
        />
      </Swipeout>
    );
  }
  _renderContent() {
    const { items, isAllowScroll } = this.state;
    return (
      <View style={styles.listContent}>
        {
          items.length > 0 ?
            <FlatList
              scrollEnabled={isAllowScroll}
              data={items}
              renderItem={this._renderRow}
              ref={(reference) => { this.chatListView = reference; }}
              keyExtractor={(item, index) => index}
              enableEmptySections
              getItemLayout={(data, index) => (
                { length: 100, offset: (100 + 2) * index, index }
              )}
            />
            :
            <NoData
              label="没有聊天信息"
            />
        }
      </View>
    );
  }
  render() {
    const { userData } = UserSocket;
    return (
      <Container>
        {
          userData && userData.memberId ?
            this._renderContent()
            :
            <View style={styles.noLogin}>
              <TOpacity
                content={
                  <Text style={styles.noLoginText}>请先登录</Text>
                }
                onPress={() => {
                  this.props.push({ key: 'User',
                  });
                }}
              />
            </View>
        }
      </Container>

    );
  }
}
SessionList.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(SessionList);
