import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Global } from '../../utils';

class CgCategoryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }],
      itemIndex: null,
      brandName: '',
    };
  }
  goNextWidthOut = () => {
    const { itemIndex, items } = this.state;
    const { push } = this.props;
    push({ key: 'CgSkus' });
    if (itemIndex !== null) {
      items[itemIndex].cur = false;
    }
    Global.thirdIndex = null;
    this.setState({
      items,
      itemIndex: null,
    });
  }
  goNext = (index) => {
    const { items, itemIndex } = this.state;
    const { push } = this.props;
    Global.thirdIndex = index;
    push({ key: 'CgSkus' });
    if (itemIndex === index) {
      return;
    }
    if (itemIndex !== null) {
      items[itemIndex].cur = false;
    }
    items[index].cur = true;
    this.setState({
      items,
      itemIndex: index,
    });
  }
  saveChoose = () => {
    const { push } = this.props;
    const { brandName, items } = this.state;
    if (!brandName) {
      Toast.show('请填写您的名牌名称！');
      return;
    }
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].cur) {
          items[i].cur = false;
        }
      }
    }
    items.push({
      brandId: '0',
      brandName,
      cur: true,
    });
    Global.thirdIndex = items.length - 1;
    push({ key: 'CgSkus' });
    this.ModalView.closeModal();
    this.setState({
      items,
      itemIndex: this.state.items.length - 1,
    });
  }
  saveBrandName = (brandName) => {
    this.setState({
      brandName,
    });
  }
  showInput = () => {
    this.ModalView.showModal();
  }
}

CgCategoryBase.propTypes = {
  push: PropTypes.func,
};
export default CgCategoryBase;
