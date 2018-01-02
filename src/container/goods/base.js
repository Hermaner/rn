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
        imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        id: '1',
      }, {
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        id: '1',
      }, {
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        id: '1',
      }],
      imgList: [{
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=2f9d83d7798b4710ce2ffdc4f3f5c2fd/d043ad4bd11373f0173e1469af0f4bfbfaed04c6.jpg',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=ff1c4712861001e94e3c1407883579ec/ca1349540923dd540a9ea993da09b3de9d82485f.jpg',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=b549acddf6faaf5184e381b7bc6f95ee/4034970a304e251fee98e003ac86c9177e3e53d9.jpg',
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
