import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetMemberInfoService } from '../../api';

class SelfSetBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      isSet: false,
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    const { memberId } = this.state;
    console.log('rrrrrrrrr', memberId);
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        console.log('^^^^^^', result);
        const province = result.provinceCode;
        const city = result.cityCode;
        const district = result.districtCode;
        const isHave = province && city && district ? 'true' : 'false';
        this.setState({
          userInfo: result,
          isSet: isHave,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
}
export default SelfSetBase;
