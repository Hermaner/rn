import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetSupplyService, GetPurchaseService } from '../../api';

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
      items: [{
        id: '1',
        title: '所在地',
        last: false,
        label: '',
        isIcn: false,
      }, {
        id: '1',
        title: '注册时间',
        last: false,
        label: '2017-12-3',
        isIcn: false,
      }, {
        id: '1',
        title: '备注',
        last: false,
        label: '',
        isIcn: true,
      }],
      list: [{
        id: '1',
        title: '买家保障',
        label: '您尚未缴纳诚信保证金并承诺提供买家保障服务',
        labelTitle: '了解详情',
        isHave: true,
      }, {
        id: '1',
        title: '实名认证',
        label: '您尚未通过实名认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '企业认证',
        label: '您尚未通过企业认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '实地认证',
        label: '您尚未通过实地考察认证',
        labelTitle: '申请认证',
        isHave: true,
      }],
      isHidden: false,
      supplyGoodsList: [],
      releaseGoodsList: [],
      type: 0, // 0采购中，1已停止，2已驳回
      refresh: false, // 是否是刷新
      currentPage: 1,
      pageSize: '5',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' });
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
    this.ModalView.showModal();
  }
  listPush = (index) => {
    const { push } = this.props;
    switch (index) {
      case 0:
        push();
        break;
      case 1:
        push({ key: 'IndividualAuthentication' });
        break;
      case 2:
        push({ key: 'CollectiveAuthentication' });
        break;
      case 3:
        push({ key: 'EnlistBusiness' });
        break;
      default:
    }
    this.ModalView.closeModal();
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
};
export default Base;
