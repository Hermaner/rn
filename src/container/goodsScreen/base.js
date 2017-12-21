import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeepClone } from '../../api';

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
      distance: 50,
      minPrice: '',
      maxPrice: '',
      count: '',
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
    console.log(111);
    callback();
  }
}

export default Base;
