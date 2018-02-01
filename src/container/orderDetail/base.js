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
      peopleInfo: '',
      supplyInfo: null,
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
    }, this._onRefresh);
  }
  getInit = () => {
    const { count, supplyInfo } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '',
      skuCount: count,
      supplyInfo,
    }, this._onRefresh);
    this.EmitOrderDetail = DeviceEventEmitter.addListener('getOrderDetail', (data) => {
      this.getOrderDetail(data);
    });
    if (supplyInfo.renderServices) {
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
    if (supplyInfo.logisticsMode) {
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
    if (supplyInfo.supplyMode) {
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
  }
  getData = () => {
    const { memberId } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.receiveAddresss;
        this.setState({
          peopleInfo: res.data,
          adress: result[0].receiveProvinceName +
          result[0].receiveCityName +
          result[0].receiveDistrictName,
          name: result[0].name,
          receiveAddressId: result[0].receiveAddressId,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      console.log(err);
    });
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
      supplyMode,
      logisticsMode,
      renderServices,
      label } = this.state;
    if (renderServicesItems) {
      const a = [];
      for (let i = 0; i < renderServicesItems.length; i += 1) {
        if (renderServicesItems[i].isChoose === 1) {
          a.push(renderServicesItems[i].title);
          this.setState({
            renderServices: a.toString(),
          });
        }
      }
    }
    if (logisticsModeItems) {
      const b = [];
      for (let i = 0; i < logisticsModeItems.length; i += 1) {
        if (logisticsModeItems[i].isChoose === 1) {
          b.push(logisticsModeItems[i].title);
          this.setState({
            logisticsMode: b.toString(),
          });
        }
      }
    }
    if (supplyModeItems) {
      const c = [];
      for (let i = 0; i < supplyModeItems.length; i += 1) {
        if (supplyModeItems[i].isChoose === 1) {
          c.push(supplyModeItems[i].title);
          this.setState({
            supplyMode: c.toString(),
          });
        }
      }
    }
    this.sleek.toggle();
    CreateSalesOrderService({
      memberId,
      receiveAddressId,
      supplyId: supplyInfo.supplyId,
      buyCount: skuCount,
      supplyMode,
      logisticsMode,
      renderServices,
      memo: label,
      amount: skuCount * supplyInfo.wholesalePrice,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        push({ key: 'OrderInfo', params: { orderInfo: res.data, supplyInfo } });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      console.log(err);
    });
  }
  chooseType1 = (index) => {
    const { renderServicesItems } = this.state;
    for (let i = 0; i < renderServicesItems.length; i += 1) {
      if (i === index) {
        renderServicesItems[i].isChoose *= -1;
      }
      this.setState({
        renderServicesItems,
      });
    }
  }
  chooseType2 = (index) => {
    const { logisticsModeItems } = this.state;
    for (let i = 0; i < logisticsModeItems.length; i += 1) {
      if (i === index) {
        logisticsModeItems[i].isChoose *= -1;
      }
      this.setState({
        logisticsModeItems,
      });
    }
  }
  chooseType3 = (index) => {
    const { supplyModeItems } = this.state;
    for (let i = 0; i < supplyModeItems.length; i += 1) {
      if (i === index) {
        supplyModeItems[i].isChoose *= -1;
      }
      this.setState({
        supplyModeItems,
      });
    }
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
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
