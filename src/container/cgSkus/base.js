import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { Global } from '../../utils';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseOne: '',
      mySpecName: '',
    };
  }
  tabView = (index, i) => {
    const { items } = this.state;
    this.setState({
      chooseOne: index,
    });
    if (i === items[index].specs.length - 1) {
      this.ModalView.showModal();
    }
    const itemIndex = items[index].itemIndex;
    items[index].specs[i].cur = true;
    if (itemIndex === i) {
      items[index].specs[i].cur = false;
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
  saveSpecName = (mySpecName) => {
    this.setState({
      mySpecName,
    });
  }
  saveChoose = () => {
    const { mySpecName, items, chooseOne } = this.state;
    if (!mySpecName) {
      Toast.show('请填写您的规格！');
      return;
    }
    for (let i = 0; i < items.length; i += 1) {
      items[chooseOne].specs[items[chooseOne].specs.length - 1].specName = mySpecName;
    }
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].cur) {
          items[i].cur = false;
        }
      }
    }
    this.ModalView.closeModal();
    this.setState({
      items,
    });
  }
  goCgComfirm = async () => {
    const { isBtnGray, items } = this.state;
    if (isBtnGray) {
      return;
    }
    for (let i = 0; i < items.length; i += 1) {
      for (let k = 0; k < items[i].specs.length; k += 1) {
        if (items[i].specs[k].cur) {
          if (items[i].specs[k].specName === '输入规格') {
            Toast.show('请填写您的规格！');
            return;
          }
        }
      }
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
      case '4':
        resetTo({ num: 3 });
        break;
      case '5':
        await resetTo({ num: 3 });
        DeviceEventEmitter.emit('getSku');
        break;
      default:
        push({ key: 'CgComfirm' });
        break;
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
  resetTo: PropTypes.func,
};
export default Base;
