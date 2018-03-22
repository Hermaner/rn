import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetHistoryOrderList } from '../../api';

let canEnd = false;
class PurchaseHomebase extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
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
  getData = () => {
    const { id, pageSize, rowdata, ds, refresh, dataSource } = this.state;
    GetHistoryOrderList({
      id,
      pageSize,
    }).then((lists) => {
      if (lists.data.is_success) {
        const result = lists.data.result;
        if (result.length === 0 && rowdata.length === 0) {
          this.setState({
            noData: true,
          });
          return;
        }
        if (refresh) {
          this.setState({
            rowdata: result,
            dataSource: ds.cloneWithRows(result),
            id: result[result.length - 1].orderID,
            refresh: false,
            nomore: false,
          });
        } else {
          if (result.length === 0) {
            this.setState({
              nomore: true,
              loading: false,
            });
            return;
          }
          const newresult = rowdata.concat(result);
          this.setState({
            rowdata: newresult,
            dataSource: dataSource.cloneWithRows(newresult),
            id: result[result.length - 1].orderID,
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
    });
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
  selectCity = (index) => {
    this.hideMasker();
    console.log(index);
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
    this.props.push()
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

export default PurchaseHomebase;
