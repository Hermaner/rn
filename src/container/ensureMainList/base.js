import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetAppCategoryService, GetVerifSupplyService } from '../../api';

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
      secondshow: false,
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
    this.state = null;
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
  selectCity = (data) => {
    this.setState({
      provinceCode: data.ProvinceCode,
      cityCode: data.CityCode,
      cityName: data.CityName,
    }, this._onRefresh);
  }
  showAction = (index) => {
    const { isSpecTypesShow, isBrandsShow, isCategoryShow, secondshow } = this.state;
    let target = '';
    switch (index) {
      case 0:
        target = isCategoryShow;
        break;
      case 1:
        if (!secondshow) {
          Toast.show('请先选择分类！');
          return;
        }
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
      secondshow: true,
      brands: childgoods[index].brands || [],
      specTypes: childgoods[index].specTypes || [],
      goodsRightIndex: index,
      firstName: childgoods[index].name,
      categoryId: childgoods[index].categoryId,
    }, this._onRefresh);
  }
  brandTab = (index) => {
    const { brands } = this.state;
    this.setState({
      brandId: brands[index].brandId,
      brandName: brands[index].brandName,
    }, this._onRefresh);
    this.hideMasker();
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
