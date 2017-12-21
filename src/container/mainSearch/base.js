import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetLedeCategoryService } from '../../api';

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
  GetLedeCategoryService = () => {
    GetLedeCategoryService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        res.data[0].cur = true;
        this.setState({
          items: res.data,
          childItems: res.data[0].childs,
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
    this.setState({
      items,
      childItems: items[index].childs,
      leftIndex: index,
    });
  }
  goPage = () => {
    // type 1: main 2: 发采购
    const { type } = this.props.navigation.state.params;
    switch (type) {
      case '1':
        this.props.push({ key: 'MainList' });
        break;
      case '2':
        this.props.push({ key: 'CgCategory', params: { title: '水果' } });
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
