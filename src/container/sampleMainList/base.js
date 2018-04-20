import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetVerifSupplyService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      specTypes: [],
      items: [],
      categoryName: '',
      brandName: '',
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      memberId: '',
      currentPage: 1,
      brandId: '', // 品牌ID
      categoryId: '', // 类目ID
      provinceCode: '', // 省
      cityCode: '', // 市
    };
  }
  getMainList = (data) => {
    this.setState({
      isEntVerif: data.EntVerif,
      isPersonVerif: data.PersonVerif,
      isSpotGoods: data.SpotGoods,
      setDistance: JSON.stringify(data.distance),
      startPrice: data.minPrice,
      endPrice: data.maxPrice,
      wholesaleCount: data.count,
      memberId: data.memberId,
    }, this._onRefresh);
  }
  getMainListName = (data) => {
    this.setState({
      name: data.name,
    }, this._onRefresh);
  }
  getInit = () => {
    this.setState({
      memberId: '',
      longitude: JSON.stringify(global.longitude),
      latitude: JSON.stringify(global.latitude),
    }, this._onRefresh);
    this.EmitCategory = DeviceEventEmitter.addListener('emitCategory', (data) => {
      this.emitCategory(data);
    });
    this.EmitBrands = DeviceEventEmitter.addListener('emitBrands', (data) => {
      this.emitBrands(data);
    });
    this.EmitMainList = DeviceEventEmitter.addListener('getMainList', (data) => {
      this.getMainList(data);
    });
    this.EmitMainListName = DeviceEventEmitter.addListener('getMainListName', (data) => {
      this.getMainListName(data);
    });
    this.EmitCitys = DeviceEventEmitter.addListener('emitCitys', (data) => {
      this.selectCity(data);
    });
  }
  getDelete = () => {
    this.EmitCategory.remove();
    this.EmitBrands.remove();
    this.EmitMainList.remove();
    this.EmitMainListName.remove();
    this.EmitCitys.remove();
  }
  getData = () => {
    const {
      currentPage,
      pageSize,
      items,
      refresh,
      categoryId,
      brandId,
      provinceCode,
      cityCode } = this.state;
    GetVerifSupplyService({
      pageSize,
      currentPage,
      categoryId,
      brandId,
      provinceCode,
      cityCode,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
            scurrentPage: currentPage + 1,
            refresh: false,
            noData: false,
            nomore: true,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            scurrentPage: currentPage + 1,
            loading: false,
          });
        }
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
            refresh: false,
          });
        }
      } else {
        this.setState({
          refresh: false,
          nomore: true,
          loading: false,
        });
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  emitCategory = (data) => {
    // console.log(data);
    const { name, categoryId } = data;
    this.setState({
      categoryName: name,
      categoryId,
    }, this._onRefresh);
  }
  emitBrands = (data) => {
    // console.log(data);
    const { brandName, brandId } = data;
    this.setState({
      brandName,
      brandId,
    }, this._onRefresh);
  }
  selectCity = (data) => {
    this.setState({
      provinceCode: data.ProvinceCode,
      cityCode: data.CityCode,
      cityName: data.CityName,
    }, this._onRefresh);
  }
  showAction = (index) => {
    const { categoryId } = this.state;
    switch (index) {
      case 0:
        this.props.push({ key: 'Categorys' });
        return;
      case 1:
        if (!categoryId) {
          Toast.show('请先选择分类！');
          return;
        }
        this.props.push({ key: 'CategorysBrands' });
        break;
      case 3:
        this.props.push({ key: 'CgCitys', params: { type: 'emitCitys' } });
        break;
      default:
    }
  }
  chatPeople = (item) => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (item.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: item.memberId,
          userName: decodeURI(item.nickName),
          imgUrl: item.imgUrl,
        },
      },
    });
  }
  hideMasker = () => {
    this.setState({
      isSpecTypesShow: false,
      isMaskerShow: false,
      isBrandsShow: false,
    });
  }
  saveMasker = () => {
    this.hideMasker();
  }
  isSampleCenter = (item) => {
    const memberId = global.memberId;
    if (!memberId) {
      this.props.push({ key: 'User' });
    } else {
      this.props.push({ key: 'SampleCenter', params: { supplyId: item.supplyId } });
    }
  }
  specsTab = (index, i) => {
    const { specTypes } = this.state;
    this.setState({
      specTypeId: specTypes[index].specs[i].specTypeId,
      specId: specTypes[index].specs[i].specId,
      specName: specTypes[index].specs[i].specName,
    }, this._onRefresh);
  }
  goGoodDetail(item) {
    this.props.push(item);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
      isFlushDistance: '1',
    }, () => this.getData());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
