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
      leftLists: [{
        id: '1',
        label: '水果',
        cur: true,
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }],
      skuLists: [{
        id: '1',
        title: '单果重',
        items: [{
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }],
        cur: true,
      }, {
        id: '1',
        title: '单果重',
        items: [{
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }],
        cur: true,
      }, {
        id: '1',
        title: '单果重',
        items: [{
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }],
        cur: true,
      }],
      items: [],
      childItems: [],
      leftIndex: 0,
      isMaskerShow: false,
      isSkuShow: false,
      isCategoryShow: false,
      isAddressShow: false,
      ds,
      dataSource: ds.cloneWithRows([{ name: '石榴真好吃啊真好吃啊真好使' }, { name: '石榴真好吃啊真好吃啊真好使' }, { name: '石榴真好吃啊真好吃啊真好使' }, { name: '石榴真好吃啊真好吃啊真好使' }]),
      rowdata: [],
      id: null,
      pageSize: 8,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
    };
  }
  getInit = () => {
    global.storage.load({ key: 'userData' })
    .then(res => this.setState({ memberId: res.memberId }));
    this.GetAppCategoryService();
  }
  getDelInit = () => {
  }
  getData = () => {
    const { currentPage, pageSize, items, ds, refresh, dataSource } = this.state;
    this.sleek.toggle();
    GetSupplyService({
      currentPage,
      pageSize,
      type: '0',
      memberId: '1',
    }).then((res) => {
      this.sleek.toggle();
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
      this.toggleSleek();
      Toast.show(err);
    });
  }
  GetAppCategoryService = () => {
    GetAppCategoryService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const items = res.data;
        items[0].cur = true;
        this.setState({
          items: res.data,
          childItems: items[0].childs,
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
    const { isSkuShow, isVarietiesShow, isCategoryShow, isAddressShow } = this.state;
    let target = '';
    switch (index) {
      case 0:
        target = isCategoryShow;
        break;
      case 1:
        target = isVarietiesShow;
        break;
      case 2:
        target = isSkuShow;
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
      isVarietiesShow: index === 1,
      isSkuShow: index === 2,
      isAddressShow: index === 3,
      isMaskerShow: true,
    });
  }
  hideMasker = () => {
    this.setState({
      isSkuShow: false,
      isCategoryShow: false,
      isAddressShow: false,
      isMaskerShow: false,
      isVarietiesShow: false,
    });
  }
  saveMasker = () => {
    this.hideMasker();
  }
  changeLeftTab = (index) => {
    const { leftLists, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    leftLists[index].cur = true;
    leftLists[leftIndex].cur = false;
    this.setState({
      leftLists,
      leftIndex: index,
    });
  }
  goGoodDetail(item) {
    this.props.push(item);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      id: null,
    });
  }
  _reachEnd = () => {
    if (canEnd && !this.state.nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
