import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetAppCategoryService } from '../../api';
import { Global } from '../../utils';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftIndex: 0,
      items: [],
      childItems: [],
    };
  }
  onSearchChange = (searchVal) => {
    this.setState({
      searchVal,
    });
  }
  GetAppCategoryService = () => {
    GetAppCategoryService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const items = res.data;
        items[0].cur = true;
        Global.items = items;
        Global.firstIndex = 0;
        this.setState({
          items: res.data,
          childItems: items[0].childs,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  changeLeftTab = (index) => {
    const { items, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    items[index].cur = true;
    items[leftIndex].cur = false;
    Global.firstIndex = index;
    this.setState({
      items,
      childItems: items[index].childs,
      leftIndex: index,
    });
  }
  goPage = (index) => {
    // type 1: main 2: 发采购 3: 发供应
    const { type } = this.props.navigation.state.params;
    switch (type) {
      case '1':
        this.props.push({ key: 'MainList' });
        break;
      case '2':
        Global.skuType = '0';
        Global.secondIndex = index;
        this.props.push({ key: 'CgCategory' });
        break;
      case '3': // 供应默认进入
        Global.skuType = '3';
        Global.secondIndex = index;
        this.props.push({ key: 'CgCategory' });
        break;
      case '4': // 供应再次进入
        Global.skuType = '4';
        Global.secondIndex = index;
        this.props.push({ key: 'CgCategory' });
        break;
      default:
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
