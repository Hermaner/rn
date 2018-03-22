import React from 'react';
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
      entVerifs: '',
      isSet: '',
      userInfo: '',
      haveEnt: '0', // 企业认证状态
    };
  }
  getInit = () => {
    this.getData();
  }
  getData = () => {
    this.sleek.toggle();
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        const province = result.provinceCode;
        const city = result.cityCode;
        const district = result.districtCode;
        const isHave = province && city && district ? 'true' : 'false';
        this.setState({
          userInfo: result,
          isSet: isHave,
          entVerifs: result.entVerifs,
          haveEnt: result.entVerifStatus || '0',
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  getImages1 = (upImages) => {
    if (upImages.length === 0) {
      this.setState({
        licenseImg: '',
        licenseImgUrl: '',
      });
      return;
    }
    this.setState({
      licenseImg: upImages[upImages.length - 1].uri,
      licenseImgUrl: upImages[upImages.length - 1].key,
    });
  }
  getImages2 = (upImages) => {
    if (upImages.length === 0) {
      this.setState({
        organizationImg: '',
        organizationImgUrl: '',
      });
      return;
    }
    this.setState({
      organizationImg: upImages[upImages.length - 1].uri,
      organizationImgUrl: upImages[upImages.length - 1].key,
    });
    console.log('^^', upImages);
  }
  submit = (type) => {
    const {
      businessName,
      representative,
      creditCode,
      licenseImgUrl,
      licenseCode,
      organizationCode,
      organizationImgUrl,
      entVerifs } = this.state;
    if (entVerifs.length >= 1) {
      Toast.show('请不要重复验证');
      return;
    }
    const patrn = /^[0-9A-Z]+$/;
    if (type === '1') {
      if (businessName === '') {
        Toast.show('请填写企业名称');
        return;
      }
      if (representative === '') {
        Toast.show('请填写法人代表');
        return;
      }
      if (creditCode === '') {
        Toast.show('请填写统一社会信用代码');
        return;
      }
      if ((creditCode.length !== 18) || (patrn.test(creditCode) === false)) {
        Toast.show('统一社会信用代码填写有误');
        return;
      }
      if (!licenseImgUrl) {
        Toast.show('请上传执照照片');
        return;
      }
    } else {
      if (businessName === '') {
        Toast.show('请填写企业名称');
        return;
      }
      if (representative === '') {
        Toast.show('请填写法人代表');
        return;
      }
      if (!licenseCode) {
        Toast.show('请填写营业执照号码');
        return;
      }
      if (!organizationCode) {
        Toast.show('请填写组织机构代码');
        return;
      }
      if (!organizationImgUrl) {
        Toast.show('请上传组织机构照片');
        return;
      }
    }
    const entVerif = {
      type,
      memberId: global.memberId,
      entName: businessName,
      legalName: representative,
      creditCode,
      licenseImgUrl,
      licenseCode,
      organizationCode,
      organizationImgUrl,
    };
    this.sleek.toggle();
    EntVerifService({
      entVerif: JSON.stringify(entVerif),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('企业认证信息已上传，请等待认证');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
export default CollectiveAuthenticationBase;
