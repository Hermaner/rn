import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetDecorationCompanyInfoService, CreateMemberDecorationService, DeleteMemberDecorationService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isColl: false,
      decorationId: props.navigation.state.params.decorationId,
      info: null,
      credentialss: [],
      bz: [{
        label: '未服务全额退',
      }, {
        label: '爽约包赔',
      }, {
        label: '不满意再上门',
      }],
      footIcons: [{
        icon: 'ios-person',
        label: '服务项目',
        page: '',
      }, {
        icon: 'ios-call',
        label: '呼叫',
        page: '',
      }, {
        icon: 'md-star',
        label: '收藏',
        page: '',
      }],
    };
  }
  getInit = () => {
    this.GetDecorationCompanyInfoService();
  }
  footAction = (index) => {
    const { info: { phone }, isColl } = this.state;
    const { push } = this.props;
    switch (index) {
      case 0:
        Toast.show('敬请期待');
        break;
      case 1:
        Communications.phonecall(phone, false);
        break;
      case 2:
        if (!global.memberId) {
          push({ key: 'User' });
          return;
        }
        if (isColl) {
          this.DeleteMemberDecorationService();
        } else {
          this.CreateMemberDecorationService();
        }
        break;
      default:
    }
  }
  GetDecorationCompanyInfoService = () => {
    const { decorationId } = this.state;
    this.sleek.toggle();
    GetDecorationCompanyInfoService({
      decorationId,
      memberId: global.memberId || '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const info = res.data;
        if (info.credentialss.length > 3) {
          info.credentialss.length = 3;
        }
        this.setState({
          info,
          credentialss: res.data.credentialss,
          isColl: res.data.isFavorite === 1,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  CreateMemberDecorationService = () => {
    const { decorationId, isColl } = this.state;
    this.sleek.toggle();
    CreateMemberDecorationService({
      decorationId,
      memberId: global.memberId || '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('收藏成功');
        this.setState({
          isColl: !isColl,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  DeleteMemberDecorationService = () => {
    this.sleek.toggle();
    const { decorationId, isColl } = this.state;
    DeleteMemberDecorationService({
      decorationId,
      memberId: global.memberId || '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('取消成功');
        this.setState({
          isColl: !isColl,
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
  navigation: PropTypes.object,
};
export default Base;
