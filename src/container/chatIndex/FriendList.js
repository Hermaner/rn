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
import { toJS } from 'mobx';
import { observer } from 'mobx-react/native';
import React from 'react';
import {
    RefreshControl,
    StyleSheet,
    ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';

import {
    Color,
    ListItem,
} from '../../components/UiLibrary';

import { profileStore } from '../../components/socket/storeSingleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  online: {
    color: Color.WechatGreen,
  },
});

@observer
class FriendList extends React.Component {
  constructor(props: Object) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.userId !== r2.userId,
      // REVIEW: s1, s2 的返回值不确定，需要再次确认
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      refreshing: false,
    };
  }
  state: Object;
  ds: Object;
  _onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    await profileStore.getOnlineList();
    this.setState({
      refreshing: false,
    });
  }

  _renderRow = row => (
    <ListItem.Label
      icon={row.avatar}
      labelText={row.name}
      labelStyle={row.status === 'online' ? styles.online : ''}
      onPress={() => {
        console.log(row);
        this.props.push({ key: 'ChatRoom',
          params: {
            toInfo: {
              userId: row.userId,
              avatar: row.avatar,
              name: row.name,
            },
          },
        });
      }}
    />
  )
  _renderSectionHeader = (sectionData, sectionID) => (
    <ListItem.Header
      title={sectionID.toUpperCase()}
    />
  )
  _renderSeparator(sectionID: number, rowID: number) {
    return (
      <ListItem.Separator
        key={`${sectionID}-${rowID}`}
      />
    );
  }
  render() {
    console.log(toJS(profileStore.friendList))
    const ar = {
      0: [{
        userId: 668,
        avatar: 'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png',
        name: '周',
        phone: '18011111111',
        socketId: '8I-dtAjUewfC-iOuAD2a',
        status: 'online',
        vibration: true,
      }, {
        userId: 668,
        avatar: 'http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png',
        name: '见见',
        phone: '18011111111',
        socketId: '8I-dtAjUewfC-iOuAD2a',
        status: 'offline',
        vibration: true,
      }],
    };
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}
        dataSource={this.ds.cloneWithRowsAndSections(ar)}
        renderSectionHeader={this._renderSectionHeader}
        renderSeparator={this._renderSeparator}
        renderRow={this._renderRow}
        enableEmptySections
      />
    );
  }
}
FriendList.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(FriendList);
