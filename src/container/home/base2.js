import React from 'react';
import Toast from 'react-native-simple-toast';
import { ListView } from 'react-native';
import { GetGoodBusinesService } from '../../api';


class Base2 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      currentPage: 1,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      pageSize: '5',
      items: [],
      goodsTypeList: [], // 应季好货
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  business = () => {
    const { ds } = this.state;
    GetGoodBusinesService({
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          if (result[i].supplys.length > 0) {
            result[i].sell = result[i].supplys[0].categoryName;
          } else {
            result[i].sell = '暂无';
          }
        }
        this.setState({
          dataSource: ds.cloneWithRows(result),
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
}
export default Base2;
