import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetAppCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
      childgoods: [],
      leftIndex: 0,
    };
  }
  getInit = () => {
    this.GetAppCategoryService();
  }
  GetAppCategoryService = () => {
    GetAppCategoryService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const goods = res.data;
        goods[0].cur = true;
        this.setState({
          leftIndex: 0,
          goods: res.data,
          childgoods: goods[0].childs,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  leftTab = (index) => {
    const { goods, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    goods[index].cur = true;
    goods[leftIndex].cur = false;
    this.setState({
      goods,
      childgoods: goods[index].childs,
      leftIndex: index,
    });
  }
  rightTab = (index) => {
    const { childgoods } = this.state;
    global.brands = childgoods[index].brands;
    DeviceEventEmitter.emit('emitCategory', childgoods[index]);
    this.props.pop();
  }
}
Base.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
};
export default Base;
