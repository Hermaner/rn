import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterPunishOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      noData: false,
      loading: true,
    };
  }
  getInit = () => {
    this.GetMasterPunishOrderService();
  }
  GetMasterPunishOrderService = () => {
    GetMasterPunishOrderService().then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const items = res.data;
        if (items.length === 0) {
          this.setState({
            noData: true,
            loading: false,
          });
          return;
        }
        this.setState({
          items,
          loading: false,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
