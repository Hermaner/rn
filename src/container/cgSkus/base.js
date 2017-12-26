import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { Global } from '../../utils';

class CgSkusBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    if (Global.skuType === '3') {
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
  goCgComfirm = () => {
    const { isBtnGray } = this.state;
    if (isBtnGray) {
      return;
    }
    Global.skus = Global.items[Global.firstIndex].childs[Global.secondIndex].specTypes;
    const { push, resetTo, pop } = this.props;
    switch (Global.skuType) {
      case '0':
        push({ key: 'CgComfirm' });
        break;
      case '1':
        resetTo({ num: 3 });
        break;
      case '2':
        DeviceEventEmitter.emit('getSku');
        pop();
        break;
      case '3':
        push({ key: 'CgyComfirm' });
        break;
      default:
        push({ key: 'CgComfirm' });
        break;
    }
  }
}
CgSkusBase.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
  resetTo: PropTypes.func,
};
export default CgSkusBase;
