import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Global } from '../../utils';
import { RepeatPurchaseService } from '../../api';

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
        page: 'CgxSkus',
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
      upImg: require('../../assets/img/addAc.png'),
      upImages: [],
      initImages: null,
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
      purchaseId: '',
      memberId: '',
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
    const { item } = this.props.navigation.state.params;
    console.log(item)
    const { items } = this.state;
    // const skus = Global.skus;
    // const main = Global.items[Global.firstIndex].childs[Global.secondIndex];
    // const typeName = main.name;
    // let brandName = '';
    // let brandId = '';
    // if (Global.thirdIndex === 0 || Global.thirdIndex) {
    //   brandName = main.brands[Global.thirdIndex].brandName;
    //   brandId = main.brands[Global.thirdIndex].brandId.toString();
    // }
    // items[0].label = `${typeName}${brandName}`;
    // const skuString = [];
    // const purchaseItems = [];
    // skus.forEach((item) => {
    //   if (item.itemIndex !== undefined) {
    //     skuString.push(item.specs[item.itemIndex].specName);
    //     purchaseItems.push({
    //       specTypeId: item.specTypeId.toString(),
    //       specId: item.specs[item.itemIndex].specId.toString(),
    //     });
    //   }
    // });
    // items[1].label = skuString.length > 0 ? skuString.join('') : '不限';
    const skuString = [];
    const purchaseItems = [];
    item.purchaseItems.forEach((list) => {
      skuString.push(list.specName);
      purchaseItems.push({
        specTypeId: list.specTypeId.toString(),
        specId: list.specId.toString(),
      });
    });
    items[0].label = `${item.categoryName}${item.brandName}`;
    items[1].label = skuString.length > 0 ? skuString.join('') : '不限';
    items[2].label = `${item.demand}${item.unit}`;
    items[3].label = item.wantProvinceId ? `${item.wantProvinceName}${item.wantCityName}` : '全国';
    const { items2, options } = this.state;
    items2[1].label = `${item.receiveProvinceName}${item.receiveCityName}`;
    options.forEach((list) => {
      if (list.value === item.purchaseTime) {
        items2[0].label = list.label;
      }
    });
    const initImages = [];
    item.purchaseImages.forEach((img) => {
      initImages.push({
        imgUrl: img.imgUrl,
        key: img.imgKey,
      });
    });
    this.setState({
      items,
      items2,
      purchaseId: item.purchaseId,
      categoryId: item.categoryId,
      brandId: item.brandId,
      demand: item.demand,
      initImages,
      frequency: item.frequency || '',
      wantStarPrice: item.wantStarPrice || '',
      wantEndPrice: item.wantEndPrice || '',
      wantProvinceCode: item.wantProvinceCode || '',
      wantCityCode: item.wantCityCode || '',
      optionType: item.purchaseTime,
      unit: item.unit || '',
      phone: item.phone,
      receiveProvinceCode: item.receiveProvinceCode,
      receiveCityCode: item.receiveCityCode,
      memo: item.memo,
      purchaseItems,
      upImages: item.upImages,
    });
  }
  getImages = (upImages) => {
    console.log(upImages)
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
  getEmitSkus = () => {
    const { items } = this.state;
    const skus = Global.skus;
    console.log(skus)
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
  getCgyxSku = (data) => {
    const { items } = this.state;
    const skuString = [];
    const purchaseItems = [];
    data.forEach((item) => {
      if (item.itemIndex !== undefined) {
        skuString.push(item.specs[item.itemIndex].specName);
        purchaseItems.push({
          specTypeId: item.specTypeId.toString(),
          specId: item.specs[item.itemIndex].specId.toString(),
        });
      }
    });
    items[1].label = skuString.join('');
    this.setState({
      items,
      purchaseItems,
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
  backToHome = () => {
    Alert.alert(
      '温馨提示',
      '是否退出发布？',
      [
        { text: '继续退出', onPress: this.props.pop },
        { text: '取消' },
      ],
    );
  }
  initData = () => {
    this.setState({
      memberId: global.memberId || '',
    });
    this.emitgetCgyxSku = DeviceEventEmitter.addListener('getCgyxSku', (data) => {
      this.getCgyxSku(data);
    });
    this.emitGetSku = DeviceEventEmitter.addListener('getSku', () => {
      this.getEmitSkus();
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
    this.emitgetCgyxSku.remove();
    this.emitGetSku.remove();
    this.emitGetDemand.remove();
    this.emitGetCity.remove();
    this.emitGetACity.remove();
  }
  goPage = (index, type) => {
    const { items, items2, categoryId } = this.state;
    switch (index) {
      case 0:
        if (type === 'cga') {
          this.SelectInput.focus();
          return;
        }
        Global.skuType = '1';
        this.props.push({ key: items[index].page, params: { type: '5' } });
        return;
      case 1:
        if (type === 'cga') {
          this.props.push({ key: items2[index].page, params: { type: 'cga' } });
          return;
        }
        this.props.push({ key: items[index].page, params: { categoryId } });
        return;
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
      purchaseId,
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
    if (!upImages || upImages.length === 0) {
      Toast.show('请上传图片');
      return;
    }
    const purchase = {
      categoryId,
      brandId,
      demand,
      unit,
      purchaseId,
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
    this.sleek.toggle();
    RepeatPurchaseService({
      purchase: JSON.stringify(purchase),
      purchaseItems: JSON.stringify(purchaseItems),
      purchaseImages: upImages.map(item => item.key).join(','),
    })
    .then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('发布成功');
        this.props.pop();
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
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
