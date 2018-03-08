import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetMasterTypeService, UpdateMasterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { masterTypes } = props.navigation.state.params;
    this.state = {
      masterTypes,
      items: [],
    };
  }
  getInit = () => {
    this.GetMasterTypeService();
  }
  changeTab = (index, i) => {
    const { items } = this.state;
    items[index].childs[i].cur = !items[index].childs[i].cur;
    this.setState({
      items,
    });
  }
  save = () => {
    const { items } = this.state;
    const masterTypeIds = [];
    items.forEach((item) => {
      if (item.childs) {
        item.childs.forEach((list) => {
          if (list.cur) {
            masterTypeIds.push(list.id);
          }
        });
      }
    });
    this.sleek.toggle();
    UpdateMasterService({
      masterTypeIds: masterTypeIds.join(','),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('修改成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  GetMasterTypeService = () => {
    this.sleek.toggle();
    const { masterTypes } = this.state;
    GetMasterTypeService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        masterTypes.forEach((masterType) => {
          items.forEach((item) => {
            item.childs.forEach((list) => {
              if (list.id.toString() === masterType.toString()) {
                list.cur = true;
              }
            });
          });
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
  navigation: PropTypes.object,
};
export default Base;
