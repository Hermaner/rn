import React from 'react';
import Toast from 'react-native-simple-toast';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Chat } from '../../components';
import { GetUploadTokenService } from '../../api';

const { GiftedChat } = Chat;

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      items: [],
      toUser: props.navigation.state.params.item,
      currentPage: 1,
      pageSize: 15,
    };
    this.socket = {};
  }
  getInit = () => {
    this.GetUploadTokenService();
    const socket = global.socketStore.socket;
    socket.on('notifymessage', (data) => { // 发送消息通知是否发送成功
      console.log(data);
    });
    socket.on('messagedetail', (data) => { // 获取我与好友消息记录
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
    socket.emit('messagedetail', {
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
