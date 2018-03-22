import React from 'react';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import Toast from 'react-native-simple-toast';
import { GetMemberInfoService, CreateMemberFollowService, GetMemberFollowService, DeleteMemberFollowService, GetSupplyService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsItems: [],
      currentPage: 1,
      pageSize: '15',
      refresh: true, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      items: [{
        title: '支持在线交易',
        id: '1',
        cur: false,
      }, {
        title: '完成企业认证',
        id: '2',
        cur: false,
      }, {
        title: '完成个人认证',
        id: '3',
        cur: false,
      }, {
        title: '现货供应',
        id: '4',
        cur: false,
      }],
      list: [{
        id: '1',
        title: '买家保障',
        label: '您尚未缴纳诚信保证金并承诺提供买家保障服务',
        labelTitle: '了解详情',
        isHave: true,
      }, {
        id: '1',
        title: '实名认证',
        label: '您尚未通过实名认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '企业认证',
        label: '您尚未通过企业认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '实地认证',
        label: '您尚未通过实地考察认证',
        labelTitle: '申请认证',
        isHave: true,
      }],
      otherItems: [
        { name: '石榴真好吃啊真好吃啊真好使' },
      ],
      renzhengInfo: ['企业名称', '', '法人名称', '', '社会信用代码', '', '营业执照号码', ''],
      indeedInfo: ['认证身份', '', '认证品类', '', '认证地区', '', '供货渠道', '', '规模', '', '日供货量', ''],
      imageData: [{
        name: '营业执照照片',
      }, {
        name: '组织机构照片',
      }],
      indeedImageData: [{
        name: '考察对象',
      }, {
        name: '产区介绍',
      }, {
        name: '资质介绍',
      }, {
        name: '产品介绍',
      }, {
        name: '加工分拣',
      }, {
        name: '包装入库',
      }, {
        name: '认证商家',
      }, {
        name: '承诺图片',
      }, {
        name: '工厂图片',
      }],
      certifIndex: 0,
      certifIndex2: 0,
      isCertifShow: false,
      isCertifShow2: false,
      imageViewData: [],
      bao: require('../../assets/img/bb.png'),
      infos: '',
      memoText: '',
      isHidden: false,
      supplyInfo: '',
      userInfo: null,
      memoTextId: true,
      isFollow: false, // 关注列表
      clickFollow: -1, // 点击关注，再点击取消
      isHaveIndeed: false,
      realName: '', // 个人认证的真实姓名
      DTgoodsScore: '',
      DTlogisticsScore: '',
      DTsellScore: '',
      myText: '',
    };
  }
  getInit = () => {
    const { memberId } = this.props.navigation.state.params;
    this.setState({
      memberId,
    }, this.getData);
  }
  getData = () => {
    this.GetMemberInfoService();
    this._onRefresh();
  }
  GetMemberInfoService = () => {
    const { memberId, renzhengInfo, imageData, indeedInfo, indeedImageData } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data;
        if (result.memberVerifs !== '' && result.memberVerifs !== null && result.memberVerifs.length > 0) {
          for (let i = 0; i < result.memberVerifs.length; i += 1) {
            if (result.memberVerifs[i].verifFieldId === '6') {
              result.memoText = result.memberVerifs[i].memo;
            }
          }
        } else {
          result.memoText = '';
        }
        if (result.entVerifs && result.entVerifs.length > 0) {
          renzhengInfo[1] = result.entVerifs[0].entName;
          renzhengInfo[3] = result.entVerifs[0].legalName;
          renzhengInfo[5] = result.entVerifs[0].creditCode;
          renzhengInfo[7] = result.entVerifs[0].licenseCode;
          imageData[0].imgUrl = result.entVerifs[0].licenseImgUrl;
          imageData[1].imgUrl = result.entVerifs[0].organizationImgUrl;
        }
        if (result.realRegionVerifs !== null) {
          indeedInfo[1] = result.realRegionVerifs.verifIdentity || '--';
          indeedInfo[3] = result.realRegionVerifs.category.name || '--';
          indeedInfo[5] = result.realRegionVerifs.provinceName + result.realRegionVerifs.cityName || '--';
          indeedInfo[7] = result.realRegionVerifs.supplyChannel || '--';
          indeedInfo[9] = result.realRegionVerifs.scale || '--';
          indeedInfo[11] = result.realRegionVerifs.dailySupply || '--';
          if (result.realRegionVerifs.realRegionVerifDetails.objectImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.objectImgUrl !== null) {
            indeedImageData[0].imgUrl = result.realRegionVerifs.realRegionVerifDetails.objectImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.productionImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.productionImgUrl !== null) {
            indeedImageData[1].imgUrl = result.realRegionVerifs.realRegionVerifDetails.productionImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.qualificationImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.qualificationImgUrl !== null) {
            indeedImageData[2].imgUrl = result.realRegionVerifs.realRegionVerifDetails.qualificationImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.productImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.productImgUrl !== null) {
            indeedImageData[3].imgUrl = result.realRegionVerifs.realRegionVerifDetails.productImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.sortImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.sortImgUrl !== null) {
            indeedImageData[4].imgUrl = result.realRegionVerifs.realRegionVerifDetails.sortImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.packageImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.packageImgUrl !== null) {
            indeedImageData[5].imgUrl = result.realRegionVerifs.realRegionVerifDetails.packageImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.memberImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.memberImgUrl !== null) {
            indeedImageData[6].imgUrl = result.realRegionVerifs.realRegionVerifDetails.memberImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.promiseImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.promiseImgUrl !== null) {
            indeedImageData[7].imgUrl = result.realRegionVerifs.realRegionVerifDetails.promiseImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.factoryImgUrl !== '' && result.realRegionVerifs.realRegionVerifDetails.factoryImgUrl !== null) {
            indeedImageData[8].imgUrl = result.realRegionVerifs.realRegionVerifDetails.factoryImgUrl || '';
          }
          if (result.realRegionVerifs.realRegionVerifDetails.objectDescribe !== '' && result.realRegionVerifs.realRegionVerifDetails.objectDescribe !== null) {
            this.setState({
              myText: result.realRegionVerifs.realRegionVerifDetails.objectDescribe,
            });
          }
          this.setState({
            isHaveIndeed: true,
            indeedImageData,
          });
        } else {
          this.setState({
            isHaveIndeed: false,
          });
        }
        if (result.personVerifStatus === '1' && result.personVerifs !== '' && result.personVerifs !== null && result.personVerifs.length > 0) {
          this.setState({
            realName: result.personVerifs[0].realName,
          });
        }
        this.setState({
          userInfo: result,
          renzhengInfo,
          indeedInfo,
          DTgoodsScore: result.score.goodsScore || '--',
          DTlogisticsScore: result.score.logisticsScore || '--',
          DTsellScore: result.score.sellScore || '--',
          allComment: result.allEvaluat.evaluatCount || '',
          allScore: result.allEvaluat.evaluatScore || '',
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
    if (global.memberId) {
      this.GetMemberFollowService();
    }
  }
  GetMemberFollowService = () => {
    const { memberId } = this.state;
    GetMemberFollowService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          if (result[i].memberId === memberId) {
            this.setState({
              isFollow: true,
            });
            return;
          }
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  CreateMemberFollowService = () => {
    const { push } = this.props;
    const { userInfo, isFollow } = this.state;
    if (!global.memberId) {
      push({ key: 'User' });
      return;
    }
    if (userInfo.memberId === global.memberId) {
      Toast.show('请不要关注自己！');
      return;
    }
    if (isFollow) {
      this.DeleteFollow();
    } else {
      this.CreateFollow();
    }
  }
  CreateFollow = () => {
    const { memberId } = this.state;
    const otherMemeber = parseFloat(memberId);
    this.sleek.toggle();
    CreateMemberFollowService({
      memberId: global.memberId,
      byFollowMemberId: otherMemeber,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          isFollow: true,
        }, this.getInit);
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  DeleteFollow = () => {
    const { memberId } = this.state;
    const otherMemeber = parseFloat(memberId);
    this.sleek.toggle();
    DeleteMemberFollowService({
      memberId: global.memberId,
      byFollowMemberId: otherMemeber,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          isFollow: false,
        }, this.getInit);
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  listPush = () => {
    this.ModalView.closeModal();
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
    this.ModalView.showModal();
  }
  showIndeedImage = (certifIndex2, indeedImageData) => {
    const imageViewDataIndeed = [];
    indeedImageData.forEach(item => imageViewDataIndeed.push({ url: item.imgUrl }));
    this.setState({
      certifIndex2,
      isCertifShow2: true,
      imageViewDataIndeed,
    });
  }
  showCertifImage = (certifIndex, imageData) => {
    const imageViewData = [];
    imageData.forEach(item => imageViewData.push({ url: item.imgUrl }));
    this.setState({
      certifIndex,
      isCertifShow: true,
      imageViewData,
    });
  }
  tellPhone = () => {
    const { userInfo } = this.state;
    Communications.phonecall(userInfo.phone, false);
  }
  GetSupplyService = () => {
    const { memberId, currentPage, pageSize, goodsItems, refresh } = this.state;
    GetSupplyService({
      currentPage,
      pageSize,
      type: '0',
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              nomore: true,
              loading: false,
              refresh: false,
            });
          } else {
            this.setState({
              nomore: true,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            goodsItems: result,
            currentPage: currentPage + 1,
            refresh: false,
            noData: false,
            loading: false,
            nomore: false,
          });
        } else {
          const newItems = goodsItems.concat(result);
          this.setState({
            goodsItems: newItems,
            currentPage: currentPage + 1,
            loading: false,
          });
        }
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _onRefresh= () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetSupplyService());
  }
  _onScroll = (event) => {
    const { loading, nomore } = this.state;
    if (loading || nomore) {
      return;
    }
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      this.setState({
        loading: true,
      }, this.GetSupplyService);
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
