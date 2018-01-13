import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetSupplyInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
      detail: null,
      items: [{
        title: '支持在线交易',
        id: '1',
        cur: false,
      }, {
        title: '完成企业认证',
        id: '2',
        cur: false,
      }, {
        title: '完成个人认证',
        id: '3',
        cur: false,
      }, {
        title: '现货供应',
        id: '4',
        cur: false,
      }],
      images: [
        {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        },
        {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        },
      ],
      otherItems: [
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
      ],
      distance: 50,
      minPrice: '',
      maxPrice: '',
      count: '',
      skuCount: 1,
      memberId: '',
    };
  }
  getInit = () => {
    const { supplyId } = this.props.navigation.state.params;
    this.setState({
      supplyId,
      memberId: global.memberId,
    }, this.GetSupplyInfoService);
    console.log('@@@@@@@', this.state.supplyId);
  }
  GetSupplyInfoService = () => {
    const { supplyId, memberId } = this.state;
    this.sleek.toggle();
    GetSupplyInfoService({
      supplyId,
      memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          detail: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
  changeItem = (index) => {
    const { items } = this.state;
    items[index].cur = !items[index].cur;
    this.setState({
      items,
    });
  }
  save = (callback) => {
    callback();
  }
  InputNumberChange(skuCount) {
    this.setState({
      skuCount,
    });
  }
  openBuyMasker = () => {
    this.ModalView.showModal();
  }
  saveBuyMasker = () => {
    this.ModalView.showModal();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
