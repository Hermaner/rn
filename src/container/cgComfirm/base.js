import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import { Global } from '../../utils';
import { CreatePurchaseService } from '../../api';

class CgCategoryBase extends React.Component {
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
      upImg: require('../../assets/img/addAc.png'),
      images: [],
      imageCount: 4,
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
      optionType: '7天',
      phone: '15666666666',
      options: [{ value: '7天', label: '7天' },
      { value: '3个月', label: '3个月' },
      { value: '6个月', label: '6个月' }],
      categoryId: '',
      brandId: '0',
      demand: '',
      frequency: '0',
      wantStarPrice: '',
      wantEndPrice: '0',
      wantProvinceCode: '',
      wantCityCode: '0',
      purchaseTime: '',
      receiveProvinceCode: '0',
      receiveCityCode: '',
      memo: '0',
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
      brandId = main.brands[Global.thirdIndex].brandId;
    }
    items[0].label = `${typeName}${brandName}`;
    const skuString = [];
    const purchaseItems = [];
    skus.forEach((item) => {
      if (item.itemIndex !== undefined) {
        skuString.push(item.specs[item.itemIndex].specName);
        purchaseItems.push({
          specTypeId: item.specTypeId,
          specId: item.specs[item.itemIndex].specId,
        });
      }
    });
    items[1].label = skuString.length > 0 ? skuString.join('') : '不限';
    this.setState({
      items,
      categoryId: main.categoryId,
      brandId,
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
    const { items2 } = this.state;
    items2[0].label = optionType;
    this.setState({
      items2,
      optionType,
    });
  }
  initData = () => {
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
        Global.cgType = '1';
        this.props.push({ key: items[index].page, params: { type: '2' } });
        return;
      case 1:
        if (type === 'cga') {
          this.props.push({ key: items2[index].page, params: { type: 'cga' } });
          return;
        }
        Global.cgType = '2';
        break;
      case 3:
        this.props.push({ key: items[index].page, params: { type: 'cgb' } });
        return;
      default:
        break;
    }
    this.props.push({ key: items[index].page });
  }
  goAsheet = (index) => {
    switch (index) {
      case 0:
        this.openCamera();
        break;
      case 1:
        this.pickMultiple();
        break;
      default:
    }
  }
  showImageDate = (imageDateIndex) => {
    const { images } = this.state;
    const imageViewData = [];
    images.forEach(item => imageViewData.push({ url: item.uri }));
    this.setState({
      imageDateIndex,
      isImageDateShow: true,
      imageViewData,
    });
  }
  imageDel = (index) => {
    const { images } = this.state;
    images.splice(index, 1);
    this.setState({
      images,
    });
  }
  openCamera = () => {
    const { images, imageCount } = this.state;
    ImagePicker.openCamera({
      includeBase64: true,
      includeExif: true,
    }).then((image) => {
      images.push({ uri: `data:${image.mime};base64,${image.data}`, width: image.width, height: image.height });
      if (images.length > imageCount) {
        images.length = imageCount;
      }
      this.setState({
        images,
      });
    }).catch(e => alert(e));
  }
  pickMultiple = () => {
    const { images, imageCount } = this.state;
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then((image) => {
      image.forEach((item) => {
        images.push({ uri: item.path, width: item.width, height: item.height, mime: item.mime });
      });
      if (images.length > imageCount) {
        images.length = imageCount;
      }
      this.setState({
        images,
      });
    }).catch(e => alert(e));
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
      purchaseTime,
      receiveProvinceCode,
      receiveCityCode,
      memo,
      purchaseItems,
      images,
    } = this.state;
    console.log(
      categoryId,
    brandId,
    demand,
    frequency,
    wantStarPrice,
    wantEndPrice,
    wantProvinceCode,
    wantCityCode,
    purchaseTime,
    receiveProvinceCode,
    receiveCityCode,
    memo,
    JSON.stringify(purchaseItems),
    images.map(item => item.uri).join(','),
  );
    CreatePurchaseService({
      categoryId,
      brandId,
      demand,
      frequency,
      wantStarPrice,
      wantEndPrice,
      wantProvinceCode,
      wantCityCode,
      purchaseTime,
      receiveProvinceCode,
      receiveCityCode,
      memo,
      purchaseItems: JSON.stringify(purchaseItems),
      purchaseImages: images.map(item => item.uri).join(','),
    })
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        console.log(res);
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
}

CgCategoryBase.propTypes = {
  push: PropTypes.func,
};
export default CgCategoryBase;
