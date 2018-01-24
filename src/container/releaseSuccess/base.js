import React from 'react';
import PropTypes from 'prop-types';
import { GetSameCategoryPurchaseService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      items: [],
      role: null,
    };
  }
  getInit = () => {
    this.setState({
      memberId: global.userData.memberId,
      role: global.userData.role,
    }, this.ValidateIsQuoteService);
  }
  getData = () => {
    const { memberId } = this.state;
    GetSameCategoryPurchaseService({
      memberId,
    }).then((res) => {
      console.log('??????????????', res.data);
      if (res.isSuccess) {
        this.setState({
          items: res.data,
        });
      } else {
        global.Toast.show(res.msg);
      }
    });
  }
}

Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
