import React from 'react';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';
import uuid from 'uuid';
import {
  AppState,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Chat, SocketObser } from '../../components';
import { GetUploadTokenService } from '../../api';
import { writeChatList } from '../../utils';

const { GiftedChat } = Chat;

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { item, product } = props.navigation.state.params;
    this.state = {
      messages: [],
      loadEarlier: false,
      isLoadingEarlier: false,
      items: [],
      toUser: item,
      product: product || null,
      isProductSend: true,
      currentPage: 1,
      pageSize: 45,
      localSize: 45,
      chatStatus: '0',
    };
  }
  onLoadEarlier = () => {
    this.setState({
      isLoadingEarlier: true,
    });
    if (this._isMounted === true) {
      this.loadMore();
    }
  }
  onProductPress = (id) => {
    const ar = id.split(',');
    this.props.push({ key: 'GoodDetail', params: { supplyId: ar[0], memberId: ar[1] } });
  }
  onPressAvatar = (memberId) => {
    this.props.push({ key: 'MyInfo', params: { memberId } });
  }
  onSend = (items = []) => {
    this.socket.emit('sendMessage', items);
    let { messages } = this.state;
    messages = items.concat(messages);
    this.writeAllFile(messages);
    this.setState({
      messages,
    });
    this.socket.emit('sendGetChatList');
  }
  getInit = () => {
    this.socket = SocketObser.socket;
    const { toUser: { memberId, imgUrl, userName } } = this.state;
    const { CacheDir } = RNFetchBlob.fs.dirs;
    const path = `${CacheDir}/${global.memberId}${memberId}`;
    // RNFetchBlob.fs.unlink(path);
    RNFetchBlob.fs.exists(path)
    .then((exist) => {
      if (!exist) {
        const first = [];
        RNFetchBlob.fs.createFile(path, JSON.stringify(first), 'utf8');
        this.loadNewChat();// 发送请求获取最新的聊天记录
        this.socket.emit('sendGetNoReadCount');
        // this.onSend([{
        //   status: '3',
        //   text: '欢迎光临，咨询请留言，或点击我的头像，可致电给我',
        //   type: '1',
        //   user: {
        //     avatar: imgUrl,
        //     isPush: '0',
        //     userName,
        //     _id: memberId,
        //   },
        //   createdAt: new Date().getTime(),
        //   _id: uuid.v4(),
        // }]);
      } else {
        RNFetchBlob.fs.readFile(path, 'utf8')
        .then((data) => {
          const messages = JSON.parse(data);
          // console.log(messages);
          this.setState({
            messages,
          }, () => {
            this.loadNewChat();// 发送请求获取最新的聊天记录
            this.socket.emit('sendGetNoReadCount');
          });
        });
      }
    });
    AppState.addEventListener('change', this.appStateChange);
    this.GetUploadTokenService();
    this.socket.on('notifyMessageRead', this.notifyMessageRead);  // 别人给我发的文件我看到了
    this.socket.on('notifyMessageToReadSuccess', this.notifyMessageToReadSuccess);  // 我接受对方看到消息更改状态
    this.socket.on('notifyMessageSendSuccess', this.notifyMessageSendSuccess);  // 告诉自己我消息发送成功了
    this.socket.on('notifyGetChatLog', this.notifyGetChatLog);  // 获取分页聊天记录
    this.socket.on('notifyGetChat', this.notifyGetChat);  // 获取最新的聊天记录
    this.socket.on('notifyGetChatStatus', this.notifyGetChatStatus);  // 获取对方是否登录
  }
  deleteInit = () => {
    global.chatId = null;
    AppState.removeEventListener('change', this.appStateChange);
    this.socket.off('notifyMessageRead', this.notifyMessageRead);
    this.socket.off('notifyMessageToReadSuccess', this.notifyMessageToReadSuccess);
    this.socket.off('notifyMessageSendSuccess', this.notifyMessageSendSuccess);
    this.socket.off('notifyGetChat', this.notifyGetChat);
    this.socket.off('notifyGetChatStatus', this.notifyGetChatStatus);
    this.state = null;
  }
  notifyMessageRead = (data) => {
    let { messages } = this.state;
    if (data.length === 1 && data[0].type !== '2') {
      messages = data.concat(messages);
      this.writeAllFile(messages);
      this.setState({
        messages,
      });
      this.socket.emit('sendMessageMyReadSuccess', data); // 告诉对方我收到消息了
    } else {
      data.forEach((item, i) => {
        const index = item.text.lastIndexOf('/') + 1;
        const key = item.text.substr(index);
        const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${key}`;
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'png',
          path,
        })
        .fetch('GET', item.text, {
        })
        .then(() => {
          item.path = path;
          if (i === data.length - 1) {
            messages = data.concat(messages);
            this.writeAllFile(messages);
            this.setState({
              messages,
            });
            this.socket.emit('sendMessageMyReadSuccess', data); // 告诉对方我收到消息了
          }
        });
      });
    }
  }
  notifyMessageToReadSuccess = (data) => {
    const { messages } = this.state;
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
    this.writeNewFile(messages);
  }
  notifyMessageSendSuccess = (items) => {
    const { messages } = this.state;
    messages.forEach((message) => {
      items.forEach((item) => {
        if (item._id === message._id) {
          message.status = '2';
        }
      });
    });
    this.setState({
      messages,
    });
    this.writeNewFile(messages);
  }
  notifyGetChat = (items) => {
    // console.log(items);
    let { messages } = this.state;
    const { localSize } = this.state;
    const newItems = [];
    items.forEach((item) => {
      let exist = false;
      messages.forEach((message) => {
        if (message._id === item._id) {
          exist = true;
          if (message.status === '4' || (message.status < item.status && item.status !== '4')) {
            message.status = item.status;
          }
        }
      });
      if (!exist) {
        newItems.push(item);
      }
    });
    let count = 0;
    newItems.forEach((item) => {
      if (item.type === '2') {
        count += 1;
      }
    });
    if (count === 0) { // 如果没有图片不需要缓存
      messages = newItems.concat(messages);
      this.writeAllFile(messages);
      this.setState({
        messages,
        isLoadingEarlier: false,
        loadEarlier: messages.length === localSize,
      });
    } else {  // 如果有图片图片缓存以后再渲染
      let count2 = 0;
      newItems.forEach((item) => {
        if (item.type === '2') {
          const index = item.text.lastIndexOf('/') + 1;
          const key = item.text.substr(index);
          const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${key}`;
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
            path,
          })
          .fetch('GET', item.text, {
          })
          .then(() => {
            item.path = path;
            count2 += 1;
            if (count === count2) {
              messages = newItems.concat(messages);
              this.writeAllFile(messages);
              this.setState({
                messages,
                isLoadingEarlier: false,
                loadEarlier: messages.length === localSize,
              });
            }
          });
        }
      });
    }
  }
  notifyGetChatLog = (data) => {
    // console.log(data);
    const { pageSize } = this.state;
    this.setState(previousState => ({
      messages: GiftedChat.prepend(previousState.messages, data),
      currentPage: this.state.currentPage + 1,
      isLoadingEarlier: false,
      loadEarlier: data.length === pageSize,
    }));
  }
  notifyGetChatStatus = (chatStatus) => {
    this.setState({
      chatStatus,
    });
  }
  showImage = (params) => {
    this.props.push({ key: 'ChatImage', params });
  }
  appStateChange = (appState) => {
    if (Platform.OS === 'ios' && appState === 'inactive') {
      // this.socket.disconnect();
    }
    if (Platform.OS === 'android' && appState === 'background') {
      // this.socket.disconnect();
    }
    if (appState === 'active') {
      this.socket.connect();
      this.loadNewChat();
    }
  }
  sendProduct = () => {
    const { product: { supplyId, memberId, imgUrl, name, price } } = this.state;
    this.onSend([{
      order: {
        id: `${supplyId},${memberId}`,
        imgUrl,
        title: name,
        price,
      },
      type: '3',
      status: '1',
      user: this.renderUser(),
      createdAt: new Date().getTime(),
      _id: uuid.v4(),
    }]);
    this.setState({
      isProductSend: false,
    });
  }
  loadNewChat = () => {
    const { toUser } = this.state;
    this.socket.emit('sendGetChat', {
      toUserId: toUser.memberId,
    });
  }
  loadMore = () => {
    const { messages, toUser, currentPage, pageSize } = this.state;
    // console.log(messages[messages.length - 1].createdAt);
    this.socket.emit('sendGetChatLog', { // 发送请求获取分页数据
      toUserId: toUser.memberId,
      currentPage,
      pageSize,
      createdAt: messages[messages.length - 1].createdAt,
    });
  }
  deleteMsgList = (index) => {
    const { messages } = this.state;
    messages.splice(index, 1);
    this.setState({
      messages,
    });
    this.writeAllFile(messages);
  }
  writeNewFile = (messages) => { // 写入新文件，用户数据内部有状态更新
    const { toUser: { memberId } } = this.state;
    writeChatList(memberId, JSON.stringify(messages));
  }
  writeAllFile = (messages) => { // 又更新又写入
    const { localSize } = this.state;
    if (messages.length > localSize) {
      messages.length = localSize;
    }
    const { toUser: { memberId } } = this.state;
    writeChatList(memberId, JSON.stringify(messages));
  }
  GetUploadTokenService = () => {
    GetUploadTokenService()
    .then((res) => {
      if (res.isSuccess) {
        global.uptoken = res.map.upToken;
        global.buketUrl = res.map.buketUrl;
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  renderUser = () => {
    const { toUser } = this.state;
    const { memberId, imgUrl, nickName } = global.userData;
    return {
      _id: memberId.toString(),
      userName: nickName,
      avatar: imgUrl,
      toId: toUser.memberId.toString(),
      toUserName: toUser.userName,
      toAvatar: toUser.imgUrl,
    };
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
