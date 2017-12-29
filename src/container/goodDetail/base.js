import React from 'react';
import Toast from 'react-native-simple-toast';
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
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        },
        {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
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
    };
  }
  getInit = () => {
    this.GetSupplyInfoService();
  }
  GetSupplyInfoService = () => {
    const { supplyId } = this.state;
    this.sleek.toggle();
    GetSupplyInfoService({
      supplyId,
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

export default Base;
