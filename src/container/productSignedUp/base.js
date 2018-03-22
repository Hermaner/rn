import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { AmapGeocode, GetSpreadFieldService, CreateSpreadEnterForService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoList: [{
        title: '您的姓名 ',
        label: this.name,
        noIcn: true,
      }, {
        title: '联系电话（注册慧包网使用的号码） ',
        label: this.phone,
        noIcn: false,
      }, {
        title: '参加活动的产品名称 ',
        label: this.goodsName,
        noIcn: true,
      }],
      threeList: [
        ['1.报名活动类型（请按照招商品类报名！）', [
        ]], ['2.请问您的身份属性（多项选择）', [
        ]], ['3.可提供的服务保障（多项选择）', [
        ]], ['4.您最希望得到哪方面的信息和帮助（最多选2项）', [
        ]], ['5.您的年龄范围 *', [
        ]]],
      name: '',
      phone: '',
      productName: '',
      isChoose: '',
      chooseOne: '',
      longitude: '',
      latitude: '',
      isClick: false,
      address: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    const { threeList } = this.state;
    this.sleek.toggle();
    GetSpreadFieldService({
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        const activityType = result.activityType || '';
        const identityAttribute = result.identityAttribute || '';
        const serviceGuarantee = result.serviceGuarantee || '';
        const needHelp = result.needHelp || '';
        const ageRange = result.ageRange || '';
        if (activityType && activityType.split(',').length > 0) {
          for (let i = 0; i < activityType.split(',').length; i += 1) {
            threeList[0][1].push({
              name: activityType.split(',')[i],
            });
          }
        }
        if (identityAttribute && identityAttribute.split(',').length > 0) {
          for (let i = 0; i < identityAttribute.split(',').length; i += 1) {
            threeList[1][1].push({
              name: identityAttribute.split(',')[i],
            });
          }
        }
        if (serviceGuarantee && serviceGuarantee.split(',').length > 0) {
          for (let i = 0; i < serviceGuarantee.split(',').length; i += 1) {
            threeList[2][1].push({
              name: serviceGuarantee.split(',')[i],
            });
          }
        }
        if (needHelp && needHelp.split(',').length > 0) {
          for (let i = 0; i < needHelp.split(',').length; i += 1) {
            threeList[3][1].push({
              name: needHelp.split(',')[i],
            });
          }
        }
        if (ageRange && ageRange.split(',').length > 0) {
          for (let i = 0; i < ageRange.split(',').length; i += 1) {
            threeList[4][1].push({
              name: ageRange.split(',')[i],
            });
          }
        }
        this.setState({
          threeList,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      // this.sleek.toggle();
    });
  }
  getPosition = () => {
    this.setState({
      longitude: global.longitude,
      latitude: global.latitude,
      isClick: !this.state.isClick,
    });
    this.AmapGeocode(global.longitude, global.latitude);
  }
  AmapGeocode = (longitude, latitude) => {
    AmapGeocode(`${longitude},${latitude}`).then((res) => {
      console.log(res);
      if (res.info === 'OK') {
        const {
          formatted_address,
        } = res.regeocode;
        this.setState({
          address: formatted_address,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  chooseType = (index, i) => {
    switch (index) {
      case 0:
        this.saveActiveType(index, i);
        break;
      case 1:
        this.saveIdentityType(index, i);
        break;
      case 2:
        this.saveIdentityType(index, i);
        break;
      case 3:
        this.saveInfoType(index, i);
        break;
      case 4:
        this.saveActiveType(index, i);
        break;
      default:
    }
  }
  saveActiveType = (index, i) => {
    const { threeList } = this.state;
    if (index === 0) {
      const itemIndex = threeList[0].itemIndex;
      threeList[0][1][i].cur = true;
      if (itemIndex === i) {
        return;
      }
      if (itemIndex !== undefined) {
        threeList[0][1][itemIndex].cur = false;
      }
      threeList[0][1][i].cur = true;
      threeList[0].itemIndex = i;
      this.setState({
        threeList,
      });
    }
    if (index === 4) {
      const itemIndex = threeList[4].itemIndex;
      threeList[4][1][i].cur = true;
      if (itemIndex === i) {
        return;
      }
      if (itemIndex !== undefined) {
        threeList[4][1][itemIndex].cur = false;
      }
      threeList[4][1][i].cur = true;
      threeList[4].itemIndex = i;
      this.setState({
        threeList,
      });
    }
  }
  saveIdentityType = (index, i) => {
    const { threeList } = this.state;
    if (index === 1) {
      threeList[1][1][i].cur = !threeList[1][1][i].cur;
      this.setState({
        threeList,
      });
    }
    if (index === 2) {
      threeList[2][1][i].cur = !threeList[2][1][i].cur;
      this.setState({
        threeList,
      });
    }
  }
  saveInfoType = (index, i) => {
    const { threeList } = this.state;
    let array = 0;
    for (let k = 0; k < threeList[3][1].length; k += 1) {
      if (threeList[3][1][k].cur) {
        array += 1;
      }
    }
    if (array < 2) {
      threeList[3][1][i].cur = !threeList[3][1][i].cur;
      this.setState({
        threeList,
      });
    } else {
      threeList[3][1][i].cur = !threeList[3][1][i].cur ? false : !threeList[3][1][i].cur;
      this.setState({
        threeList,
      });
    }
  }
  saveName = (name) => {
    this.setState({
      name,
    });
  }
  savePhone = (phone) => {
    this.setState({
      phone,
    });
  }
  saveGoodsName = (productName) => {
    this.setState({
      productName,
    });
  }
  saveInfo = (value, index) => {
    switch (index) {
      case 0:
        this.saveName(value);
        break;
      case 1:
        this.savePhone(value);
        break;
      case 2:
        this.saveGoodsName(value);
        break;
      default:
    }
  }
  sumit = () => {
    const { memberId, name, phone, threeList, productName, address } = this.state;
    const activityType = [];
    const identityAttribute = [];
    const serviceGuarantee = [];
    const needHelp = [];
    const ageRange = [];
    for (let i = 0; i < threeList.length; i += 1) {
      if (i === 0) {
        for (let k = 0; k < threeList[0][1].length; k += 1) {
          if (threeList[0][1][k].cur) {
            activityType.push(threeList[0][1][k].name);
          }
        }
      }
      if (i === 1) {
        for (let k = 0; k < threeList[1][1].length; k += 1) {
          if (threeList[1][1][k].cur) {
            identityAttribute.push(threeList[1][1][k].name);
          }
        }
      }
      if (i === 2) {
        for (let k = 0; k < threeList[2][1].length; k += 1) {
          if (threeList[2][1][k].cur) {
            serviceGuarantee.push(threeList[2][1][k].name);
          }
        }
      }
      if (i === 3) {
        for (let k = 0; k < threeList[3][1].length; k += 1) {
          if (threeList[3][1][k].cur) {
            needHelp.push(threeList[3][1][k].name);
          }
        }
      }
      if (i === 4) {
        for (let k = 0; k < threeList[4][1].length; k += 1) {
          if (threeList[4][1][k].cur) {
            ageRange.push(threeList[4][1][k].name);
          }
        }
      }
    }
    if (!name) {
      Toast.show('请填写您的姓名');
      return;
    }
    if (!phone) {
      Toast.show('请填写您的手机号');
      return;
    }
    const telReg = !(phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
    if (telReg) {
      Toast.show('手机号格式不对');
      return;
    }
    const spreadEnterFor = {
      memberId,
      name,
      phone,
      address,
      productName,
      activityType: activityType.toString(),
      identityAttribute: identityAttribute.toString(),
      serviceGuarantee: serviceGuarantee.toString(),
      needHelp: needHelp.toString(),
      ageRange: ageRange.toString(),
    };
    CreateSpreadEnterForService({
      spreadEnterFor,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        Toast.show('您的报名信息已提交！');
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      // this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
