import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Global } from '../../utils';
import { CreatePurchaseService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: '1',
        title: '采购货品',
        must: true,
        last: true,
        label: '水果',
        page: 'MainSearch',
      }, {
        id: '1',
        title: '规格要求',
        must: false,
        last: false,
        label: '不限',
        page: 'CgSkus',
      }, {
        id: '1',
        title: '需求量',
        must: true,
        last: false,
        label: '不限',
        page: 'CgDemand',
      }, {
        id: '1',
        title: '期望货源地',
        must: false,
        last: true,
        label: '全国',
        page: 'CgCitys',
      }],
      items2: [{
        id: '1',
        title: '采购时长',
        must: true,
        last: false,
        label: '7天',
      }, {
        id: '1',
        title: '收货地址',
        must: false,
        last: false,
        label: '请选择',
        page: 'CgCitys',
      }],
      isSleekShow: false,
      upImg: require('../../assets/img/addAc.png'),
      upImages: [],
      imageCount: 4,
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
      optionType: '7',
      phone: '',
      options: [{ value: '7', label: '7天' },
      { value: '90', label: '3个月' },
      { value: '180', label: '6个月' }],
      uptoken: '',
      categoryId: '',
      brandId: '',
      demand: '',
      frequency: '',
      wantStarPrice: '',
      wantEndPrice: '',
      wantProvinceCode: '',
      wantCityCode: '',
      purchaseTime: '',
      receiveProvinceCode: '',
      receiveCityCode: '',
      memo: '',
      unit: '',
      purchaseItems: [],
    };
  }
  getData = () => {
    const { items } = this.state;
    const skus = Global.skus;
    const main = Global.items[Global.firstIndex].childs[Global.secondIndex];
    const typeName = main.name;
    let brandName = '';
    let brandId = '';
    if (Global.thirdIndex === 0 || Global.thirdIndex) {
      brandName = main.brands[Global.thirdIndex].brandName;
      brandId = main.brands[Global.thirdIndex].brandId.toString();
    }
    items[0].label = `${typeName}${brandName}`;
    const skuString = [];
    const purchaseItems = [];
    skus.forEach((item) => {
      if (item.itemIndex !== undefined) {
        skuString.push(item.specs[item.itemIndex].specName);
        purchaseItems.push({
          specTypeId: item.specTypeId.toString(),
          specId: item.specs[item.itemIndex].specId.toString(),
        });
      }
    });
    items[1].label = skuString.length > 0 ? skuString.join('') : '不限';
    this.setState({
      items,
      purchaseItems,
      categoryId: main.categoryId.toString(),
      brandId,
    });
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  getDemand = (data) => {
    const { items } = this.state;
    items[2].label = `${data.demand}${data.optionType}`;
    this.setState({
      items,
      demand: data.demand,
      unit: data.optionType,
      wantStarPrice: data.wantStarPrice,
      wantEndPrice: data.wantEndPrice,
      frequency: data.frequency,
    });
  }
  getCity = (data) => {
    const { items } = this.state;
    items[3].label = data.text;
    this.setState({
      items,
      wantProvinceCode: data.ProvinceCode,
      wantCityCode: data.CityCode,
    });
  }
  getACity = (data) => {
    const { items2 } = this.state;
    items2[1].label = data.text;
    this.setState({
      items2,
      receiveProvinceCode: data.ProvinceCode,
      receiveCityCode: data.CityCode,
    });
  }
  setSelect = (optionType) => {
    const { items2, options } = this.state;
    options.forEach((item) => {
      if (item.value === optionType) {
        items2[0].label = item.label;
      }
    });
    this.setState({
      items2,
      optionType,
    });
  }
  toggleSleek = () => {
    this.setState({
      isSleekShow: !this.state.isSleekShow,
    });
  }
  backToHome = () => {
    Alert.alert(
      '温馨提示',
      '是否退出发布？',
      [
        { text: '继续退出', onPress: this.props.resetHome },
        { text: '取消' },
      ],
    );
  }
  initData = () => {
    this.setState({
      phone: '15666666666',
    });
    this.emitGetSku = DeviceEventEmitter.addListener('getSku', () => {
      this.getData();
    });
    this.emitGetDemand = DeviceEventEmitter.addListener('getDemand', (data) => {
      this.getDemand(data);
    });
    this.emitGetCity = DeviceEventEmitter.addListener('getCity', (data) => {
      this.getCity(data);
    });
    this.emitGetACity = DeviceEventEmitter.addListener('getACity', (data) => {
      this.getACity(data);
    });
  }
  deleteData = () => {
    this.emitGetSku.remove();
    this.emitGetDemand.remove();
    this.emitGetCity.remove();
    this.emitGetACity.remove();
  }
  goPage = (index, type) => {
    const { items, items2 } = this.state;
    switch (index) {
      case 0:
        if (type === 'cga') {
          this.SelectInput.focus();
          return;
        }
        Global.skuType = '1';
        this.props.push({ key: items[index].page, params: { type: '2' } });
        return;
      case 1:
        if (type === 'cga') {
          this.props.push({ key: items2[index].page, params: { type: 'cga' } });
          return;
        }
        Global.skuType = '2';
        break;
      case 3:
        this.props.push({ key: items[index].page, params: { type: 'cgb' } });
        return;
      default:
        break;
    }
    this.props.push({ key: items[index].page });
  }
  goCgComfirm = () => {
    const {
      categoryId,
      brandId,
      demand,
      frequency,
      wantStarPrice,
      wantEndPrice,
      wantProvinceCode,
      wantCityCode,
      optionType,
      unit,
      phone,
      memberId,
      receiveProvinceCode,
      receiveCityCode,
      memo,
      purchaseItems,
      upImages,
    } = this.state;
    // if (!memberId) {
    //   Toast.show('请先登录');
    //   return;
    // }
    const telReg = !(phone).match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    if (telReg) {
      Toast.show('手机号格式不对');
      return;
    }
    if (!demand) {
      Toast.show('请输入需求量');
      return;
    }
    if (!receiveProvinceCode) {
      Toast.show('请选择收货地址');
      return;
    }
    const purchase = {
      categoryId,
      brandId,
      demand,
      unit,
      phone,
      memberId,
      frequency,
      wantStarPrice,
      wantEndPrice,
      wantProvinceCode,
      wantCityCode,
      purchaseTime: optionType,
      receiveProvinceCode,
      receiveCityCode,
      memo,
    };
    CreatePurchaseService({
      purchase: JSON.stringify(purchase),
      purchaseItems: JSON.stringify(purchaseItems),
      purchaseImages: upImages.map(item => item.key).join(','),
    })
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        Toast.show('发布成功');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
}

Base.propTypes = {
  push: PropTypes.func,
  resetHome: PropTypes.func,
};
export default Base;
