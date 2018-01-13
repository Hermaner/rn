import React from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { EntVerifService, GetMemberInfoService } from '../../api';

class CollectiveAuthenticationBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
      businessName: '',
      representative: '',
      creditCode: '',
      licenseImgUrl: '',
      licenseCode: '', // 营业执照号码
      organizationCode: '', // 组织机构代码
      organizationImgUrl: '', // 组织机构照片
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
          entVerifs: result.entVerifs,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
  getImages1 = (upImages) => {
    this.setState({
      licenseImg: upImages[0].uri,
      licenseImgUrl: upImages[0].key,
    });
    console.log('^^', upImages);
  }
  getImages2 = (upImages) => {
    this.setState({
      organizationImg: upImages[0].uri,
      organizationImgUrl: upImages[0].key,
    });
    console.log('^^', upImages);
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
  choosePlace = (value) => {
    this.setState({
      selected2: value,
    });
  }
  saveBusinessName = (value) => {
    this.setState({
      businessName: value,
    });
  }
  saveRepresentative = (value) => {
    this.setState({
      representative: value,
    });
  }
  saveCreditCode = (value) => {
    this.setState({
      creditCode: value,
    });
  }
  saveLicenseCode = (value) => {
    this.setState({
      licenseCode: value,
    });
  }
  saveOrganizationCode = (value) => {
    this.setState({
      organizationCode: value,
    });
  }
  submit = (type) => {
    const {
      businessName,
      representative,
      creditCode,
      memberId,
      licenseImgUrl,
      licenseCode,
      organizationCode,
      organizationImgUrl,
      entVerifs } = this.state;
    if (entVerifs.length >= 1) {
      Alert.alert(
        '请不要重复验证',
      );
      return;
    }
    const patrn = /^[0-9A-Z]+$/;
    if (type === '1') {
      if (businessName === '') {
        Alert.alert(
          '提交失败',
          '请填写企业名称',
        );
      }
      if (representative === '') {
        Alert.alert(
          '提交失败',
          '请填写法人代表',
        );
      }
      if (creditCode === '') {
        Alert.alert(
          '提交失败',
          '请填写统一社会信用代码',
        );
      }
      if ((creditCode.length !== 18) || (patrn.test(creditCode) === false)) {
        Alert.alert(
          '提交失败',
          '统一社会信用代码填写有误',
        );
      }
      if (!licenseImgUrl) {
        Alert.alert(
          '提交失败',
          '请上传执照照片',
        );
      }
    } else {
      if (businessName === '') {
        Alert.alert(
          '提交失败',
          '请填写企业名称',
        );
      }
      if (representative === '') {
        Alert.alert(
          '提交失败',
          '请填写法人代表',
        );
      }
      if (!licenseCode) {
        Alert.alert(
          '提交失败',
          '请填写营业执照号码',
        );
      }
      if (!organizationCode) {
        Alert.alert(
          '提交失败',
          '请填写组织机构代码',
        );
      }
      if (!organizationImgUrl) {
        Alert.alert(
          '提交失败',
          '请上传组织机构照片',
        );
      }
    }
    const entVerif = {
      type,
      memberId,
      entName: businessName,
      legalName: representative,
      creditCode,
      licenseImgUrl,
      licenseCode,
      organizationCode,
      organizationImgUrl,
    };
    this.sleek.toggle();
    console.log(JSON.stringify(entVerif));
    EntVerifService({
      entVerif: JSON.stringify(entVerif),
    }).then((res) => {
      console.log('99999999', res);
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
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
export default CollectiveAuthenticationBase;
