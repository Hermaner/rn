import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { UpdateSupplyService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        title: '货品名称',
        label: '水果',
        page: '',
      }, {
        title: '货品规格',
        label: '水果',
        page: 'CgxSkus',
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
      supplyId: '',
      memberId: '',
      supplyMode: '',
      initImages: null,
      logisticsMode: '',
      renderServices: '',
    };
  }
  getData = () => {
    const { item } = this.props.navigation.state.params;
    const { items } = this.state;
    console.log(item)
    items[0].label = `${item.categoryName}${item.brandName}`;
    const skuString = [];
    const purchaseItems = [];
    item.supplyItems.forEach((list) => {
      skuString.push(list.specName);
      purchaseItems.push({
        specTypeId: list.specTypeId.toString(),
        specId: list.specId.toString(),
      });
    });
    items[1].label = skuString.length > 0 ? skuString.join('') : '不限';
    items[2].label = `${item.startDate ? item.startDate.substr(0, 10) : ''}${item.startDate ? '-' : ''}${item.endDate.substr(0, 10)}(${item.isSpotGoods === 1 ? '现货' : '预售'})`;
    items[3].label = item.wholesalePrice ? `${item.wholesalePrice}元/${item.unit}` : '请选择';
    items[4].label = `${item.sendProvinceName}${item.sendCityName}${item.sendDistrictName}`;
    items[5].label = `${item.memo}`;
    items[6].label = `${item.supplyMode}${item.logisticsMode}${item.renderServices}`;
    this.setState({
      supplyId: item.supplyId.toString(),
      purchaseItems,
      initImages: item.supplyImages.map(sig => sig.imgUrl),
      categoryId: item.categoryId.toString(),
      brandId: item.categoryId.toString(),
      isSpotGoods: item.isSpotGoods.toString(),
      endDate: item.endDate,
      startDate: item.startDate,
      wholesalePrice: item.wholesalePrice ? item.wholesalePrice.toString() : '',
      wholesaleCount: item.wholesaleCount,
      unit: item.unit,
      sendProvinceCode: item.sendProvinceCode,
      sendCityCode: item.sendCityCode,
      sendDistrictCode: item.sendDistrictCode,
      memo: item.memo,
      supplyMode: item.supplyMode,
      logisticsMode: item.logisticsMode,
      renderServices: item.renderServices,
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
    console.log(upImages);
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
  backToList = () => {
    Alert.alert(
      '温馨提示',
      '是否退出修改？',
      [
        { text: '继续退出', onPress: this.props.pop },
        { text: '取消' },
      ],
    );
  }
  initData = () => {
    this.setState({ memberId: global.memberId });
    this.emitgetCgyxSku = DeviceEventEmitter.addListener('getCgyxSku', (data) => {
      this.getCgyxSku(data);
    });
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
    this.emitgetCgyxSku.remove();
    this.emitGetSpot.remove();
    this.emitGetCgyPrice.remove();
    this.emitGetCity.remove();
    this.emitCfyMemo.remove();
    this.emitCfyService.remove();
  }
  goPage = (index) => {
    const { items, memo, wholesalePrice, wholesaleCount, unit, categoryId } = this.state;
    if (index === 0) {
      return;
    }
    if (index === 1) {
      this.props.push({ key: items[index].page, params: { categoryId } });
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
      supplyId,
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
      supplyId,
      renderServices,
    };
    console.log(supply);
    this.sleek.toggle();
    console.log(upImages.map(item => item.key).join(','))
    UpdateSupplyService({
      supply: JSON.stringify(supply),
      supplyItems: JSON.stringify(purchaseItems),
      supplyImages: upImages.map(item => item.key).join(','),
    })
    .then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('修改成功');
        DeviceEventEmitter.emit('supplyRefresh');
        this.props.pop();
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
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
