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
    global.storage.load({ key: 'userData' })
    .then(res => this.setState({ memberId: res.memberId, role: res.role }, this.getData)).catch(() => {});
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
