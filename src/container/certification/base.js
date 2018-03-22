import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberInfoService } from '../../api';

class CertificationBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zheng: require('../../assets/img/3531519719863_.pic.png'),
      qiye: require('../../assets/img/22.png'),
      havePerson: '', // 个人认证
      haveEnt: '', // 企业认证
    };
  }
  getData = () => {
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          havePerson: result.personVerifStatus,
          haveEnt: result.entVerifStatus,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  goPersonPage = () => {
    const { push } = this.props;
    const { havePerson } = this.state;
    if (havePerson === '1') {
      Toast.show('您已经完成个人认证！');
      return;
    }
    if (havePerson === '3') {
      Toast.show('正在认证中，请耐心等待！');
      return;
    }
    push({ key: 'IndividualAuthentication' });
  }
  goEntPage = () => {
    const { push } = this.props;
    const { haveEnt } = this.state;
    if (haveEnt === '1') {
      Toast.show('您已经完成企业认证！');
      return;
    }
    if (haveEnt === '3') {
      Toast.show('正在认证中，请耐心等待！');
      return;
    }
    push({ key: 'CollectiveAuthentication' });
  }
}
CertificationBase.propTypes = {
  push: PropTypes.func,
};
export default CertificationBase;
