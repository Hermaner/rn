import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeepClone, GetSupplyService, GetAppCategoryService } from '../../api';
import citysJson from '../../api/citys.json';

citysJson[0].cur = true;
citysJson[0].citys[0].cur = true;
let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      citys: DeepClone(citysJson),
      cityIndex: 0,
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
      isAddressShow: false,
      ds,
      dataSource: ds.cloneWithRows([]),
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      memberId: '',
      categoryId: '',
      hiddenTwo: false,
      firstChoose: '',
    };
  }
  getInit = () => {
    const { categoryId, hidden } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '1',
      categoryId,
      hiddenTwo: hidden,
    }, this._onRefresh);
    this.GetAppCategoryService();
  }
  getDelInit = () => {
  }
  getData = () => {
    const { memberId, currentPage, pageSize, items, ds, refresh, dataSource } = this.state;
    GetSupplyService({
      currentPage,
      pageSize,
      type: '0',
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (items.length === 0) {
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
            dataSource: ds.cloneWithRows(result),
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            dataSource: dataSource.cloneWithRows(newItems),
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  GetAppCategoryService = () => {
    const { categoryId } = this.props.navigation.state.params;
    GetAppCategoryService()
    .then((res) => {
      console.log(res);
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
    }).catch((err) => {
      Toast.show(err);
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
  selectCity = (index) => {
    this.hideMasker();
    const { citys, cityIndex } = this.state;
    console.log(citys[cityIndex].citys[index].name);
  }
  showAction = (index) => {
    const { isSpecTypesShow, isBrandsShow, isCategoryShow, isAddressShow } = this.state;
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
        target = isAddressShow;
        break;
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
      isAddressShow: index === 3,
      isMaskerShow: true,
    });
  }
  hideMasker = () => {
    this.setState({
      isSpecTypesShow: false,
      isCategoryShow: false,
      isAddressShow: false,
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
      brands: childgoods[index].brands || [],
      specTypes: childgoods[index].specTypes || [],
      goodsRightIndex: index,
    });
  }
  brandTab = (index) => {
    const { brands } = this.state;
    console.log(brands[index]);
    this.hideMasker();
  }
  specsTab = (index, i) => {
    const { specTypes } = this.state;
    console.log(specTypes[index].specs[i]);
    this.hideMasker();
  }
  goGoodDetail(item) {
    this.props.push(item);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
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
