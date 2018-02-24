
import { Platform, AppState, AsyncStorage } from 'react-native';
import { observable, computed, toJS } from 'mobx';
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
    this.socket = io(`${config.server}?memberId=${global.memberId}`, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      this.socketId = this.socket.id;
    });
    this.socket.on('disconnect', () => {
    });
    this.socket.on('message', (data) => {
      console.log(data);
      this.sessionLists = this.sessionLists.concat(data);
    });
    this.socket.on('messagelist', (data) => {
      console.log(data);
      this.chatLists = this.chatLists.concat(data);
    });
    this.socket.on('notfiymessage', (data) => {
      console.log(data);
      this.sessionLists = this.sessionLists.concat(data);
    });
  }
  @computed get sessionList(): Array<Object> {
    return this.sessionLists.sort(
      (a, b) => b.postDate - a.postDate)
      .map((item) => {
        item.latestTime = moment(item.postDate).startOf('minute').fromNow();
        return item;
      });
  }
  @computed get chatList(): Array<Object> {
    return this.chatLists.sort(
      (a, b) => b.lastMessage.postDate - a.lastMessage.postDate)
      .map((item) => {
        item.latestTime = moment(item.lastMessage.postDate).startOf('minute').fromNow();
        return item;
      });
  }
}
