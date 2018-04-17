import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { UserSocket } from '../../components';
import { GetMemberInfoService, UpdateMemberInfoService } from '../../api';

@observer
class MemberInfoBase extends React.Component {
  constructor(props) {
    super(props);
    const { userData: { imgUrl } } = UserSocket;
    this.state = {
      initImage: imgUrl || '',
      userInfo: '',
      memberId: '',
      name: '',
      phone: '',
      set: '',
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      myAdress: '',
      role: '',
      identityName: '',
      address: '',
      selectShow: false,
      sex: '男',
      options: [{ value: '男', label: '男' },
      { value: '女', label: '女' }],
      homeImgUrls: '',
      homeImg: '',
      realName: '', // 经过个人认证的名字
    };
  }
  getInit = () => {
    this.getData();
    this.emitMineUser = DeviceEventEmitter.addListener('emitPhone', () => {
      this.emitPhone();
    });
  }
  getData = () => {
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        const province = result.provinceCode;
        const city = result.cityCode;
        const district = result.districtCode;
        const isHave = province && city && district ? 1 : 0;
        const role = result.role;
        const identityName = result.identityName;
        if (result.personVerifStatus === '1' && result.personVerifs !== '' && result.personVerifs !== null && result.personVerifs.length > 0) {
          this.setState({
            realName: result.personVerifs[0].realName,
          });
        }
        this.setState({
          userInfo: result,
          name: result.nickName,
          set: isHave,
          role,
          identityName,
          provinceCode: result.provinceCode,
          cityCode: result.cityCode,
          districtCode: result.districtCode,
          address: result.address,
          sex: result.sex === '1' ? '男' : '女',
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  getStoreImages = (upImages) => {
    this.setState({
      homeImg: upImages,
      homeImgUrls: upImages ? upImages.key : null,
    });
  }
  getDelete = () => {
    this.EmitgetAddress.remove();
    this.EmitgetUserType.remove();
    this.emitMineUser.remove();
  }
  emitPhone = () => {
    this.getData();
  }
  initData = () => { // 添加省份方法
    this.EmitgetAddress = DeviceEventEmitter.addListener('memberInfoEmit', (data) => {
      this.memberInfoEmit(data);
    });
    this.EmitgetUserType = DeviceEventEmitter.addListener('memberInfoEmitUserType', (data) => {
      this.memberInfoEmitUserType(data);
    });
  }
  chooseType = () => {
    this.setState({
      selectShow: true,
    });
  }
  selectModel = (sex) => {
    this.setState({
      selectShow: false,
      sex,
    });
  }
  closeModal = () => {
    this.setState({
      selectShow: false,
    });
  }
  memberInfoEmit = (data) => {
    this.setState({
      provinceCode: data.sendProvinceCode,
      cityCode: data.sendCityCode,
      districtCode: data.sendDistrictCode,
      myAdress: data.text,
    });
  }
  memberInfoEmitUserType = () => {
    this.getData();
  }
  saveName = (value) => {
    this.setState({
      name: value,
    });
  }
  savePhone = (value) => {
    this.setState({
      phone: value,
    });
  }
  saveAdress = (value) => {
    this.setState({
      address: value,
    });
  }
  reviseUserInfo = () => {
    const {
      address,
      name,
      upImages,
      provinceCode,
      cityCode,
      districtCode,
      homeImgUrls,
      sex } = this.state;
    // let myRealName = '';
    // if (realName !== '') {
    //   myRealName = userInfo.nickName;
    // }
    const member = {
      homeImgUrls,
      imgUrl: upImages ? upImages.key : '',
      memberId: global.memberId,
      sex: sex === '男' ? '1' : '2',
      provinceCode,
      cityCode,
      districtCode,
      address: address || '',
      nickName: name,
    };
    this.sleek.toggle();
    UpdateMemberInfoService({
      member: JSON.stringify(member),
    }).then((res) => {
      this.sleek.toggle();
      // console.log(res);
      if (res.isSuccess) {
        // UserSocket.changeData(res.data);
        Toast.show('您的信息修改成功！');
        DeviceEventEmitter.emit('emitUser');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
MemberInfoBase.propTypes = {
  pop: PropTypes.func,
};
export default MemberInfoBase;
