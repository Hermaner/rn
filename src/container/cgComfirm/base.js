import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { UserSocket } from '../../components';
import { Global } from '../../utils';
import { CreatePurchaseService, JudgeMemberIsPersonVerif } from '../../api';

@observer
class Base extends React.Component {
  constructor(props) {
    super(props);
    const { categoryId, name } = this.props.navigation.state.params;
    this.state = {
      items: [{
        id: '1',
        title: '采购货品',
        must: true,
        last: true,
        label: name,
        page: 'MainSearch',
      }, {
        id: '1',
        title: '需求量',
        must: true,
        last: false,
        label: '请选择',
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
      memberId: '',
      categoryId,
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
      selectShow: false,
      isCan: '2',
    };
  }
  getData = () => {
    JudgeMemberIsPersonVerif({
      memberId: global.memberId,
      type: '2',
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          isCan: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  getDemand = (data) => {
    const { items } = this.state;
    items[1].label = `${data.demand}${data.optionType}`;
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
    items[2].label = data.text;
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
  closeModal = () => {
    this.setState({
      selectShow: false,
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
      memberId: UserSocket.userData.memberId,
      phone: UserSocket.userData.phone,
    });
    this.getData();
    this.emitGetDemand = DeviceEventEmitter.addListener('getDemand', (data) => {
      this.getDemand(data);
    });
    this.emitGetCity = DeviceEventEmitter.addListener('getCity', (data) => {
      console.log(data)
      this.getCity(data);
    });
    this.emitGetACity = DeviceEventEmitter.addListener('getACity', (data) => {
      this.getACity(data);
    });
  }
  deleteData = () => {
    this.emitGetDemand.remove();
    this.emitGetCity.remove();
    this.emitGetACity.remove();
    this.state = null;
  }
  goPage = (index, type) => {
    const { items, items2, demand, unit, wantStarPrice, wantEndPrice, frequency } = this.state;
    switch (index) {
      case 0:
        if (type === 'cga') {
          this.setState({
            selectShow: true,
          });
          return;
        }
        Global.skuType = '1';
        this.props.pop();
        return;
      case 1:
        if (type === 'cga') {
          this.props.push({ key: items2[index].page, params: { type: 'getACity' } });
          return;
        }
        Global.skuType = '2';
        break;
      case 2:
        this.props.push({ key: items[index].page, params: { type: 'getCity' } });
        return;
      default:
        break;
    }
    this.props.push({ key: items[index].page,
      params: { demand, unit, wantStarPrice, wantEndPrice, frequencyLabel: frequency } });
  }
  selectModel = (optionType) => {
    const { items2, options } = this.state;
    options.forEach((item) => {
      if (item.value === optionType) {
        items2[0].label = item.label;
      }
    });
    this.setState({
      selectShow: false,
      items2,
      optionType,
    });
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
      isCan,
      upImages,
    } = this.state;
    const telReg = !(phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
    if (isCan === '0') {
      Toast.show('您还未实名认证，不能再发采购信息');
      return;
    }
    if (telReg) {
      Toast.show('手机号格式不对');
      return;
    }
    if (!demand) {
      Toast.show('请输入需求量');
      return;
    }
    if (unit === '点击选择单位') {
      Toast.show('请选择需求量单位！');
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
    this.sleek.toggle();
    CreatePurchaseService({
      purchase: JSON.stringify(purchase),
      purchaseItems: JSON.stringify(purchaseItems),
      purchaseImages: upImages.map(item => item.key).join(','),
      isRepeat: '1',
    })
    .then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        if (res.map.isHave === '1') {
          Alert.alert(
            '温馨提示', '是否继续发送？',
            [
              { text: '取消' },
              { text: '确认',
                onPress: () => {
                  CreatePurchaseService({
                    purchase: JSON.stringify(purchase),
                    purchaseItems: JSON.stringify(purchaseItems),
                    purchaseImages: upImages.map(item => item.key).join(','),
                    isRepeat: '1',
                  })
                  .then((res2) => {
                    // console.log(res2);
                    this.sleek.toggle();
                    if (res2.isSuccess) {
                      Toast.show('发布成功');
                      this.props.resetHome();
                    } else {
                      Toast.show(res2.msg);
                    }
                  }).catch(() => {
                    this.sleek.toggle();
                  });
                } },
            ],
          );
        }
        Toast.show('发布成功');
        this.props.resetHome();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}

Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
  resetHome: PropTypes.func,
  pop: PropTypes.func,
};
export default Base;
