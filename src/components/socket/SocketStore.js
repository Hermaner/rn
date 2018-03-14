
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
    console.log(111);
    this.socket = io(`${config.server}${global.memberId}`, {
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
    this.socket.on('messagelist', (data) => { // 获取我与所有好友列表
      console.log(data);
      this.chatLists = this.chatLists.concat(data);
    });
    this.socket.on('notfiymessage', (data) => { // 发送消息通知是否发送成功
      console.log(data);
      this.sessionLists.push(data);
    });
    this.socket.on('messagedetail', (data) => { // 获取我与好友消息记录
      console.log(data);
      this.sessionLists = data;
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
      (a, b) => b.lastChatObject.postDate - a.lastChatObject.postDate).map((item) => {
        item.latestTime = moment(item.lastChatObject.postDate).startOf('minute').fromNow();
        return item;
      });
  }
}
