import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { CreateMemberMasterServicesService, DeleteMemberMasterServicesService, GetMasterServicesInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isColl: false,
      count: 1,
      masterServicesId: this.props.navigation.state.params.masterServicesId,
      masterId: '',
      bz: [{
        label: '未服务全额退',
      }, {
        label: '爽约包赔',
      }, {
        label: '不满意再上门',
      }],
      footIcons: [{
        icon: 'ios-person',
        label: '师傅信息',
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
    this.GetMasterServicesInfoService();
  }
  createService = () => {
    const { push } = this.props;
    const { info: { salesPrice, id, name, imgUrl }, count } = this.state;
    push({ key: '',
      params: {
        salesPrice,
        id,
        count,
        name,
        imgUrl: imgUrl.split(',')[0],
      },
    });
  }
  footAction = (index) => {
    const { info: { masterId }, isColl } = this.state;
    const { push } = this.props;
    switch (index) {
      case 0:
        push({ key: 'MasterDetail',
          params: {
            masterId,
          },
        });
        break;
      case 1:
        Communications.phonecall('4009201913', false);
        break;
      case 2:
        if (!global.memberId) {
          push({ key: 'User' });
          return;
        }
        if (isColl) {
          this.DeleteMemberMasterServicesService();
        } else {
          this.CreateMemberMasterServicesService();
        }
        break;
      default:
    }
  }
  GetMasterServicesInfoService = () => {
    const { masterServicesId } = this.state;
    this.sleek.toggle();
    GetMasterServicesInfoService({
      masterServicesId,
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
  CreateMemberMasterServicesService = () => {
    const { masterServicesId, isColl } = this.state;
    this.sleek.toggle();
    CreateMemberMasterServicesService({
      masterServicesId,
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
  DeleteMemberMasterServicesService = () => {
    this.sleek.toggle();
    const { masterServicesId, isColl } = this.state;
    DeleteMemberMasterServicesService({
      masterServicesId,
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
