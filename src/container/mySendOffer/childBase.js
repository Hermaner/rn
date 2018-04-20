import React from 'react';
import Toast from 'react-native-simple-toast';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { StopPurchaseService, GetQuoteService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      memberId: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const { currentPage, pageSize, items, refresh, memberId } = this.state;
    const { isRead } = this.props;
    GetQuoteService({
      currentPage,
      pageSize,
      isRead,
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res.data.pageData);
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
  pushPriceInfo = (item) => {
    const { push } = this.props;
    if (item.purchase === null) {
      Toast.show('该供应单已被删除');
      return;
    }
    push({ key: 'PriceInfo', params: { items: item } });
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
  chatPeople = (item) => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (item.purchase.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: item.purchase.memberId,
          userName: decodeURI(item.purchase.nickName),
          imgUrl: item.purchase.imgUrl,
        },
      },
    });
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
            // console.log(res);
            this.sleek.toggle();
            if (res.isSuccess) {
              Toast.show('操作成功');
              this._onRefresh();
            } else {
              Toast.show(res.msg);
            }
          }).catch(() => {
            this.sleek.toggle();
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
