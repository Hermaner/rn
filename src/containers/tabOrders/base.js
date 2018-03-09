import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [{
        label: '智能排序',
        cur: true,
      }, {
        label: '距离排序',
        cur: false,
      }, {
        label: '价格排序',
        cur: false,
      }, {
        label: '筛选',
        cur: false,
      }],
      tabIndex: 0,
    };
  }
  getInit = () => {
  }
  changeTab = (index) => {
    const { tabs } = this.state;
    let { tabIndex, orderByName, orderByType } = this.state;
    if (index === 3) {
      this.props.push({ key: 'DemandCategory', params: { type: 'TabOrder' } });
      return;
    }
    switch (index) {
      case 0:
        orderByName = '';
        break;
      case 1:
        orderByName = 'distance';
        break;
      case 2:
        orderByName = 'servicesPrice';
        break;
      case 3:
        break;
      default:
    }
    if (tabIndex === index) {
      if (index === 0 || index === 1) {
        return;
      }
      orderByType = orderByType === 'desc' ? 'asc' : 'desc';
    } else {
      orderByType = 'desc';
      tabs[index].cur = true;
      tabs[tabIndex].cur = false;
      tabIndex = index;
    }
    this.setState({
      orderByName,
      orderByType,
      tabs,
      tabIndex,
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
