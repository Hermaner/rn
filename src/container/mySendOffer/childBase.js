import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { StopPurchaseService, GetQuoteService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
    };
  }
  getData = () => {
    const { currentPage, pageSize, items, ds, refresh, dataSource } = this.state;
    const { isRead } = this.props;
    this.sleek.toggle();
    GetQuoteService({
      currentPage,
      pageSize,
      isRead,
      memberId: '1',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res.data.pageData);
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
      console.log(err);
    });
  }
  pushPriceInfo = (item) => {
    const { push } = this.props;
    push({ key: 'PriceInfo', params: { items: item } });
  }
  toggleSleek = () => {
    this.setState({
      isSleekShow: !this.state.isSleekShow,
    });
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
  StopPurchaseService = (purchaseId) => {
    ActionSheet.show(
      {
        options: [
          { text: '停止采购' },
          { text: 'Cancel' },
        ],
        cancelButtonIndex: 1,
        title: '是否停止采购?',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.toggleSleek();
          StopPurchaseService({
            purchaseId,
          }).then((res) => {
            console.log(res);
            this.toggleSleek();
            if (res.isSuccess) {
              Toast.show('操作成功');
              this._onRefresh();
            } else {
              Toast.show(res.msg);
            }
          }).catch((err) => {
            this.toggleSleek();
            console.log(err);
          });
        }
      },
    );
  }
}
Base.propTypes = {
  isRead: PropTypes.string,
  push: PropTypes.func,
};
export default Base;