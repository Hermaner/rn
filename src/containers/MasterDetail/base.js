import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetMasterInfoByIDService, CreateMemberMasterService, DeleteMemberMasterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isColl: false,
      masterId: this.props.navigation.state.params.masterId,
      bz: [{
        label: '未服务全额退',
      }, {
        label: '爽约包赔',
      }, {
        label: '不满意再上门',
      }],
      footIcons: [{
        icon: 'ios-person',
        label: '他的服务',
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
    this.GetMasterInfoByIDService();
  }
  save = () => {
    Toast.show('敬请期待！');
  }
  footAction = (index) => {
    const { info: { masterId, memberInfo: { phone } }, isColl } = this.state;
    const { push } = this.props;
    switch (index) {
      case 0:
        push({ key: 'MasterItems',
          params: {
            masterId,
          },
        });
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
          this.DeleteMemberMasterService();
        } else {
          this.CreateMemberMasterService();
        }
        break;
      default:
    }
  }
  GetMasterInfoByIDService = () => {
    const { masterId } = this.state;
    this.sleek.toggle();
    GetMasterInfoByIDService({
      masterId,
      memberId: global.memberId || '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          info: res.data,
          isColl: res.data.isFavorite === 1,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  CreateMemberMasterService = () => {
    const { masterId, isColl } = this.state;
    this.sleek.toggle();
    CreateMemberMasterService({
      masterId,
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
  DeleteMemberMasterService = () => {
    this.sleek.toggle();
    const { masterId, isColl } = this.state;
    DeleteMemberMasterService({
      masterId,
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
