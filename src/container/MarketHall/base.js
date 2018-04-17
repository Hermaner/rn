import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMarketService, GetAppCategoryService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      currentPage: 1,
      items: [],
      catLeftIndex: 0,
      catRightIndex: null,
      goods: [],
      categoryId: '',
      brandId: '',
      childgoods: [],
    };
  }
  getInit = () => {
    this._onRefresh();
    this.GetAppCategoryService();
  }
  getDelete = () => {
  }
  GetMarketService = () => {
    const {
      currentPage,
      pageSize,
      refresh,
      items,
      categoryId,
      brandId,
    } = this.state;
    GetMarketService({
      currentPage,
      pageSize,
      categoryId,
      brandId,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              refresh: false,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
            currentPage: currentPage + 1,
            refresh: false,
            noData: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
            noData: false,
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
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
  showAction = () => {
    const { isMaskerShow } = this.state;
    if (isMaskerShow) {
      this.hideMasker();
      return;
    }
    this.setState({
      isCategoryShow: true,
      isMaskerShow: true,
    });
  }
  hideMasker = () => {
    this.setState({
      isCategoryShow: false,
      isMaskerShow: false,
    });
  }
  saveMasker = () => {
    this.hideMasker();
  }
  changeLeftGoods = (index) => {
    const { goods, catLeftIndex } = this.state;
    if (catLeftIndex === index) {
      return;
    }
    goods[index].cur = true;
    goods[catLeftIndex].cur = false;
    this.setState({
      goods,
      childgoods: goods[index].childs,
      catLeftIndex: index,
    });
  }
  changeRightGoods = (index) => {
    const { childgoods, catRightIndex } = this.state;
    this.hideMasker();
    if (catRightIndex === index) {
      return;
    }
    childgoods[index].cur = true;
    if (catRightIndex !== null) {
      childgoods[catRightIndex].cur = false;
    }
    this.setState({
      childgoods,
      name: childgoods[index].name,
      catRightIndex: index,
      categoryId: childgoods[index].categoryId,
    }, this._onRefresh);
  }
  GetAppCategoryService = () => {
    GetAppCategoryService()
    .then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const goods = res.data;
        goods[0].cur = true;
        this.setState({
          goods,
          childgoods: goods[0].childs,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
      item: [],
    }, () => this.GetMarketService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetMarketService());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
