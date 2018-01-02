import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { GetPurchaseService, StopPurchaseService } from '../../api';

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
      memberId: '',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    const { currentPage, pageSize, items, ds, refresh, dataSource, memberId } = this.state;
    const { type } = this.props;
    console.log('rrrrrrrrr', memberId);
    GetPurchaseService({
      currentPage,
      pageSize,
      type,
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
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
      this.sleek.toggle();
      Toast.show(err);
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
  pushSeePrice = (value) => {
    const { push } = this.props;
    if (value.length === 0) {
      Toast.show('当前没有人报价');
      return;
    }
    push({ key: 'SeePrice' });
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
          this.sleek.toggle();
          StopPurchaseService({
            purchaseId,
          }).then((res) => {
            console.log(res);
            this.sleek.toggle();
            if (res.isSuccess) {
              Toast.show('操作成功');
              this._onRefresh();
            } else {
              Toast.show(res.msg);
            }
          }).catch((err) => {
            this.sleek.toggle();
            Toast.show(err);
          });
        }
      },
    );
  }
}
Base.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func,
};

export default Base;
