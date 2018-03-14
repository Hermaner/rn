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
    console.log(props.navigation.state.params.item)
    this.state = {
      items: [],
      toUser: props.navigation.state.params.item,
      textInputHeight: 40,
      inputValue: '',
      refresh: false,
      ds,
      dataSource: ds.cloneWithRows([]),
    };
  }
  getInit = () => {
    const { toUser } = this.state;
    global.socketStore.socket.emit('messagedetail', {
      memberId: global.memberId,
      toMemberId: toUser.memberId,
    });
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
