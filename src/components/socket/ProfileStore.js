/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * 用户信息
 */
import { AsyncStorage, Vibration } from 'react-native';
import { autorun, observable } from 'mobx';
import config from './config';
import fetchLocal from './fetchLocal';

class ProfileStore {
  @observable userInfo: any = null;
  @observable friendList: Object = {};
  @observable isTryRestoreFromStorage = false;
  STORAGE_KEY_USER_INFO = 'IM_USER_INFO';
  STORAGE_KEY_FRIEND_LIST = 'IM_FRIEND_LIST';
  socket: Object;

  constructor(socket: Object) {
      //  绑定 socket 对象
    this.socket = socket;

      // 恢复用户信息
    this._restoreUserInfoFromStorage();
      // // 拉取好友
    this.getOnlineList();

    // socket 信息跟踪
    autorun(this.updateSocketInfo);

    // 是否震动
    this.socket.socket.on('message', () => {
      if (this.userInfo.vibration) {
        Vibration.vibrate();
      }
    });
  }

  // 从本地缓存恢复用户信息
  async _restoreUserInfoFromStorage() {
    const value = await AsyncStorage.getItem(this.STORAGE_KEY_USER_INFO);
    this.userInfo = value ? JSON.parse(value) : value;
    console.log(this.userInfo)
    const ddd = [
      {"userId":668,"avatar":"http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png","name":"0","phone":"18011111111","socketId":"8I-dtAjUewfC-iOuAD2a","status":"offline","vibration":true},
      {"userId":624,"avatar":"http://image-2.plusman.cn/app/im-client/avatar/tuzki_03.jpg","name":"00","phone":"14564125328","socketId":"k4k9QYETese5UHZ6AD0c","status":"offline","vibration":true}
    ];
    this.userInfo = ddd[0];
      // 执行完毕
    this.isTryRestoreFromStorage = true;
  }

  // 更新用户的 socket 信息
  updateSocketInfo = async () => {
    if (this.userInfo && this.socket.socketId) {
      if (this.socket.socketId !== this.userInfo.socketId) {
        await this.modifyUserInfo('socketId', this.socket.socketId);

        // 发送用户上线信息
        this.socket.socket.emit('user:online', {
          userId: this.userInfo.userId,
        });
      }
    }
  }
  // 更新用户信息
  async modifyUserInfo(field: string, value: string) {
    const url = `${config.server}/v1/user/${this.userInfo.userId}/property/${field}`;
    const result = await fetchLocal(url, {
      method: 'PUT',
      body: JSON.stringify({
        value,
      }),
    });
    if (result.success) {
      this.userInfo = result.data;
      AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO, JSON.stringify(result.data));
    }
    return result;
  }
  // 用户登录
  async login(name: string, phone: string, socketId: string = '') {
    const result = await fetchLocal(`${config.server}/v1/user`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
        socketId,
      }),
    });

    if (result.success) {
      this.userInfo = result.data;
      AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO, JSON.stringify(this.userInfo));
    }
    return result;
  }
  // 用户登出
  async logout(userId: string) {
    const result = await fetchLocal(`${config.server}/v1/user/${userId}/status`, {
      method: 'delete',
    });
    if (result.success) {
      await this.socket.clear();
      // 清空 userInfo
      this.userInfo = null;
    }
    return result;
  }
  // 拉取在线用户列表
  async getOnlineList() {
    const ddd = [
      {"userId":668,"avatar":"http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png","name":"0","phone":"18011111111","socketId":"8I-dtAjUewfC-iOuAD2a","status":"offline","vibration":true},
      {"userId":624,"avatar":"http://image-2.plusman.cn/app/im-client/avatar/tuzki_03.jpg","name":"00","phone":"14564125328","socketId":"k4k9QYETese5UHZ6AD0c","status":"offline","vibration":true}
    ];
    this.userInfo = ddd[0];
    this.friendList = ddd;
    console.log(this.userInfo)
    let url = config.server + '/v1/user/online/list';
    console.log(url)
    return ddd;
    // let result = await fetchLocal(url);
    // console.log(result)
    // return
    // if (result.success) {
    //     this.friendList = result.data;
    //     AsyncStorage.setItem(this.STORAGE_KEY_FRIEND_LIST, JSON.stringify(result.data));
    // }
    //
    // return result;
  }
}
export default ProfileStore;
