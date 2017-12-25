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
    push({ key: 'CgSkus' });
    if (itemIndex === index) {
      return;
    }
    if (itemIndex !== null) {
      items[itemIndex].cur = false;
    }
    items[index].cur = true;
    Global.thirdIndex = index;
    this.setState({
      items,
      itemIndex: index,
    });
  }
}

CgCategoryBase.propTypes = {
  push: PropTypes.func,
};
export default CgCategoryBase;
