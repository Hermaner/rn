import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import Dateformat from 'dateformat';
import { CreateOrderService, GetMemberAddressService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { typeId, items, ruleInfo } = props.navigation.state.params;
    console.log(ruleInfo);
    this.state = {
      items,
      ruleInfo,
      typeId: typeId || '2',
      upImages: [],
      amount: 0,
      appointDate: '',
      serviceDate: '',
      Uploadurl: '',
      showAddress: false,
      buyMessage: '',
      adsItems: [],
      adsData: null,
      deliveryTypeId: '',
      isDtShow: false,
      isAdsShow: false,
      popDates: [],
      dayIndex: null,
      timeIndex: null,
      popTimes: [],
      initImages: [],
    };
  }
  getInit = () => {
    this.initDate();
    this.GetMemberAddressService();
    this.emitAmout = DeviceEventEmitter.addListener('emitAmout', () => {
      this.computeAmount();
    });
    this.emitLoad = DeviceEventEmitter.addListener('emitLoad', () => {
      this.GetMemberAddressService();
    });
    DeviceEventEmitter.emit('emitAmout');
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  deleteInit = () => {
    this.emitAmout.remove();
    this.emitLoad.remove();
  }
  computeAmount = () => {
    let amount = 0;
    const { items, ruleInfo } = this.state;
    items.forEach((item) => {
      amount += item.count * item.salesPrice;
    });
    if (ruleInfo) {
      const { conditionPrice, typeId, price } = ruleInfo;
      if (typeId === 1) {
        amount = amount < conditionPrice ? (amount + price) : amount;
      } else if (typeId === 3) {
        amount = amount < conditionPrice ? conditionPrice : amount;
      }
    }
    this.setState({
      amount,
    });
  }
  backChange = (index, count) => {
    const { items } = this.state;
    items[index].count = count;
    this.setState({
      items,
    }, () => DeviceEventEmitter.emit('emitAmout'));
  }
  selectAddress = (adsData) => {
    this.setState({
      adsData,
      addressId: adsData.addressId.toString(),
      isAdsShow: false,
    });
  }
  createOrder = () => {
    const {
      deliveryTypeId,
      amount,
      adsData,
      upImages,
      buyMessage,
      items,
      addressId,
      serviceDate,
      typeId,
    } = this.state;
    if (!serviceDate) {
      Toast.show('请选择服务时间');
      return;
    }
    if (!adsData) {
      Toast.show('请先添加地址');
      return;
    }
    const products = [];
    items.forEach((item) => {
      products.push({
        count: item.count.toString(),
        servicesPrice: item.salesPrice.toString(),
        servicesTypeId: item.id.toString(),
        typeId,
        serviceDate,
      });
    });
    this.sleek.toggle();
    CreateOrderService({
      addressId,
      deliveryTypeId,
      amount: amount.toString(),
      buyMessage,
      orderImages: upImages.map(item => item.key).join(','),
      products: JSON.stringify(products),
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.props.push({
          key: 'CreatePay',
          params: {
            orderNumber: res.data.orderNumber,
            orderId: res.data.orderId,
            amount,
            type: 1,
          },
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  dayTab = (index) => {
    const { popDates, dayIndex } = this.state;
    if (dayIndex === index) {
      return;
    }
    if (index === 0 && popDates[index].disabled) {
      return;
    }
    popDates[index].cur = true;
    if (dayIndex !== null) {
      popDates[dayIndex].cur = false;
    }
    this.setState({
      dayIndex: index,
      popDates,
    });
  }
  timeTab = (index) => {
    const { popDates, popTimes, timeIndex, dayIndex } = this.state;
    if (timeIndex === index) {
      return;
    }
    if (dayIndex === 0 && popTimes[index].disabled) {
      return;
    }
    popDates[0].disabled = popTimes[index].disabled;
    popTimes[index].cur = true;
    if (timeIndex !== null) {
      popTimes[timeIndex].cur = false;
    }
    this.setState({
      popTimes,
      popDates,
      timeIndex: index,
    });
  }
  initDate = () => {
    const weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    const popDates = [];
    const d = new Date();
    const hour = d.getHours();
    for (let i = 0; i < 9; i += 1) {
      d.setDate(d.getDate() + 1);
      const w = Dateformat(d, 'N') - 1;
      const day = i === 0 ? '今天' : i === 1 ? '明天' : weeks[w];
      popDates.push({
        day,
        cur: false,
        disabled: hour >= 20,
        nyr: Dateformat(d, 'yyyy-mm-dd'),
        label: Dateformat(d, 'mm-dd'),
      });
    }
    const popTimes = [{
      day: '上午',
      cur: false,
      disabled: hour >= 10,
      label: '9:00-12:00',
    }, {
      day: '下午',
      cur: false,
      disabled: hour >= 16,
      label: '12:00-18:00',
    }, {
      day: '晚上',
      cur: false,
      disabled: hour >= 20,
      label: '18:00-22:00',
    }];
    this.setState({
      popDates,
      popTimes,
    });
  }
  showAds = () => {
    this.setState({
      isAdsShow: true,
    });
  }
  hideAds = () => {
    this.setState({
      isAdsShow: false,
    });
  }
  showPopDate = () => {
    this.setState({
      isDtShow: true,
    });
  }
  hidepopDate = () => {
    this.setState({
      isDtShow: false,
    });
  }
  createAddress = () => {
    this.props.push({ key: 'MyAddressCreate', params: { type: 'loadAddress' } });
    this.hideAds();
  }
  savePopDate = () => {
    const { popDates, dayIndex, timeIndex, popTimes } = this.state;
    if (dayIndex === null || timeIndex === null) {
      Toast.show('请选择时间');
      return;
    }
    const appointDate = `${popDates[dayIndex].day}${popDates[dayIndex].label}${popTimes[timeIndex].day}${popTimes[timeIndex].label}`;
    const serviceDate = `${popDates[dayIndex].nyr}${popTimes[timeIndex].day}${popTimes[timeIndex].label}`;
    this.setState({
      isDtShow: false,
      appointDate,
      serviceDate,
    });
  }
  GetMemberAddressService = () => {
    GetMemberAddressService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        if (res.data.length > 0) {
          res.data.sort((a, b) => b.isDefault - a.isDefault);
          this.setState({
            adsItems: res.data,
            adsData: res.data[0],
            addressId: res.data[0].addressId.toString(),
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
