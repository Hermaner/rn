
import { Platform, AppState, AsyncStorage } from 'react-native';
import { observable, computed, toJS } from 'mobx';
import RNFetchBlob from 'react-native-fetch-blob';
import io from 'socket.io-client';
import config from './config';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
export default class SocketStore {
  // 监听对象
  @observable socketId = null;
  @observable sessionLists = [];
  @observable chatLists = [];
  // 非监听对象
  socket: Object;
  getConnect = () => {
    const { CacheDir } = RNFetchBlob.fs.dirs;
    console.log(`${config.server}${global.memberId}`);
    this.socket = io(`${config.server}${global.memberId}`, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      this.socketId = this.socket.id;
    });
    this.socket.on('disconnect', () => {
    });
    this.socket.on('notifyGetChatList', (data) => { // 获取我与所有好友列表
      console.log(data);
      this.chatLists = data;
    });
  }
  @computed get sessionList(): Array<Object> {
    return this.sessionLists.map((item) => {
      item.latestTime = moment(item.postDate).startOf('minute').fromNow();
      return item;
    });
  }
  @computed get chatList(): Array<Object> {
    return this.chatLists.sort(
      (a, b) => b.lastChatObject.createdAt - a.lastChatObject.createdAt).map((item) => {
        item.latestTime = moment(item.lastChatObject.createdAt).startOf('minute').fromNow();
        return item;
      });
  }
}
