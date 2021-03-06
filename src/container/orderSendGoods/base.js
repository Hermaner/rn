import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetLogisticsService, CreateDeliverOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      optionType: '1',
      gsName: '',
      frontImgUrl: '',
      logisticsType: '快递发货',
      isOk: true,
    };
  }
  getInit = () => {
    const { orderInfo } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
    }, this.getData);
  }
  getData = () => {
    GetLogisticsService({
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        // console.log(result);
        const newResult = [];
        for (let i = 0; i < result.length; i += 1) {
          newResult.push({
            value: result[i].logisticsId,
            label: result[i].logisticsName,
          });
        }
        this.setState({
          options: newResult,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  setSelect = (optionType) => {
    const { options } = this.state;
    options.forEach((item) => {
      if (item.value === optionType) {
        this.setState({
          gsName: item.label,
          optionType,
        });
      }
    });
  }
  getImages = (upImages) => {
    this.setState({
      frontImgUrl: upImages,
    });
  }
  chooseType = () => {
    this.setState({
      selectShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      selectShow: false,
    });
  }
  selectModel = (optionType) => {
    const { options } = this.state;
    options.forEach((item) => {
      if (item.value === optionType) {
        this.setState({
          selectShow: false,
          gsName: item.label,
          optionType,
        });
      }
    });
  }
  saveLabel = (deliverOrderNumber) => {
    this.setState({
      deliverOrderNumber,
    });
  }
  goPage = (index) => {
    if (index === 1) {
      this.SelectInput.focus();
    }
  }
  CreateDeliverOrderService = () => {
    const { deliverOrderNumber, optionType, logisticsType, frontImgUrl, orderInfo } = this.state;
    const imgArray = [];
    for (let i = 0; i < frontImgUrl.length; i += 1) {
      imgArray.push(frontImgUrl[i].key);
    }
    if (!deliverOrderNumber) {
      Toast.show('请填写单号！');
      return;
    }
    if (!optionType) {
      Toast.show('请选择物流公司！');
      return;
    }
    if (!frontImgUrl) {
      Toast.show('请添加发货凭证图片！');
      return;
    }
    CreateDeliverOrderService({
      orderId: orderInfo.orderId,
      logisticsType,
      logisticsId: optionType,
      deliverOrderNumber,
      imgUrls: imgArray.toString(),
    }).then((res) => {
      if (res.isSuccess) {
        Toast.show('发货成功！');
        DeviceEventEmitter.emit('reloadDetail');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
  pop: PropTypes.func,
};
export default Base;
