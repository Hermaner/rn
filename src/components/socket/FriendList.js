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

import {
    Color,
    ListItem,
} from '../UiLibrary';

import { profileStore } from './storeSingleton';
import ChatRoom from './ChatRoom';

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
        this.props.navigator.push(ChatRoom, row.name, {
          toInfo: {
            userId: row.userId,
            avatar: row.avatar,
            name: row.name,
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
  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <ListItem.Separator
        key={`${sectionID}-${rowID}`}
      />
    );
  }
  render() {
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}
        dataSource={this.ds.cloneWithRowsAndSections(toJS(profileStore.friendList))}
        renderSectionHeader={this._renderSectionHeader}
        renderSeparator={this._renderSeparator}
        renderRow={this._renderRow}
        enableEmptySections
      />
    );
  }
}

export default FriendList;
