
import { observable, computed, action } from 'mobx';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
export default class UserObser {
  // 监听对象
  @observable userInfo = {};

  getConnect = () => {
  }
  @action changeData(data) {
    this.userInfo = data;
  }
  @computed get total() {
    return this.price * this.amount;
  }
  @computed get userData() {
    return this.userInfo;
  }
}
