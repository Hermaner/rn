import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetUploadTokenService } from '../../api';
import { Global } from '../../utils';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        title: '货品名称',
        label: '水果',
        page: 'MainSearch',
      }, {
        title: '货品规格',
        label: '水果',
        page: 'CgSkus',
      }, {
        title: '是否现货',
        label: '水果',
        page: 'CgySpot',
      }, {
        title: '货品单价',
        label: '水果',
        page: 'CgyPrice',
      }, {
        title: '发货地址',
        label: '水果',
        page: 'CgCitys',
      }, {
        title: '货品描述',
        label: '水果',
        page: 'CgyDesc',
      }],
      upImg: require('../../assets/img/addAc.png'),
      images: [],
      imageCount: 4,
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
      isSpotGoods: '',
      endDate: '',
      startDate: '',
      wholesalePrice: '',
      wholesaleCount: '',
      unit: '',
    };
  }
  getSpot = (data) => {
    const { items } = this.state;
    items[2].label = `${data.startDate}${data.startDate && '-'}${data.endDate}(${data.isSpotGoods === '1' ? '现货' : '预售'})`;
    this.setState({
      items,
      isSpotGoods: data.isSpotGoods,
      endDate: data.endDate,
      startDate: data.startDate,
    });
  }
  getCgyPrice = (data) => {
    const { items } = this.state;
    items[3].label = `${data.wholesalePrice}元/${data.optionType}`;
    this.setState({
      items,
      wholesalePrice: data.wholesalePrice,
      wholesaleCount: data.wholesaleCount,
      unit: data.optionType,
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
  initData = () => {
    this.GetUploadTokenService();
    this.emitGetSpot = DeviceEventEmitter.addListener('getSpot', (data) => {
      this.getSpot(data);
    });
    this.emitGetCgyPrice = DeviceEventEmitter.addListener('getCgyPrice', (data) => {
      this.getCgyPrice(data);
    });
    this.emitGetCity = DeviceEventEmitter.addListener('getCity', (data) => {
      this.getCity(data);
    });
  }
  deleteData = () => {
    this.emitGetSpot.remove();
    this.emitGetCgyPrice.remove();
    this.emitGetCity.remove();
  }
  goPage = (index) => {
    const { items } = this.state;
    if (index === 0) {
      Global.skuType = '1';
      this.props.push({ key: items[index].page, params: { type: '2' } });
      return;
    }
    this.props.push({ key: items[index].page });
  }
  GetUploadTokenService = () => {
    GetUploadTokenService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          uptoken: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  saveData = () => {
    console.log('save');
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
