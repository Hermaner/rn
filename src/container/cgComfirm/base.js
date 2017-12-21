import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

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
    const { title, itemIndex, items } = this.state;
    const { push } = this.props;
    push({ key: 'CgSkus', params: { title } });
    if (itemIndex !== null) {
      items[itemIndex].cur = false;
    }
    this.setState({
      items,
      itemIndex: null,
    });
  }
  goNext = (index) => {
    const { title, items, itemIndex } = this.state;
    const { push } = this.props;
    push({ key: 'CgSkus', params: { item: items[index], title } });
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
}

CgCategoryBase.propTypes = {
  push: PropTypes.func,
};
export default CgCategoryBase;
