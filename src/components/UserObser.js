
import { observable, computed, action } from 'mobx';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
export default class UserObser {
  // 监听对象
  @observable userInfo = {};
  @observable localInfo = {};
  @observable countInfo = {};

  @action changeData(data) {
    this.userInfo = data;
  }
  @action changeLocal(data) {
    this.localInfo = data;
  }
  @action changeCount(data) {
    this.countInfo = data;
  }
  @computed get userData() {
    return this.userInfo;
  }
  @computed get localData() {
    return this.localInfo;
  }
  @computed get countData() {
    return this.countInfo;
  }
}
