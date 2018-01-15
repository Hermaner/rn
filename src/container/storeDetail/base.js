import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import { DeepClone } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
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
      images: [
        {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        },
        {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        },
      ],
      otherItems: [
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
      ],
      certifIndex: 0,
      isCertifShow: false,
      imageViewData: [],
      goodsImg: require('../../assets/img/no.png'),
      bao: require('../../assets/img/bb.png'),
      infos: '',
      memoText: '',
      isHidden: false,
      supplyInfo: '',
    };
  }
  getData = () => {
    const { info } = this.props.navigation.state.params;
    this.setState({
      infos: info,
    }, this.setMemo);
  }
  setMemo = () => {
    const { infos } = this.state;
    if (infos) {
      this.setState({
        supplyInfo: infos.supplys,
      });
      console.log('??????????', infos.supplys)
      for (let i = 0; i < infos.memberVerifs.length; i += 1) {
        if (infos.memberVerifs[i].verifFieldName === '买家保障') {
          infos.memoText = infos.memberVerifs[i].memo;
          break;
        }
        infos.memoText = '未缴纳买家保证金';
      }
    }
  }
  listPush = () => {
    this.ModalView.closeModal();
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
    this.ModalView.showModal();
    console.log('"""""""""""""', this.ModalView);
  }
  resetState = () => {
    this.setState({
      ...DeepClone(this.resetData),
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
  changeItem = (index) => {
    const { items } = this.state;
    items[index].cur = !items[index].cur;
    this.setState({
      items,
    });
  }
  save = (callback) => {
    console.log(111);
    callback();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
