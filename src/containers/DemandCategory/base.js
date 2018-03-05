import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetDemandCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { type } = props.navigation.state.params;
    this.state = {
      items: [],
      type,
      tabIndex: 0,
    };
  }
  getInit = () => {
    this.GetDemandCategoryService();
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
    const { items, tabIndex } = this.state;
    this.tableList.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex: index,
      viewOffset: 35,
    });
    if (tabIndex === index) {
      return;
    }
    items[index].cur = true;
    items[tabIndex].cur = false;
    this.setState({
      items,
      tabIndex: index,
    });
  }
  GetDemandCategoryService = () => {
    this.sleek.toggle();
    GetDemandCategoryService({
      parentId: '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        items[0].cur = true;
        this.setState({
          items,
        });
      } else {
        Toast.show(res.msg);
        this.props.pop();
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
