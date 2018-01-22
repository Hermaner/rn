import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetSpecService } from '../../api';
import { Global } from '../../utils';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categoryId: '',
      isBtnGray: true,
    };
  }
  GetSpecService = () => {
    const { categoryId } = this.props.navigation.state.params;
    this.sleek.toggle();
    GetSpecService({
      categoryId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          items: res.data,
        });
      } else {
        global.Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      global.console.log(err);
    });
  }
  tabView = (index, i) => {
    const { items } = this.state;
    const itemIndex = items[index].itemIndex;
    items[index].specs[i].cur = true;
    if (itemIndex === i) {
      return;
    }
    if (itemIndex !== undefined) {
      items[index].specs[itemIndex].cur = false;
    }
    items[index].specs[i].cur = true;
    items[index].itemIndex = i;
    let isBtnGray = false;
    if (Global.skuType === '3' || Global.skuType === '4') {
      items.forEach((item) => {
        if (item.itemIndex === undefined) {
          isBtnGray = true;
        }
      });
    }
    this.setState({
      items,
      isBtnGray,
    });
  }
  saveSkus = () => {
    const { isBtnGray, items } = this.state;
    if (isBtnGray) {
      return;
    }
    DeviceEventEmitter.emit('getCgyxSku', items);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
