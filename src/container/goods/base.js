import React from 'react';
import Toast from 'react-native-simple-toast';
import { ListView } from 'react-native';
import PropTypes from 'prop-types';
import { GetAppCategoryService, GetPurchaseByCategoryService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
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
      ds,
      dataSource: ds.cloneWithRows([]),
      currentPage: 1,
      pageSize: '15',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      goodGoodsList: [],
      allGoods: [],
      memberId: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this.getData);
  }
  getData = () => {
    let { categoryId } = this.props;
    categoryId = categoryId || '';
    GetAppCategoryService({
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data[0].childs;
        console.log('++++++', res.data);
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

    GetPurchaseByCategoryService({
      categoryId,
    }).then((res) => {
      console.log('///////////////', res);
      if (res.isSuccess) {
        const result = res.data;
        console.log('ppppppppppp', result);
        this.setState({
          allGoods: result,
        });
      } else {
        Toast.show('温馨提示33');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  // resetState = () => {
  //   this.setState({
  //     ...DeepClone(this.resetData),
  //   });
  // }
}
Base.propTypes = {
  categoryId: PropTypes.string,
};
export default Base;
