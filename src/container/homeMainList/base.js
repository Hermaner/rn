import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetAppCategoryService, GetSupplyByFiltersService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
      goodsLeftIndex: 0,
      goodsRightIndex: null,
      brands: [],
      specTypes: [],
      items: [],
      leftIndex: 0,
      isMaskerShow: false,
      isSpecTypesShow: false,
      isCategoryShow: false,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      memberId: '',
      name: '', // 供应单名称（搜索）
      isSpotGoods: '', // 是否现货
      categoryId: '', // 类目ID
      brandId: '', // 品牌ID
      provinceCode: '', // 省
      cityCode: '', // 市
      isEntVerif: '', // 是否企业认证 1y 2 n
      isPersonVerif: '', // 是否个人认证 1y 2n
      wholesaleCount: '', // 起订量
      startPrice: '', // 开始价格
      endPrice: '', // 结束价格
      specTypeId: '', // 规格种类ID
      specId: '', // 规格ID
      longitude: '', // 经度
      latitude: '', // 纬度
      isFlushDistance: '', // 是否刷新（1是0否)
      currentPage: 1,
      setDistance: '', // 距离
      cityName: '', // 城市名称
      childgoodsName: '',
      specs: '',
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
    const { categoryId } = this.props.navigation.state.params;
    this.setState({
      memberId: '',
      categoryId,
      longitude: JSON.stringify(global.longitude),
      latitude: JSON.stringify(global.latitude),
    }, this._onRefresh);
    this.EmitMainList = DeviceEventEmitter.addListener('getMainList', (data) => {
      this.getMainList(data);
    });
    this.EmitMainListName = DeviceEventEmitter.addListener('getMainListName', (data) => {
      this.getMainListName(data);
    });
    this.emitCitys = DeviceEventEmitter.addListener('emitCitys', (data) => {
      this.selectCity(data);
    });
    this.GetAppCategoryService();
  }
  getDelete = () => {
    this.EmitMainList.remove();
    this.EmitMainListName.remove();
    this.emitCitys.remove();
  }
  getData = () => {
    const {
      memberId,
      currentPage,
      pageSize,
      items,
      refresh,
      name,
      isSpotGoods,
      categoryId,
      brandId,
      provinceCode,
      cityCode,
      isEntVerif,
      isPersonVerif,
      wholesaleCount,
      startPrice,
      endPrice,
      // specTypeId,
      // specId,
      longitude,
      latitude,
      isFlushDistance,
      setDistance,
      specs,
    } = this.state;

    const filters = {
      memberId,
      name,
      isSpotGoods,
      categoryId,
      brandId,
      provinceCode,
      cityCode,
      isEntVerif,
      isPersonVerif,
      wholesaleCount,
      startPrice,
      endPrice,
      // specTypeId,
      // specId,
      longitude,
      latitude,
      isFlushDistance,
      currentPage: JSON.stringify(currentPage),
      pageSize,
      setDistance,
    };
    GetSupplyByFiltersService({
      filters: JSON.stringify(filters),
      specs,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
              refresh: false,
              loading: false,
            });
          } else {
            this.setState({
              nomore: true,
              refresh: false,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
            currentPage: currentPage + 1,
            refresh: false,
            noData: false,
            nomore: false,
            isFlushDistance: '0',
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
            noData: false,
            isFlushDistance: '0',
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  selectCity = (data) => {
    this.setState({
      provinceCode: data.ProvinceCode,
      cityCode: data.CityCode,
      cityName: data.CityName,
    }, this._onRefresh);
  }
  GetAppCategoryService = () => {
    const { categoryId } = this.props.navigation.state.params;
    GetAppCategoryService()
    .then((res) => {
      if (res.isSuccess) {
        const goods = res.data;
        for (let i = 0; i < goods.length; i += 1) {
          if (goods[i].categoryId === categoryId) {
            goods[i].cur = true;
            this.setState({
              firstChoose: i,
            });
          }
        }
        this.setState({
          goodsLeftIndex: this.state.firstChoose,
          goods: res.data,
          childgoods: goods[this.state.firstChoose].childs,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  changeCityTab = (index) => {
    const { citys, cityIndex } = this.state;
    if (cityIndex === index) {
      return;
    }
    citys[index].cur = true;
    citys[cityIndex].cur = false;
    this.setState({
      citys,
      cityIndex: index,
    });
  }
  showAction = (index) => {
    const { isSpecTypesShow, isBrandsShow, isCategoryShow } = this.state;
    let target = '';
    switch (index) {
      case 0:
        target = isCategoryShow;
        break;
      case 1:
        target = isBrandsShow;
        break;
      case 2:
        target = isSpecTypesShow;
        break;
      case 3:
        this.props.push({ key: 'CgCitys', params: { type: 'emitCitys' } });
        return;
      default:
    }
    if (target) {
      this.hideMasker();
      return;
    }
    this.setState({
      isCategoryShow: index === 0,
      isBrandsShow: index === 1,
      isSpecTypesShow: index === 2,
      isMaskerShow: true,
    });
  }
  hideMasker = () => {
    this.setState({
      isSpecTypesShow: false,
      isCategoryShow: false,
      isMaskerShow: false,
      isBrandsShow: false,
    });
  }
  saveMasker = () => {
    this.hideMasker();
  }
  changeLeftGoods = (index) => {
    const { goods, goodsLeftIndex } = this.state;
    if (goodsLeftIndex === index) {
      return;
    }
    goods[index].cur = true;
    goods[goodsLeftIndex].cur = false;
    this.setState({
      goods,
      childgoods: goods[index].childs,
      goodsLeftIndex: index,
    });
  }
  changeRightGoods = (index) => {
    const { childgoods, goodsRightIndex } = this.state;
    this.hideMasker();
    if (goodsRightIndex === index) {
      return;
    }
    childgoods[index].cur = true;
    if (goodsRightIndex !== null) {
      childgoods[goodsRightIndex].cur = false;
    }
    this.setState({
      childgoods,
      childgoodsName: childgoods[index].name,
      brands: childgoods[index].brands || [],
      specTypes: childgoods[index].specTypes || [],
      goodsRightIndex: index,
      categoryId: childgoods[index].categoryId,
    }, this._onRefresh);
  }
  brandTab = (index) => {
    const { brands } = this.state;
    this.setState({
      brandId: brands[index].brandId,
    }, this._onRefresh);
    this.hideMasker();
  }
  specsTab = (index, i) => {
    const { specTypes } = this.state;
    this.setState({
      specTypeId: specTypes[index].specs[i].specTypeId,
      specId: specTypes[index].specs[i].specId,
    }, this._onRefresh);
    this.hideMasker();
  }
  goGoodDetail(item) {
    this.props.push(item);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
      item: [],
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
  navigation: PropTypes.object,
};
export default Base;
