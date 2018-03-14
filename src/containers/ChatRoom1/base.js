import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      items: [],
      toUser: props.navigation.state.params.item,
      textInputHeight: 40,
      inputValue: '',
      refreshing: false,
      ds,
      dataSource: ds.cloneWithRows([]),
    };
  }
  getInit = () => {
  }
  _scrollToBottom = () => {
    const scrollProperties = this.chatListView.scrollProperties;
    // 如果组件没有挂载完全，则不进行内容偏移
    if (!scrollProperties.visibleLength) { return; }

    // 如果是刷新操作，则不进行滑动
    if (!this._userReachEnd) {
      return;
    }
    // 这里是一个大坑，在测试环境的时候，由于运行速度较慢，scrollProperties.contentLength 总能
    // 获取到正确的值，生产环境需要加个延时，用来保证 `renderRow` 执行完毕
    // 这里设置了 130ms 的延时
    setTimeout(() => {
      const offsetY = scrollProperties.contentLength - scrollProperties.visibleLength;
      this.chatListView.scrollTo({
        y: offsetY > 0 ? offsetY : 0,
        animated: this._userHasBeenInputed,
      });
    }, this._userHasBeenInputed ? 0 : 130);
  }
  _onSubmitEditing = () => {
    this._userHasBeenInputed = true;
    const { toUser, inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    const { memberId, userName, imgUrl } = global.userData;
    const { memberId: toMemberId, userName: toUserName, imgUrl: toImgUrl } = toUser;
    const data = {
      clientId: uuid.v4(),
      memberId,
      userName,
      imgUrl,
      toMemberId,
      toUserName,
      toImgUrl,
      message: inputValue,
      postDateStr: new Date().getTime(),
      type: 1,
    };
    global.socketStore.socket.emit('message', data);
    this.setState({ inputValue: '' });
  }
  _onPullMessage = () => {
    this._userReachEnd = false;
    this.setState({
      refreshing: false,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
