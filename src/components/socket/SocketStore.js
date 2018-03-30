
import { observable, computed } from 'mobx';
import io from 'socket.io-client';
import { DeviceEventEmitter } from 'react-native';
import config from './config';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
export default class SocketStore {
  // 监听对象
  @observable socketId = null;
  @observable sessionLists = [];
  @observable chatLists = [];
  @observable isDot = false;
  // 非监听对象
  socket: Object;
  getConnect = () => {
    this.socket = io(`${config.server}${global.memberId}`, {
      transports: ['websocket'],
      pingTimeout: 60000,
      pingInterval: 60000,
    });
    this.socket.on('connect', () => {
      this.socketId = this.socket.id;
    });
    this.socket.on('disconnect', () => {
    });
    this.socket.emit('sendGetNoReadCount');
    DeviceEventEmitter.emit('notifyGetNoReadCount');
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
