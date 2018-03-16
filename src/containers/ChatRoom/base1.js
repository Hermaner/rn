import React from 'react';
import Toast from 'react-native-simple-toast';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      toUser: props.navigation.state.params.item,
      textInputHeight: 40,
      inputValue: '',
      refresh: false,
      currentPage: 1,
      pageSize: 30,
    };
  }
  getInit = () => {
    this.getData();
  }
  getData = () => {
    const { toUser, currentPage, pageSize } = this.state;
    global.socketStore.socket.emit('messagedetail', {
      memberId: global.memberId,
      toMemberId: toUser.memberId,
      currentPage,
      pageSize,
    });
    this.chatListView.scrollToEnd();
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
    this.chatListView.scrollToEnd();
  }
  _onRefresh = () => {
    const { currentPage } = this.state;
    this.setState({
      refresh: true,
      currentPage: currentPage + 1,
    }, this.getData);
  }
  _onPullMessage = () => {
    this._userReachEnd = false;
    this.setState({
      refresh: false,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
