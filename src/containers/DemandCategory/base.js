import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDemandCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      items: [],
      tabIndex: 0,
    };
  }
  getInit = () => {
    this.GetDemandCategoryService();
  }
  changeTab = (index) => {
    const { items, tabIndex } = this.state;
    items[index].cur = true;
    items[tabIndex].cur = false;
    this.setState({
      items,
      tabIndex: index,
    });
    this.tableList.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex: index,
      viewOffset: 35,
    });
  }
  GetDemandCategoryService = () => {
    this.sleek.toggle();
    GetDemandCategoryService({
      parentId: '',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        items[0].cur = true;
        this.setState({
          items,
        });
      } else {
        Toast.show(res.msg);
        this.props.pop();
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
