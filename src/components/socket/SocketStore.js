
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
  @observable currentChatRooms = [];
  @observable price = 0;
  @observable amount = 1;
  // 非监听对象
  socket: Object;
  constructor() {
  }
  getConnect = () => {
    this.socket = io(`${config.server}?memberId=${global.userData.memberId}`, {
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
      console.log(this.chatLists)
    });
    this.socket.on('notfiymessage', (data) => {
      console.log(data);
      this.sessionLists = this.sessionLists.concat(data);
      console.log(this.sessionLists)
    });
  }
  @computed get currentChatRoom(): Array<Object> {
    console.log(this.currentChatRooms)
    return this.currentChatRooms.sort(
      (a, b) => b.postDate - a.postDate)
      .map((item) => {
        item.latestTime = moment(item.postDate).startOf('minute').fromNow();
        return item;
      });
  }
  @computed get sessionList(): Array<Object> {
    console.log(this.sessionLists)
    return this.sessionLists.sort(
      (a, b) => b.postDate - a.postDate)
      .map((item) => {
        item.latestTime = moment(item.postDate).startOf('minute').fromNow();
        return item;
      });
  }
  @computed get total() {
    return this.price * this.amount;
  }
  @computed get chatList(): Array<Object> {
    console.log(this.chatLists)
    return this.chatLists.sort(
      (a, b) => b.postDate - a.postDate)
      .map((item) => {
        item.latestTime = moment(item.postDate).startOf('minute').fromNow();
        return item;
      });
  }
}
