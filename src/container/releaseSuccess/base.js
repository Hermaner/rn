import React from 'react';
import PropTypes from 'prop-types';
import { GetSameCategoryPurchaseService } from '../../api';

class PurchaseDetailBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
    };
  }
  getInit = () => {
    global.storage.load({ key: 'userData' })
    .then(res => this.setState({ memberId: res.memberId }, this.getData));
  }
  getData = () => {
    const { memberId } = this.state;
    GetSameCategoryPurchaseService({
      memberId,
    }).then((res) => {
      console.log(res);
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
export default PurchaseDetailBase;
