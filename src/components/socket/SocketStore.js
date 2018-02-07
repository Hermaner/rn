
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
  sessionListMap = observable.map();
  @observable sessionLists = []
  @observable sessionChats = []
  // 非监听对象
  socket: Object;
  constructor() {
    // 强制指定使用 websocket 作为传输通道
    this.socket = io(`${config.server}?memberId=${global.userData.memberId}`, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      this.socketId = this.socket.id;
    });
    this.socket.on('disconnect', () => {
    });
    this.socket.on('messagelist', (data) => {
      console.log(data);
      this.sessionChats = this.sessionChats.concat(data);
      console.log(this.sessionChats)
    });
    this.socket.on('message', (data) => {
      console.log(data);
      this.sessionLists = this.sessionLists.concat(data);
    });
    this.socket.on('notfiymessage', (data) => {
      console.log(data);
      this.sessionLists = this.sessionLists.concat(data);
      console.log(this.sessionLists)
    });
  }
  _saveLocal = async () => {
    // 处理 sessionListMap
    AsyncStorage.setItem('sessionKeys', [...this.sessionListMap.keys()].join(','));
    for (const [key, value] of this.sessionListMap.entries()) {
      AsyncStorage.setItem(`session${key}`, JSON.stringify(toJS(value)));
    }
  }
  _restoreLocal = async () => {
    // 恢复 sessionListMap
    const keys = await AsyncStorage.getItem('sessionKeys');
    if (keys) {
      const initArray = [];
      for (const key of keys.split(',')) {
        const value = JSON.parse((await AsyncStorage.getItem(`session${key}`)));
        initArray.push([key, value]);
      }
      this.sessionListMap.merge(initArray);
    }
  }
  @computed get sessionChat(): Array<Object> {
    console.log(this.sessionChats)
    return this.sessionChats.sort(
      (a, b) => b.lastMessage.postDate - a.lastMessage.postDate)
      .map((item) => {
        item.latestTime = moment(item.lastMessage.postDate).startOf('minute').fromNow();
        return item;
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
}
