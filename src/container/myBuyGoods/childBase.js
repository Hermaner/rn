import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UpdateOrderService, GetMemberBuyOrderService, DeleteOrderService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      memberId: '',
      currentPage: 1,
      pageSize: '5',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      items: [],
      tu: require('../../assets/img/no.png'),
      myStatus: '',
    };
  }
  getMainListBuyGoods = () => {
    this._onRefresh();
  }
  getBuyGoodsGoThink = () => {
    this._onRefresh();
  }
  getInit = () => {
    this._onRefresh();
    this.EmitMainListBuyGoods = DeviceEventEmitter.addListener('getMainListBuyGoods', (data) => {
      this.getMainListBuyGoods(data);
    });
    this.EmitBuyGoodsGoThink = DeviceEventEmitter.addListener('getBuyGoodsGoThink', (data) => {
      this.getBuyGoodsGoThink(data);
    });
  }
  getDelete = () => {
    this.EmitMainListBuyGoods.remove();
    this.EmitBuyGoodsGoThink.remove();
  }
  getData = () => {
    const { currentPage, pageSize, items, refresh } = this.state;
    const { status } = this.props;
    GetMemberBuyOrderService({
      currentPage,
      pageSize,
      status,
      memberId: global.memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data.pageData;
        result.forEach((item) => {
          const statusName =
          item.status === '1' ? '待修改' :
          item.status === '2' ? '待确认' :
          item.status === '3' ? '待支付' :
          item.status === '4' ? '待发货' :
          item.status === '5' ? '待收货' :
          item.status === '6' ? '退款中' :
          item.status === '7' ? '已收货' :
          item.status === '8' ? '订单取消' :
          item.status === '9' ? '已退款' : '订单完成';
          item.statusName = statusName;
        });
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
  removeOrder = (supplyInfo) => {
    Alert.alert(
      '温馨提示', '确认取消订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            UpdateOrderService({
              memberId: global.memberId,
              orderId: supplyInfo.orderId,
              status: '8',
            }).then((res) => {
              this.sleek.toggle();
              if (res.isSuccess) {
                const result = res.data;
                this.setState({
                  myStatus: result.status,
                  removeInfo: result,
                }, this.getInit);
                DeviceEventEmitter.emit('getBuyGoodsCount');
                DeviceEventEmitter.emit('getMainListBuyGoods');
                DeviceEventEmitter.emit('emitUser');
              } else {
                Toast.show(res.msg);
              }
            }).catch(() => {
              this.sleek.toggle();
            });
          } },
      ],
    );
  }
  deleteOrder = (orderId) => {
    Alert.alert(
      '温馨提示', '确认删除订单？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            DeleteOrderService({
              memberId: global.memberId,
              orderId,
            }).then((res) => {
              this.sleek.toggle();
              if (res.isSuccess) {
                Toast.show('订单已删除！');
                this.getInit();
                DeviceEventEmitter.emit('getBuyGoodsCount');
                DeviceEventEmitter.emit('emitUser');
              } else {
                Toast.show(res.msg);
              }
            }).catch(() => {
              this.sleek.toggle();
            });
          } },
      ],
    );
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
  status: PropTypes.string,
};
export default Base;
