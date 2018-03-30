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
      secondShow: false,
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
      cityName: '', // 地区名称
      specName: '', // 规格1
      brandName: '', // 品牌名
      firstName: '', // 一级类目名
      whoOneIndex: '',
      whoOneI: '',
      specs: '',
      thirdShow: false,
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
      categoryId: data.categoryId,
      secondShow: data.categoryId || true,
      firstName: data.firstName,
    }, this._onRefresh);
  }
  getInit = () => {
    if (!this.props.navigation.state.params) {
      this.setState({
        memberId: '',
        longitude: JSON.stringify(global.longitude),
        latitude: JSON.stringify(global.latitude),
      }, this._onRefresh);
    } else {
      const { name, categoryId, firstName } = this.props.navigation.state.params;
      this.setState({
        memberId: '',
        name,
        secondShow: categoryId || true,
        categoryId,
        firstName,
        longitude: JSON.stringify(global.longitude),
        latitude: JSON.stringify(global.latitude),
      }, this._onRefresh);
    }
    this.EmitMainList = DeviceEventEmitter.addListener('getMainList', (data) => {
      this.hideMasker();
      this.getMainList(data);
    });
    this.EmitMainListName = DeviceEventEmitter.addListener('getMainListName', (data) => {
      this.hideMasker();
      this.getMainListName(data);
    });
    this.emitCitys = DeviceEventEmitter.addListener('emitCitys', (data) => {
      this.hideMasker();
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
        console.log(res);
        if (JSON.stringify(res.map) !== '{}') {
          this.setState({
            firstName: res.map.category.name,
          });
        }
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
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
            noData: false,
            isFlushDistance: '0',
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
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
  GetAppCategoryService = () => {
    GetAppCategoryService()
    .then((res) => {
      console.log(res);
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
    }).catch((err) => {
      console.log(err);
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
    const { isSpecTypesShow, isBrandsShow, isCategoryShow, secondShow } = this.state;
    let target = '';
    switch (index) {
      case 0:
        target = isCategoryShow;
        break;
      case 1:
        if (!secondShow) {
          Toast.show('请先选择分类！');
          return;
        }
        target = isBrandsShow;
        break;
      case 2:
        if (!secondShow) {
          Toast.show('请先选择品牌！');
          return;
        }
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
      secondShow: true,
      brands: childgoods[index].brands || [],
      specTypes: childgoods[index].specTypes || [],
      goodsRightIndex: index,
      firstName: childgoods[index].name,
      categoryId: childgoods[index].categoryId,
    }, this._onRefresh);
  }
  brandTab = (index) => {
    const { brands } = this.state;
    console.log(brands[index]);
    this.setState({
      thirdShow: true,
      brandId: brands[index].brandId,
      brandName: brands[index].brandName,
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
    const array = [];
    for (let k = 0; k < specTypes.length; k += 1) {
      for (let j = 0; j < specTypes[k].specs.length; j += 1) {
        if (specTypes[k].specs[j].cur) {
          array.push({
            specTypeId: specTypes[k].specTypeId,
            specId: specTypes[k].specs[j].specId,
          });
          this.setState({
            specs: JSON.stringify(array),
          });
        }
      }
    }
    this.setState({
      specTypes,
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
  navigation: PropTypes.object,
};
export default Base;
