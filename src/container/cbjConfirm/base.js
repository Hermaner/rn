import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreatePurchaseQuoteService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      purchaseId: '',
      price: '',
      supplCount: '',
      unit: '',
      cityArea: '',
      supplyProvinceCode: '',
      supplyCityCode: '',
      memo: '',
      items: null,
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
  initData = () => {
    this.emitBjCity = DeviceEventEmitter.addListener('getBjCity', (data) => {
      this.getBjCity(data);
    });
    global.storage.load({ key: 'userData' }).then(res => this.setState({ memberId: res.memberId })).catch(() => {});
    const { purchaseId, unit, items } = this.props.navigation.state.params;
    items[0].cur = true;
    this.setState({
      purchaseId,
      unit,
      items,
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
      items,
      itemIndex,
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
    this.sleek.toggle();
    const purchaseQuote = {
      memberId,
      purchaseId: purchaseId.toString(),
      price,
      supplCount,
      unit,
      supplyProvinceCode,
      supplyCityCode,
      memo,
      supplyId: items[itemIndex].supplyId.toString(),
    };
    console.log(purchaseQuote);
    CreatePurchaseQuoteService({
      purchaseQuote: JSON.stringify(purchaseQuote),
    })
    .then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('报价成功');
        DeviceEventEmitter.emit('cbjStatus');
        this.props.pop();
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
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
