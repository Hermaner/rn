import React from 'react';
import Toast from 'react-native-simple-toast';
import { Image, ListView } from 'react-native';
import { deviceW } from '../../utils';
import { DeepClone } from '../../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
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
      certifIndex: 0,
      isCertifShow: false,
      imageViewData: [],
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
  showCertifImage = (certifIndex, imageData) => {
    const imageViewData = [];
    imageData.forEach(item => imageViewData.push({ url: item.imgUrl }));
    this.setState({
      certifIndex,
      isCertifShow: true,
      imageViewData,
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
    console.log(111);
    callback();
  }
}

export default Base;
