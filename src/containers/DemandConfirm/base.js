import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import Dateformat from 'dateformat';
import { CreateNewDemandOrderService, GetMemberAddressService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
      upImages: [],
      amount: 0,
      appointDate: '',
      serviceDate: '',
      Uploadurl: '',
      detail: '',
      showAddress: false,
      buyMessage: '',
      adsItems: [],
      adsData: null,
      servicesPrice: '',
      closingDate: '',
      isDateShow: false,
      minimumDate: new Date(),
      maximumDate: new Date('2020-01-01'),
    };
  }
  getInit = () => {
    this.GetMemberAddressService();
    this.emitLoad = DeviceEventEmitter.addListener('emitLoad', () => {
      this.GetMemberAddressService();
    });
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  deleteInit = () => {
    this.emitLoad.remove();
  }
  toggleDate = () => {
    this.setState({
      isDateShow: !this.state.isDateShow,
    });
  }
  dateConfirm = (c) => {
    const closingDate = Dateformat(c, 'yyyy-mm-dd');
    this.setState({
      closingDate,
      isDateShow: false,
    });
  }
  dateCancel = () => {
    this.toggleDate();
  }
  selectAddress = (adsData) => {
    this.setState({
      adsData,
      addressId: adsData.addressId.toString(),
      isAdsShow: false,
    });
  }
  CreateNewDemandOrderService = () => {
    const { item, detail, servicesPrice, adsData, upImages, closingDate, addressId } = this.state;
    if (!closingDate) {
      Toast.show('请选择截止时间');
      return;
    }
    const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (servicesPrice.length > 0 && !reg.test(servicesPrice)) {
      Toast.show('酬金格式错误');
      return;
    }
    if (detail.length < 8) {
      Toast.show('服务描述至少8个字');
      return;
    }
    if (!adsData) {
      Toast.show('请先添加地址');
      return;
    }
    const demandOrder = {
      detail,
      demandCategoryId: item.categoryId,
      servicesPrice,
      servicesTypeName: item.name,
      closingDate,
    };
    this.sleek.toggle();
    console.log({
      addressId,
      demandOrderImages: upImages.map(list => list.key).join(','),
      demandOrder: JSON.stringify(demandOrder),
      memberId: global.memberId,
    });
    CreateNewDemandOrderService({
      addressId,
      demandOrderImages: upImages.map(list => list.key).join(','),
      demandOrder: JSON.stringify(demandOrder),
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('发布成功');
        this.props.push({ key: 'MyDemandOrderDetail', params: { item: res.data, type: 'reset' } });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
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
  createAddress = () => {
    this.props.push({ key: 'MyAddressCreate', params: { type: 'CreateConfirm' } });
    this.hideAds();
  }
  GetMemberAddressService = () => {
    this.sleek.toggle();
    GetMemberAddressService({
      memberId: global.memberId,
    }).then((res) => {
      this.sleek.toggle();
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
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
