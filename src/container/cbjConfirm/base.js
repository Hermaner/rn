import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreatePurchaseQuoteService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '1',
      purchaseId: '',
      price: '',
      supplCount: '',
      unit: '颗',
      cityArea: '',
      isSleekShow: false,
      supplyProvinceCode: '',
      supplyCityCode: '',
      memo: '',
      items: [{
        name: '三角枫',
        imgUrl: 'http://dcloud.io/hellomui/images/yuantiao.jpg',
        cur: true,
      }, {
        name: '三角枫',
        imgUrl: 'http://dcloud.io/hellomui/images/yuantiao.jpg',
      }, {
        name: '三角枫',
        imgUrl: 'http://dcloud.io/hellomui/images/yuantiao.jpg',
      }, {
        name: '三角枫',
        imgUrl: 'http://dcloud.io/hellomui/images/yuantiao.jpg',
      }, {
        name: '三角枫',
        imgUrl: 'http://dcloud.io/hellomui/images/yuantiao.jpg',
      }],
      itemIndex: 0,
    };
  }
  getBjCity = (data) => {
    this.setState({
      cityArea: data.text,
      supplyProvinceCode: data.ProvinceCode,
      supplyCityCode: data.CityCode,
    });
  }
  toggleSleek = () => {
    this.setState({
      isSleekShow: !this.state.isSleekShow,
    });
  }
  initData = () => {
    this.emitBjCity = DeviceEventEmitter.addListener('getBjCity', (data) => {
      this.getBjCity(data);
    });
  }
  deleteData = () => {
    this.emitBjCity.remove();
  }
  selestItem = (index) => {
    const { items, itemIndex } = this.state;
    if (itemIndex === index) {
      return;
    }
    items[itemIndex].cur = false;
    items[index].cur = true;
    this.setState({
      items,
      itemIndex: index,
    });
  }
  saveData = () => {
    const {
      memberId,
      purchaseId,
      price,
      supplCount,
      unit,
      supplyProvinceCode,
      supplyCityCode,
      memo,
    } = this.state;
    const reg = /^[1-9]*[1-9][0-9]*$/;
    if (!reg.test(price)) {
      Toast.show('需求量输入错误');
      return;
    }
    if (!reg.test(supplCount)) {
      Toast.show('需求量输入错误');
      return;
    }
    if (!supplyProvinceCode) {
      Toast.show('请选供货地');
      return;
    }
    if (!memo) {
      Toast.show('请输入备注');
      return;
    }
    console.log(memberId,
    purchaseId,
    price,
    supplCount,
    unit,
    supplyProvinceCode,
    supplyCityCode,
    memo);
    this.toggleSleek();
    const purchaseQuote = {
      memberId,
      purchaseId,
      price,
      supplCount,
      unit,
      supplyProvinceCode,
      supplyCityCode,
      memo,
    };
    CreatePurchaseQuoteService({
      purchaseQuote: JSON.stringify(purchaseQuote),
    })
    .then((res) => {
      console.log(res);
      this.toggleSleek();
      if (res.isSuccess) {
        Toast.show('发布成功');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
