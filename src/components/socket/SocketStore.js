/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * Socket 管理，消息中继站
 */
import { Platform, AppState, AsyncStorage } from 'react-native';
import { observable, computed, toJS } from 'mobx';
import io from 'socket.io-client';
import _ from 'lodash';
import config from './config';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
export default class SocketStore {
  // 监听对象
  @observable socketId = null;
  @observable currentChatKey = null;
  @observable currentChatRoomHistory = [];
  sessionListMap = observable.map();
  // 非监听对象
  socket: Object;

  constructor() {
    // App 状态监控
    AppState.addEventListener('change', this._handleAppStateChange);

    // 从缓存恢复消息列表
    this._restoreDataFromLocalStore();

    // 强制指定使用 websocket 作为传输通道
    this.socket = io(config.server, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      this.socketId = this.socket.id;
    });
    this.socket.on('event', (data) => { console.log(data); });
    // 远程消息入口，可能会有队列堆积，所以此处是个 Array
    this.socket.on('message', (payloads: Array<Object>) => {
      // 取数组最新一条消息，并格式化为
      console.log(payloads)
      const sessionItem = this._formatPayloadToSessionItem(
        payloads[payloads.length - 1], payloads.length);
      this.sessionListMap.set(String(sessionItem.key), sessionItem);
      // 需要支持 payload 数组
      this._pushPayloadToMessageHistory(sessionItem.key, payloads);
    });
  }

  // 本地消息入口，本地 payload 推入，只有单条推入
  pushLocalePayload(payload: Object) {
    // sessionItem
    console.log(payload)
    const sessionItem = this._formatPayloadToSessionItem(payload);
    this.sessionListMap.set(String(sessionItem.key), sessionItem);
    // history
    this._pushPayloadToMessageHistory(sessionItem.key, [payload]);
  }

  clearUnReadMessageCount(key: String) {
    let sessionItem = this.sessionListMap.get(key);
    if (sessionItem) {
      sessionItem = Object.assign({
      }, sessionItem, {
        unReadMessageCount: 0,
      });
      this.sessionListMap.set(key, sessionItem);
    }
  }

  // 聊天室相关方法
  fillCurrentChatRoomHistory = async (page = 0, pageSize = 12) => {
    if (this.currentChatKey) {
      let results;
      if (typeof page === 'number' && page === 0) {
        // 异步更新
        results = await this._restoreMessageFromLocalStore(this.currentChatKey, page, pageSize);
        this.currentChatRoomHistory = results;
      } else {
        results = await this._restoreMessageFromLocalStore(this.currentChatKey, page, pageSize);
        this.currentChatRoomHistory = results.concat(...this.currentChatRoomHistory);
      }
      return results.length;
    }
    return 0;
  }
  // 删除会话记录
  deleteSession(key: String) {
    this.sessionListMap.delete(key);
  }

  clear = async () => {
    await AsyncStorage.clear();
    this.sessionListMap.clear();
  }
  // 会话记录
  @computed get sessionList(): Array<Object> {
    return [...this.sessionListMap.values()].sort(
      (a, b) => b.timestamp - a.timestamp)
      .map((item) => {
        item.latestTime = moment(item.timestamp).startOf('minute').fromNow();
        return item;
      });
  }
  @computed get unReadMessageCountTotal(): number {
    let unReadMessageCountTotal = 0;
    [...this.sessionListMap.values()].forEach((item) => {
      unReadMessageCountTotal += item.unReadMessageCount;
    });
    return unReadMessageCountTotal;
  }

  _pushPayloadToMessageHistory(key, payloads: Array<Object>) {
    console.log(key, payloads)
    const pads = payloads.map(payload => _.omit(payload, ['localeExt']));
    this._saveMessageToLocalStore(key, pads);
    // 如果是当前聊天窗，则推入聊天消息
    if (key === this.currentChatKey) {
      this.currentChatRoomHistory = [...this.currentChatRoomHistory].concat(pads);
    }
  }
  /**
   * 格式化 payload
   * @param {Number} delta - 未读数步进
   */
  _formatPayloadToSessionItem(payload, delta: number = 1) {
    let sessionItem;
    const key = this._getPayloadKey(payload);
    console.log(this._getPayloadKey(payload))
    const preSessionItem = this.sessionListMap.get(key);
    if (payload.localeExt) {
      const toInfo = payload.localeExt.toInfo;
      sessionItem = {
        avatar: toInfo.avatar,
        name: toInfo.name,
        latestMessage: payload.msg.content,
        unReadMessageCount: 0,
        timestamp: +(new Date()),
        key,
        toInfo,
      };
    } else {
      const ext = payload.ext;
      sessionItem = {
        avatar: ext.avatar,
        name: ext.name,
        latestMessage: payload.msg.content,
        timestamp: ext.timestamp,
        unReadMessageCount: preSessionItem ? preSessionItem.unReadMessageCount + delta : delta,
        key,
        toInfo: {
          userId: payload.from,
          avatar: ext.avatar,
          name: ext.name,
        },
      };
    }
    return sessionItem;
  }


  _getPayloadKey(payload) {
    if (payload.localeExt) {
      return `${payload.from}-${payload.to}`;
    }
    return `${payload.to}-${payload.from}`;
  }

  _handleAppStateChange = (appState) => {
    if (Platform.OS === 'ios' && appState === 'inactive') {
      this.socket.close();
      this._saveDataToLocalStore();
    }
    if (Platform.OS === 'android' && appState === 'background') {
      this.socket.close();
      this._saveDataToLocalStore();
    }
    if (appState === 'active') {
      console.log(1111)
      this.socket.open();
    }
  }

  /**
   * 历史消息存储结构
   * message:history:${key} 存储用户的消息 id 集合
   * message:item:${uuid} 消息 uuid 集合
   */
  _saveMessageToLocalStore = async (key, payloads: Array<Object>) => {
    const historyKey = `message:history:${key}`;
    const history = await AsyncStorage.getItem(historyKey);
    // 聊天记录索引
    const uuids = payloads.map(payload => payload.uuid);
    await AsyncStorage.setItem(historyKey, `${history ? `${history},` : ''}${uuids.join(',')}`);
    payloads.forEach((payload) => {
      AsyncStorage.setItem(`message:item:${payload.uuid}`, JSON.stringify(payload));
    });
  }

  /**
   * 从历史恢复消息
   * 每次取的数目还不能超过 13 条，不然由于 listView 懒加载，无法滚动到底部
   */
  _restoreMessageFromLocalStore = async (key, page = 0, pageSize) => {
    const history = await AsyncStorage.getItem(`message:history:${key}`);
    if (history) {
      const historyUUIDs = history.split(',').slice(-(pageSize * (page + 1)), -(pageSize * page) || undefined).map(uuid => `message:item:${uuid}`);
      const messageArray = await AsyncStorage.multiGet(historyUUIDs);
      return messageArray.map(item => JSON.parse(item[1]));
    }
    return [];
  }

  /**
   * Session 存储结构如下
   * session:list:map:keys 存放 map key 值列表
   * session:list:key 存储最新一条消息信息
   */
  _saveDataToLocalStore = async () => {
    // 处理 sessionListMap
    AsyncStorage.setItem('session:list:map:keys', [...this.sessionListMap.keys()].join(','));
    for (const [key, value] of this.sessionListMap.entries()) {
      AsyncStorage.setItem(`session:list:${key}`, JSON.stringify(toJS(value)));
    }
  }

  _restoreDataFromLocalStore = async () => {
    // 恢复 sessionListMap
    const keys = await AsyncStorage.getItem('session:list:map:keys');
    if (keys) {
      const initArray = [];
      for (const key of keys.split(',')) {
        const value = JSON.parse((await AsyncStorage.getItem(`session:list:${key}`)));
        initArray.push([key, value]);
      }
      this.sessionListMap.merge(initArray);
    }
  }
}
