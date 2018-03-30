import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetMemberInfoService, CreateSalesOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tu: require('../../assets/img/no.png'),
      skuCount: '',
      label: '',
      labelLength: 0,
      items: [],
      info: '',
      currentPage: 1,
      pageSize: '15',
      memberId: '',
      adress: '',
      supplyInfo: null,
      isAdsShow: false,
      adsItems: [],
      defaultAds: null,
      name: '',
      receiveAddressId: '',
      Province: '',
      City: '',
      District: '',
      renderServicesItems: [],
      logisticsModeItems: [],
      supplyModeItems: [],
      supplyMode: '',
      logisticsMode: '',
      renderServices: '',
    };
  }
  getOrderDetail = (data) => {
    this.setState({
      name: data.name,
      phone: data.phone,
      receiveAddressId: data.adressId,
      Province: data.Province,
      City: data.City,
      District: data.District,
    }, this.getInit);
  }
  getEmitAdress = () => {
    this.getInit();
  }
  getInit = () => {
    const { count, supplyInfo } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '',
      skuCount: count,
      supplyInfo,
    }, this.getData);
    if (supplyInfo.renderServices !== '' && supplyInfo.renderServices !== null) {
      const renderServicesItems = supplyInfo.renderServices.split(',');
      const NewRenderServicesItems = [];
      for (let i = 0; i < renderServicesItems.length; i += 1) {
        NewRenderServicesItems.push({
          title: renderServicesItems[i],
          isChoose: -1,
        });
      }
      this.setState({
        renderServicesItems: NewRenderServicesItems,
      });
    }
    if (supplyInfo.logisticsMode !== '' && supplyInfo.logisticsMode !== null) {
      const logisticsModeItems = supplyInfo.logisticsMode.split(',');
      const NewLogisticsModeItems = [];
      for (let i = 0; i < logisticsModeItems.length; i += 1) {
        NewLogisticsModeItems.push({
          title: logisticsModeItems[i],
          isChoose: -1,
        });
      }
      this.setState({
        logisticsModeItems: NewLogisticsModeItems,
      });
    }
    if (supplyInfo.supplyMode !== '' && supplyInfo.supplyMode !== null) {
      const supplyModeItems = supplyInfo.supplyMode.split(',');
      const NewSupplyModeItems = [];
      for (let i = 0; i < supplyModeItems.length; i += 1) {
        NewSupplyModeItems.push({
          title: supplyModeItems[i],
          isChoose: -1,
        });
      }
      this.setState({
        supplyModeItems: NewSupplyModeItems,
      });
    }
  }
  getDelete = () => {
    this.EmitOrderDetail.remove();
    this.EmitAdress.remove();
  }
  getData = () => {
    const { memberId } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.receiveAddresss;
        if (result.length === 0) {
          return;
        }
        this.setState({
          adsItems: result,
          defaultAds: result[0],
          receiveAddressId: result[0].receiveAddressId,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  initData = () => {
    this.EmitOrderDetail = DeviceEventEmitter.addListener('getOrderDetail', (data) => {
      this.getOrderDetail(data);
    });
    this.EmitAdress = DeviceEventEmitter.addListener('getEmitAdress', () => {
      this.getEmitAdress();
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
  selectAddress = (defaultAds) => {
    this.setState({
      defaultAds,
      receiveAddressId: defaultAds.receiveAddressId.toString(),
      isAdsShow: false,
    });
  }
  createAddress = () => {
    this.hideAds();
    this.props.push({ key: 'MyAddressCreate', params: { type: 'getEmitAdress' } });
  }
  buildOrder = () => {
    const { push } = this.props;
    const {
      memberId,
      receiveAddressId,
      supplyInfo,
      skuCount,
      renderServicesItems,
      logisticsModeItems,
      supplyModeItems,
      label } = this.state;
    if (receiveAddressId === '') {
      Toast.show('请选择地址');
      return;
    }
    if ((supplyInfo.wholesaleCount !== '' && supplyInfo.wholesaleCount !== null) && (skuCount < parseFloat(supplyInfo.wholesaleCount))) {
      Toast.show('不能小于起订量！');
      return;
    }
    const renderServices = [];
    if (renderServicesItems) {
      renderServicesItems.forEach((item) => {
        if (item.cur) {
          renderServices.push(item.title);
        }
      });
    }
    const supplyMode = [];
    if (supplyModeItems) {
      supplyModeItems.forEach((item) => {
        if (item.cur) {
          supplyMode.push(item.title);
        }
      });
    }
    const logisticsMode = [];
    if (logisticsModeItems) {
      logisticsModeItems.forEach((item) => {
        if (item.cur) {
          logisticsMode.push(item.title);
        }
      });
    }
    this.sleek.toggle();
    CreateSalesOrderService({
      memberId,
      receiveAddressId,
      supplyId: supplyInfo.supplyId,
      buyCount: skuCount,
      supplyMode: supplyMode.join(','),
      logisticsMode: logisticsMode.join(','),
      renderServices: renderServices.join(','),
      memo: label,
      amount: (skuCount * supplyInfo.wholesalePrice).toFixed(2),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        DeviceEventEmitter.emit('emitUser');
        push({ key: 'OrderInfo', params: { orderInfo: res.data, supplyInfo, emit: 'reset' } });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  tabSer = (index) => {
    const { renderServicesItems } = this.state;
    renderServicesItems[index].cur = !renderServicesItems[index].cur;
    this.setState({
      renderServicesItems,
    });
  }
  tabLog = (index) => {
    const { logisticsModeItems } = this.state;
    logisticsModeItems[index].cur = !logisticsModeItems[index].cur;
    this.setState({
      logisticsModeItems,
    });
  }
  tabSup = (index) => {
    const { supplyModeItems } = this.state;
    supplyModeItems[index].cur = !supplyModeItems[index].cur;
    this.setState({
      supplyModeItems,
    });
  }
  saveLabel = (label) => {
    this.setState({
      label,
      labelLength: 50 - label.length,
    });
    if (label.length >= 50) {
      Toast.show('字数请控制在50字以内');
      this.setState({
        label: label.substring(0, 49),
      });
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
