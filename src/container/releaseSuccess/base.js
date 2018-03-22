import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetSameCategoryPurchaseService, GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '',
      items: [],
      role: null,
      userInfo: '',
      isVerifField: false,
    };
  }
  getInit = () => {
    this.setState({
      memberId: global.memberId,
      role: global.role,
    }, this.getData);
  }
  getData = () => {
    const { memberId } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        if (result.memberVerifs !== null && result.memberVerifs.length > 0) {
          for (let i = 0; i < result.memberVerifs.length; i += 1) {
            if (result.memberVerifs[i].verifFieldName === '实名认证') {
              this.setState({
                isVerifField: true,
              });
            }
          }
        }
        this.setState({
          userInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
    GetSameCategoryPurchaseService({
      memberId,
    }).then((res) => {
      console.log(res.data);
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
