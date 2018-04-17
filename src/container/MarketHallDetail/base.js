import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDistrictMarketInfo, GetSupplyByFiltersService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.state.params.item,
      noData: false,
      pageSize: '15',
      currentPage: 1,
      info: null,
      items: [],
    };
  }
  getInit = () => {
    this.GetSupplyByFiltersService();
    this.GetDistrictMarketInfo();
  }
  GetSupplyByFiltersService = () => {
    const {
      item,
      items,
    } = this.state;
    const filters = {
      categoryId: item.categoryId,
      currentPage: '1',
      pageSize: '10',
    };
    this.sleek.toggle();
    GetSupplyByFiltersService({
      filters: JSON.stringify(filters),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        // console.log(res);
        const result = res.data.pageData;
        const newItems = items.concat(result);
        this.setState({
          items: newItems,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  GetDistrictMarketInfo = () => {
    const {
      item,
    } = this.state;
    GetDistrictMarketInfo({
      marketId: item.marketId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        this.setState({
          info: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
