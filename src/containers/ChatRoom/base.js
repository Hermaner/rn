import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Chat } from '../../components';
import { GetUploadTokenService } from '../../api';

const { GiftedChat } = Chat;

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: false,
      typingText: null,
      isLoadingEarlier: false,
      items: [],
      toUser: props.navigation.state.params.item,
      currentPage: 1,
      pageSize: 15,
    };
  }
  getInit = () => {
    this.GetUploadTokenService();
    const socket = global.socketStore.socket;
    socket.on('notifyMessageRead', (data) => { // 别人给我发消息我在这里接收
      console.log(data);
      console.log(2);
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, [data]),
        };
      });
      socket.emit('sendMessageMyReadSuccess', [data]);
      global.socketStore.socket.emit('sendGetChatList');
    });
    socket.on('notifyMessageToReadSuccess', (data) => { // 接收对方已读消息告诉我对方已读
      console.log(3);
      console.log(data)
      this.setState((previousState) => {
        console.log(previousState.messages);
        const { messages } = previousState;
        messages.forEach((item) => {
          data.forEach((list) => {
            if (item._id === list._id) {
              item.status = '3';
            }
          });
        });
        this.setState({
          messages,
        });
      });
    });
    socket.on('notifyMessageSendSuccess', (data) => { // 通知发送者消息发送成功
      const { messages } = this.state;
      messages.forEach((item) => {
        if (item._id === data._id) {
          item.status = '2';
        }
      });
      this.setState({
        messages,
      });
    });
    socket.on('notifyGetChat', (data) => { // 获取我与好友消息记录
      this.setState((previousState) => {
        return {
          messages: GiftedChat.prepend(previousState.messages, data),
          currentPage: this.state.currentPage + 1,
          isLoadingEarlier: false,
          loadEarlier: data.length === this.state.pageSize,
        };
      });
    });
    this.loadMore();
  }
  loadMore = () => {
    const { toUser, currentPage, pageSize } = this.state;
    const socket = global.socketStore.socket;
    socket.emit('sendGetChat', {
      toUserId: toUser.memberId,
      currentPage,
      pageSize,
    });
  }
  GetUploadTokenService = () => {
    GetUploadTokenService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        global.uptoken = res.data.upToken;
        global.buketUrl = res.data.buketUrl;
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
