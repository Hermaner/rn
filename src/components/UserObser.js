
import { observable, computed, action } from 'mobx';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
export default class UserObser {
  // 监听对象
  @observable userInfo = {};
  @observable applyInfo = {};

  getConnect = () => {
  }
  @action changeData(data) {
    this.userInfo = data;
  }
  @action changeApply(data) {
    this.applyInfo = data;
  }
  @computed get userData() {
    return {
      ...this.userInfo,
      ...this.applyInfo,
    };
  }
}
