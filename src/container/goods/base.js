import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeepClone } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
      items: [{
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
        id: '1',
      }, {
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
        id: '1',
      }, {
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
        id: '1',
      }],
      imgList: [{
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }, {
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }, {
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }, {
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }],
      distance: 50,
      minPrice: '',
      maxPrice: '',
      count: '',
      skuCount: 1,
    };
  }
  onChangeText = (txt, index) => {
    switch (index) {
      case 0:
        this.setState({
          minPrice: txt,
        });
        break;
      case 1:
        this.setState({
          maxPrice: txt,
        });
        break;
      case 2:
        this.setState({
          count: txt,
        });
        break;
      default:
    }
  }
  resetState = () => {
    this.setState({
      ...DeepClone(this.resetData),
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

export default Base;
