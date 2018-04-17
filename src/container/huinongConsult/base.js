import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetNewsTypeService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  getInit = () => {
    this.GetNewsTypeService();
  }
  GetNewsTypeService = () => {
    GetNewsTypeService().then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        this.setState({
          items: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
}
export default Base;
