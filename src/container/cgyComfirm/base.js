import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Global } from '../../utils';
import { CreateSupplyService } from '../../api';

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
        label: '请选择',
        page: 'CgySpot',
      }, {
        title: '货品单价',
        label: '请输入',
        page: 'CgyPrice',
      }, {
        title: '发货地址',
        label: '请选择',
        page: 'CgyCitys',
      }, {
        title: '货品描述',
        label: '请输入',
        page: 'CgyDesc',
        last: true,
      }, {
        title: '服务方式',
        label: '请选择',
        page: 'CgyServices',
      }],
      upImg: require('../../assets/img/addAc.png'),
      upImages: [],
      isSpotGoods: '',
      endDate: '',
      startDate: '',
      wholesalePrice: '',
      wholesaleCount: '',
      unit: '',
      sendProvinceCode: '',
      sendCityCode: '',
      sendDistrictCode: '',
      memo: '',
      memberId: '',
      supplyMode: '',
      logisticsMode: '',
      renderServices: '',
    };
  }
  getData = () => {
    const { items } = this.state;
    const skus = Global.skus || [];
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
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
    console.log(upImages)
  }
  cityCgyGet = (data) => {
    const { items } = this.state;
    items[4].label = data.text;
    this.setState({
      items,
      sendProvinceCode: data.sendProvinceCode,
      sendCityCode: data.sendCityCode,
      sendDistrictCode: data.sendDistrictCode,
    });
  }
  sendCfyMemo = (memo) => {
    const { items } = this.state;
    items[5].label = memo;
    this.setState({
      items,
      memo,
    });
  }
  sendCfyService = (data) => {
    const { items } = this.state;
    items[6].label = `${data.supplyMode}${data.logisticsMode}${data.renderServices}`;
    this.setState({
      items,
      supplyMode: data.supplyMode,
      logisticsMode: data.logisticsMode,
      renderServices: data.renderServices,
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
    global.storage.load({ key: 'userData' }).then(res => this.setState({ memberId: res.memberId })).catch(() => {});
    this.emitGetSpot = DeviceEventEmitter.addListener('getSpot', (data) => {
      this.getSpot(data);
    });
    this.emitGetCgyPrice = DeviceEventEmitter.addListener('getCgyPrice', (data) => {
      this.getCgyPrice(data);
    });
    this.emitGetCity = DeviceEventEmitter.addListener('cityCgyGet', (data) => {
      this.cityCgyGet(data);
    });
    this.emitCfyMemo = DeviceEventEmitter.addListener('sendCfyMemo', (data) => {
      this.sendCfyMemo(data);
    });
    this.emitCfyService = DeviceEventEmitter.addListener('sendCfyService', (data) => {
      this.sendCfyService(data);
    });
  }
  deleteData = () => {
    this.emitGetSpot.remove();
    this.emitGetCgyPrice.remove();
    this.emitGetCity.remove();
    this.emitCfyMemo.remove();
    this.emitCfyService.remove();
  }
  goPage = (index) => {
    const { items, memo, wholesalePrice, wholesaleCount, unit } = this.state;
    if (index === 0) {
      this.props.push({ key: items[index].page, params: { type: '4' } });
      return;
    }
    if (index === 3) {
      this.props.push({ key: items[index].page,
        params: {
          wholesalePrice,
          wholesaleCount,
          unit,
        },
      });
      return;
    }
    if (index === 4) {
      this.props.push({ key: items[index].page, params: { type: 'cityCgyGet' } });
      return;
    }
    if (index === 5) {
      this.props.push({ key: items[index].page, params: { memo } });
      return;
    }
    this.props.push({ key: items[index].page });
  }
  saveData = () => {
    const {
      categoryId,
      brandId,
      isSpotGoods,
      endDate,
      startDate,
      wholesalePrice,
      wholesaleCount,
      sendProvinceCode,
      sendCityCode,
      sendDistrictCode,
      memo,
      unit,
      memberId,
      supplyMode,
      logisticsMode,
      renderServices,
      purchaseItems,
      upImages,
    } = this.state;
    if (!endDate) {
      Toast.show('请选择是否现货');
      return;
    }
    if (!wholesalePrice) {
      Toast.show('请输入货品单价');
      return;
    }
    if (!sendProvinceCode) {
      Toast.show('请选择发货地址');
      return;
    }
    if (!memo) {
      Toast.show('请输入发货描述');
      return;
    }
    if (upImages.length === 0) {
      Toast.show('请上传至少一张货品图片');
      return;
    }
    const supply = {
      memberId,
      categoryId,
      brandId,
      isSpotGoods,
      endDate,
      startDate,
      wholesalePrice,
      wholesaleCount,
      sendProvinceCode,
      sendCityCode,
      sendDistrictCode,
      memo,
      unit,
      supplyMode,
      logisticsMode,
      renderServices,
    };
    this.sleek.toggle();
    CreateSupplyService({
      supply: JSON.stringify(supply),
      supplyItems: JSON.stringify(purchaseItems),
      supplyImages: upImages.map(item => item.key).join(','),
    })
    .then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('发布成功');
        this.props.push({ key: 'ReleaseSuccess' });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  resetHome: PropTypes.func,
};
export default Base;
