import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetAppCategoryService, FilterPurchaseService } from '../../api';

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
      currentPage: 1,
      categoryId: '',
      provinceCode: '',
      childgoodsName: '',
      citysName: '',
    };
  }
  getReleaseMainListName = (data) => {
    this.setState({
      name: data.name,
      categoryId: data.categoryId,
      firstName: data.firstName,
    }, this._onRefresh);
  }
  getInit = () => {
    this.hideMasker();
    if (!this.props.navigation.state.params) {
      this.setState({
        memberId: '',
      }, this._onRefresh);
    } else {
      const { name } = this.props.navigation.state.params;
      this.setState({
        memberId: '',
        name,
      }, this._onRefresh);
    }
    this.EmitReleaseMainListName = DeviceEventEmitter.addListener('getReleaseMainListName', (data) => {
      this.hideMasker();
      this.getReleaseMainListName(data);
    });
    this.emitCitys = DeviceEventEmitter.addListener('emitCitys', (data) => {
      this.hideMasker();
      this.selectCity(data);
    });
    this.GetAppCategoryService();
  }
  getDelete = () => {
    this.EmitReleaseMainListName.remove();
    this.emitCitys.remove();
  }
  getData = () => {
    const {
      name,
      categoryId,
      provinceCode,
      items,
      refresh,
      currentPage,
      pageSize } = this.state;
    FilterPurchaseService({
      name,
      categoryId,
      provinceCode,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        const result = res.data;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              refresh: false,
              loading: false,
              items: result,
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
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
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
  GetAppCategoryService = () => {
    GetAppCategoryService()
    .then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const goods = res.data;
        goods[0].cur = true;
        this.setState({
          goodsLeftIndex: 0,
          goods: res.data,
          childgoods: goods[0].childs,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
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
  selectCity = (data) => {
    this.setState({
      provinceCode: data.ProvinceCode,
      cityCode: data.CityCode,
      cityName: data.CityName,
    }, this._onRefresh);
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
    const { goods, goodsLeftIndex, goodsRightIndex } = this.state;
    if (goodsLeftIndex === index) {
      return;
    }
    if (goodsLeftIndex !== index) {
      if (goodsRightIndex !== null) {
        goods[parseFloat(goodsLeftIndex)].childs[goodsRightIndex].cur = false;
        this.setState({
          goodsRightIndex: null,
        });
      }
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
      name: '',
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
    const itemIndex = specTypes[index].itemIndex;
    specTypes[index].specs[i].cur = true;
    if (itemIndex === i) {
      return;
    }
    if (itemIndex !== undefined) {
      specTypes[index].specs[itemIndex].cur = false;
    }
    specTypes[index].specs[i].cur = true;
    specTypes[index].itemIndex = i;
    this.setState({
      specTypes,
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
