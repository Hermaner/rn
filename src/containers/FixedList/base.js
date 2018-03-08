import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetServiceCategoryService, GetServiceProductService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      items: [],
      categoryId: '',
      tabIndex: null,
    };
  }
  getInit = () => {
    this.GetServiceCategoryService();
  }
  goNext = (item) => {
    if (item === 0) {
      DeviceEventEmitter.emit('emitTabOrder');
      this.props.pop();
      return;
    }
    const { type } = this.state;
    if (type === 'TabOrder') {
      DeviceEventEmitter.emit('emitTabOrder', item);
      this.props.pop();
      return;
    }
    this.props.push({ key: 'DemandConfirm', params: { item } });
  }
  changeTab = (index) => {
    const { tabs, tabIndex } = this.state;
    if (tabIndex === index) {
      return;
    }
    tabs[index].cur = true;
    if (tabIndex !== null) {
      tabs[tabIndex].cur = false;
    }
    this.setState({
      tabs,
      categoryId: tabs[index].id,
      tabIndex: index,
    }, this.GetServiceProductService);
  }
  changeCount = (count, index) => {
    const { items } = this.state;
    items[index].count = count;
    this.setState({
      items,
    });
  }
  GetServiceCategoryService = () => {
    this.sleek.toggle();
    GetServiceCategoryService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const tabs = res.data;
        this.setState({
          tabs,
        }, () => this.changeTab(0));
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  GetServiceProductService = () => {
    this.sleek.toggle();
    const { categoryId } = this.state;
    GetServiceProductService({
      categoryId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        items.forEach((item) => {
          item.count = 1;
        });
        this.setState({
          items,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
