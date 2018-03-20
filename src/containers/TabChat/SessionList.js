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
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    FlatList,
    DeviceEventEmitter,
} from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { Mcolor, st } from '../../utils';
import { TOpacity, UserSocket } from '../../components';

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
    DeviceEventEmitter.addListener('sessionEmit', () => {
      console.log(222)
      this.init();
    });
  }
  init = () => {
    if (global.memberId) {
      global.socketStore.socket.emit('messagelist');
      const { CacheDir } = RNFetchBlob.fs.dirs;
      const path = `${CacheDir}/chatList`;
      RNFetchBlob.fs.exists(path)
      .then((exist) => {
        if (!exist) {
          RNFetchBlob.fs.createFile(path, '', 'utf8');
        } else {
          RNFetchBlob.fs.readFile(path, 'ascii')
          .then((data) => {
            console.log(data);
          });
        }
      })
      .catch(err => console.log(err));
    }
  }
  _renderRow = (data) => {
    const { noReadCount, lastChatObject:
      { text, type, user:
        { avatar, toAvatar, _id, toId, toUserName, userName } }, latestTime } = data.item;
    const isMine = _id.toString() === global.memberId.toString();
    return (
      <TOpacity
        style={styles.list}
        content={
          <View style={[styles.con]}>
            <CachedImage source={{ uri: `${isMine ? toAvatar : avatar}?imageView2/1/w/80` }} style={styles.img} />
            <View style={styles.right}>
              <View style={styles.top}>
                <Text style={styles.name} numberOfLines={1}>
                  {decodeURI(isMine ? toUserName : userName)}
                </Text>
                <Text style={styles.date} numberOfLines={1}>{latestTime}</Text>
              </View>
              <Text style={styles.msg}>{type === '1' ? text : '图片'}</Text>
            </View>
            <View style={styles.badgeView}>
              <Text style={styles.badgeText}>{noReadCount}</Text>
            </View>
          </View>
        }
        onPress={() => {
          this.props.push({ key: 'ChatRoom',
            params: {
              item: {
                memberId: isMine ? toId : _id,
                userName: isMine ? toUserName : userName,
                imgUrl: isMine ? toAvatar : avatar,
              },
            },
          });
        }}
      />
    );
  }
  _renderContent() {
    const items = global.socketStore.chatList;
    console.log(items);
    return (
      <View style={styles.listContent}>
        <FlatList
          data={items}
          renderItem={this._renderRow}
          ref={(reference) => { this.chatListView = reference; }}
          keyExtractor={(item, index) => index}
          enableEmptySections
          getItemLayout={(data, index) => (
            { length: 100, offset: (100 + 2) * index, index }
          )}
        />
      </View>
    );
  }
  render() {
    return (
      <Container>
        {this._renderContent()}
      </Container>

    );
  }
}
SessionList.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(SessionList);
