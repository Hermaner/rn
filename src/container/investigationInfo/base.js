import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      list: [{
        title: '考察对象',
        label: 'OBJECT OF INVESTIGATION',
      }, {
        title: '产区介绍',
        label: 'PRODUCTION INTRODUCTION',
      }, {
        title: '产品介绍',
        label: 'PRODUCT INTRODUCTION',
      }, {
        title: '资质介绍',
        label: 'QUALIFICATION INTRODUCTION',
      }, {
        title: '采摘分拣',
        label: 'PICKING AND SORTING',
      }, {
        title: '包装入库',
        label: 'PACKAGING STORAGE',
      }, {
        title: '售后承诺',
        label: 'AFTER-SALES COMMITMENT',
      }],
    };
  }
  getInit = () => {
    const { memberId } = this.props.navigation.state.params;
    this.setState({
      memberId,
    }, this.getData);
  }
  getData = () => {
    const { list, memberId } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.realRegionVerifs;
        if (result.realRegionVerifDetails.objectImgUrl !== '' && result.realRegionVerifDetails.objectImgUrl !== null) {
          list[0].imgUrl = result.realRegionVerifDetails.objectImgUrl || '';
        }
        if (result.realRegionVerifDetails.objectDescribe !== '' && result.realRegionVerifDetails.objectDescribe !== null) {
          list[0].describe = result.realRegionVerifDetails.objectDescribe || '';
        }
        if (result.realRegionVerifDetails.productionImgUrl !== '' && result.realRegionVerifDetails.productionImgUrl !== null) {
          list[1].imgUrl = result.realRegionVerifDetails.productionImgUrl || '';
        }
        if (result.realRegionVerifDetails.productionDescribe !== '' && result.realRegionVerifDetails.productionDescribe !== null) {
          list[1].describe = result.realRegionVerifDetails.productionDescribe || '';
        }
        if (result.realRegionVerifDetails.productImgUrl !== '' && result.realRegionVerifDetails.productImgUrl !== null) {
          list[2].imgUrl = result.realRegionVerifDetails.productImgUrl || '';
        }
        if (result.realRegionVerifDetails.productDescribe !== '' && result.realRegionVerifDetails.productDescribe !== null) {
          list[2].describe = result.realRegionVerifDetails.productDescribe || '';
        }
        if (result.realRegionVerifDetails.qualificationImgUrl !== '' && result.realRegionVerifDetails.qualificationImgUrl !== null) {
          list[3].imgUrl = result.realRegionVerifDetails.qualificationImgUrl || '';
        }
        if (result.realRegionVerifDetails.qualificationDescribe !== '' && result.realRegionVerifDetails.qualificationDescribe !== null) {
          list[3].describe = result.realRegionVerifDetails.qualificationDescribe || '';
        }
        if (result.realRegionVerifDetails.sortImgUrl !== '' && result.realRegionVerifDetails.sortImgUrl !== null) {
          list[4].imgUrl = result.realRegionVerifDetails.sortImgUrl || '';
        }
        if (result.realRegionVerifDetails.sortDescribe !== '' && result.realRegionVerifDetails.sortDescribe !== null) {
          list[4].describe = result.realRegionVerifDetails.sortDescribe || '';
        }
        if (result.realRegionVerifDetails.packageImgUrl !== '' && result.realRegionVerifDetails.packageImgUrl !== null) {
          list[5].imgUrl = result.realRegionVerifDetails.packageImgUrl || '';
        }
        if (result.realRegionVerifDetails.packageDescribe !== '' && result.realRegionVerifDetails.packageDescribe !== null) {
          list[5].describe = result.realRegionVerifDetails.packageDescribe || '';
        }
        if (result.realRegionVerifDetails.promiseImgUrl !== '' && result.realRegionVerifDetails.promiseImgUrl !== null) {
          list[6].imgUrl = result.realRegionVerifDetails.promiseImgUrl || '';
        }
        this.setState({
          userInfo: result,
          list,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
