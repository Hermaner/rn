import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberMasterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  getInit = () => {
    this.GetMemberMasterService();
  }
  GetMemberMasterService = () => {
    GetMemberMasterService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const items = res.data;
        if (items && items.length === 0) {
          return;
        }
        this.setState({
          items,
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
  push: PropTypes.func,
};
export default Base;
