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
        const result = res.data;
        const { memberVerifs, entVerifs, realRegionVerifs } = result;
        if (memberVerifs && memberVerifs.length > 0) {
          for (let i = 0; i < memberVerifs.length; i += 1) {
            if (memberVerifs[i].verifFieldId === '6') {
              result.memoText = memberVerifs[i].memo;
            }
          }
        } else {
          result.memoText = '';
        }
        if (entVerifs && entVerifs.length > 0) {
          const {
            entName,
            legalName,
            creditCode,
            licenseCode,
            licenseImgUrl,
            organizationImgUrl,
          } = result.entVerifs[0];
          renzhengInfo[1] = entName;
          renzhengInfo[3] = legalName;
          renzhengInfo[5] = creditCode;
          renzhengInfo[7] = licenseCode;
          imageData[0].imgUrl = licenseImgUrl || '';
          imageData[1].imgUrl = organizationImgUrl || '';
          const myQYImgArray = [];
          for (let i = 0; i < imageData.length; i += 1) {
            if (imageData[i].imgUrl !== '') {
              myQYImgArray.push(imageData[i]);
              this.setState({
                imageData: myQYImgArray,
              });
            }
          }
          if (myQYImgArray.length === 0) {
            this.setState({
              imageData: [],
            });
          }
        }
        if (realRegionVerifs) {
          const {
            verifIdentity,
            category,
            provinceName,
            cityName,
            supplyChannel,
            scale,
            dailySupply,
            realRegionVerifDetails,
          } = realRegionVerifs;
          const {
            objectImgUrl,
            productionImgUrl,
            qualificationImgUrl,
            productImgUrl,
            sortImgUrl,
            packageImgUrl,
            memberImgUrl,
            promiseImgUrl,
            factoryImgUrl,
            objectDescribe,
          } = realRegionVerifDetails;
          indeedInfo[1] = verifIdentity || '--';
          indeedInfo[3] = category.name || '--';
          indeedInfo[5] = provinceName + cityName || '--';
          indeedInfo[7] = supplyChannel || '--';
          indeedInfo[9] = scale || '--';
          indeedInfo[11] = dailySupply || '--';
          indeedImageData[0].imgUrl = objectImgUrl || '';
          indeedImageData[1].imgUrl = productionImgUrl || '';
          indeedImageData[2].imgUrl = qualificationImgUrl || '';
          indeedImageData[3].imgUrl = productImgUrl || '';
          indeedImageData[4].imgUrl = sortImgUrl || '';
          indeedImageData[5].imgUrl = packageImgUrl || '';
          indeedImageData[6].imgUrl = memberImgUrl || '';
          indeedImageData[7].imgUrl = promiseImgUrl || '';
          indeedImageData[8].imgUrl = factoryImgUrl || '';
          this.setState({
            myText: objectDescribe || '',
          });
          const myArray = [];
          for (let i = 0; i < indeedImageData.length; i += 1) {
            if (indeedImageData[i].imgUrl !== '') {
              myArray.push(indeedImageData[i]);
              this.setState({
                indeedImageData: myArray,
              });
            }
          }
          if (myArray.length === 0) {
            this.setState({
              indeedImageData: [],
            });
          }
          this.setState({
            isHaveIndeed: true,
          });
        } else {
          this.setState({
            isHaveIndeed: false,
          });
        }
        const { personVerifStatus, personVerifs, score, allEvaluat } = result;
        if (personVerifStatus === '1' && personVerifs && personVerifs.length > 0) {
          this.setState({
            realName: personVerifs[0].realName,
          });
        }
        this.setState({
          userInfo: result,
          renzhengInfo,
          indeedInfo,
          DTgoodsScore: score.goodsScore || '--',
          DTlogisticsScore: score.logisticsScore || '--',
          DTsellScore: score.sellScore || '--',
          allComment: allEvaluat.evaluatCount || '',
          allScore: allEvaluat.evaluatScore || '',
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
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
      // console.log(res);
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
    }).catch(() => {
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
    }).catch(() => {
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
    }).catch(() => {
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
        // console.log(res);
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
    }).catch(() => {
    });
  }
  goChat = () => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    const { userInfo: { memberId, nickName, imgUrl } } = this.state;
    if (memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId,
          userName: decodeURI(nickName),
          imgUrl,
        },
      },
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
