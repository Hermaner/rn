import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetAppCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  getInit = () => {
    this.GetAppCategoryService();
  }
  GetAppCategoryService = () => {
    this.sleek.toggle();
    GetAppCategoryService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          items: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
export default Base;
