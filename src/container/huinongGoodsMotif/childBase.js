import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetGotSupplyService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      title: '',
      categoryId: '',
      brands: null,
      name: '',
    };
  }
  getData = () => {
    const { ds } = this.state;
    let { brandId } = this.props;
    const { categoryId } = this.props;
    console.log('ooppooppooppooppoopp', categoryId)
    brandId = brandId || '';
    GetGotSupplyService({
      categoryId,
      brandId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          dataSource: ds.cloneWithRows(result),
        });
        console.log('{{{{{{{{}}}}}}}}', this.state.dataSource)
      } else {
        Toast.show('温馨提示ww');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  categoryId: PropTypes.string,
  brandId: PropTypes.string,
};
export default Base;
