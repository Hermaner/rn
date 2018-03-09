import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { GetServiceCategoryService, GetServiceProductService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      items: [],
      loading: true,
      amount: 0,
      categoryId: '',
      tabIndex: 0,
      ruleInfo: {},
    };
  }
  getInit = () => {
    this.GetServiceCategoryService();
  }
  goNext = () => {
    const { amount, ruleInfo } = this.state;
    if (amount === 0) {
      Toast.show('请添加服务');
      return;
    }
    if (amount < ruleInfo.conditionPrice) {
      Alert.alert(
        '温馨提示', `${ruleInfo.name}，是否继续？`,
        [
          { text: '取消', onPress: () => {} },
          { text: '确认', onPress: this.save },
        ],
      );
      return;
    }
    this.save();
  }
  save = () => {
    const { items, ruleInfo } = this.state;
    const lists = [];
    items.forEach((item) => {
      item.salesPrice = item.price;
      if (item.count && item.count > 0) {
        lists.push(item);
      }
    });
    this.props.push({ key: 'CreateConfirm',
      params: {
        items: lists,
        ruleInfo,
        typeId: '5',
      },
    });
  }
  changeTab = (index) => {
    const { amount, tabIndex } = this.state;
    if (tabIndex === index) {
      return;
    }
    if (amount > 0) {
      Alert.alert(
        '温馨提示', '切换将清除您当前的选择，是否切换？',
        [
          { text: '取消', onPress: () => {} },
          { text: '确认', onPress: () => this.comfirmChange(index) },
        ],
      );
    } else {
      this.comfirmChange(index);
    }
  }
  comfirmChange = (index) => {
    const { tabs, tabIndex } = this.state;
    tabs[index].cur = true;
    tabs[tabIndex].cur = false;
    this.setState({
      tabs,
      amount: 0,
      tips: '',
      loading: true,
      ruleInfo: tabs[index].ruleInfo || {},
      categoryId: tabs[index].id,
      tabIndex: index,
    }, this.GetServiceProductService);
  }
  changeCount = (count, index) => {
    const { items } = this.state;
    items[index].count = count;
    let amount = 0;
    items.forEach((item) => {
      if (item.count && item.count > 0) {
        amount += item.count * item.price;
      }
    });
    this.setState({
      items,
      amount,
    });
  }
  GetServiceCategoryService = () => {
    this.sleek.toggle();
    GetServiceCategoryService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const tabs = res.data;
        tabs[0].cur = true;
        this.setState({
          tabs,
          ruleInfo: tabs[0].ruleInfo,
          categoryId: tabs[0].id,
        }, this.GetServiceProductService);
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  GetServiceProductService = () => {
    this.sleek.toggle();
    const { categoryId } = this.state;
    console.log(categoryId);
    GetServiceProductService({
      categoryId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        items.forEach((item) => {
          item.count = 0;
        });
        this.setState({
          items,
          loading: false,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
