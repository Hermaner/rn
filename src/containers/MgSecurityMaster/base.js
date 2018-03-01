import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDepositPermissionService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topbg: require('../../assets/img/yjbg.png'),
      items: [{
        label: '保证金1000元',
      }, {
        label: '保证金1000元',
      }, {
        label: '保证金1000元',
        cur: true,
      }],
      tabIndex: 2,
    };
  }
  getInit = () => {
    this.GetDepositPermissionService();
  }
  GetDepositPermissionService = () => {
    this.sleek.toggle();
    GetDepositPermissionService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          items: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  changeTab = (index) => {
    const { items, tabIndex } = this.state;
    items[tabIndex].cur = false;
    items[index].cur = true;
    this.setState({
      items,
      tabIndex: index,
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.navigation,
};
export default Base;
