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
      global.socketStore.socket.emit('messagelist');
    }
  }
  _renderRow = (data) => {
    const { memberId, toMemberId, imgUrl, toImgUrl,
      lastChatObject: { message }, latestTime, toUserName, userName } = data.item;
    const isMine = memberId.toString() === global.memberId.toString();
    return (
      <TOpacity
        style={styles.list}
        content={
          <View style={[styles.con]}>
            <CachedImage source={{ uri: `${isMine ? toImgUrl : imgUrl}?imageView2/1/w/80` }} style={styles.img} />
            <View style={styles.right}>
              <View style={styles.top}>
                <Text style={styles.name} numberOfLines={1}>
                  {decodeURI(isMine ? toUserName : userName)}
                </Text>
                <Text style={styles.date} numberOfLines={1}>{latestTime}</Text>
              </View>
              <Text style={styles.msg}>{message}</Text>
            </View>
          </View>
        }
        onPress={() => {
          this.props.push({ key: 'ChatRoom',
            params: {
              item: {
                memberId: isMine ? toMemberId : memberId,
                userName: isMine ? toUserName : userName,
                imgUrl: isMine ? toImgUrl : imgUrl,
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
