import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetAppCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
      items: [{
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
        id: '1',
      }, {
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
        id: '1',
      }, {
        title: '优质农产品一件代发供应商招募优质农产品一件代发供应商招募',
        label: '入驻惠农优选，百万采购商就等你来',
        imgUrl: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
        id: '1',
      }],
      imgList: [{
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }, {
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }, {
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }, {
        img: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x',
      }],
      goodGoodsList: [],
      memberId: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this.getData);
  }
  getData = () => {
    GetAppCategoryService({
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data[0].childs;
        result.length = 5;
        for (let i = 0; i < result.length; i += 1) {
          if (i === 0) {
            result.splice(0, 0, { name: '全部分类', categoryId: '' });
          }
        }
        this.setState({
          goodGoodsList: result,
        });
      } else {
        Toast.show('温馨提示22');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  categoryId: PropTypes.string,
};
export default Base;
