import React from 'react';
import Toast from 'react-native-simple-toast';
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
    this.setState({
      items,
    });
  }
  goCgComfirm = () => {
    Global.skus = Global.items[Global.firstIndex].childs[Global.secondIndex].specTypes;
    const { push } = this.props;
    push({ key: 'CgComfirm' });
  }
}
CgSkusBase.propTypes = {
  push: PropTypes.func,
};
export default CgSkusBase;
