import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetIdentityService } from '../../api';

class AdjectiveInfoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      typeIndex: null,
      type: 0,
    };
  }
  GetIdentityService = () => {
    GetIdentityService()
    .then((res) => {
      console.log(res);
      this.setState({
        items: res.data,
      });
    });
  }
  userIdentity = (index) => {
    const { items, typeIndex } = this.state;
    if (typeIndex === index) {
      return;
    }
    if (typeIndex !== null) {
      items[typeIndex].cur = false;
    }
    items[index].cur = true;
    this.setState({
      items,
      typeIndex: index,
    });
  }
  identityChange = (type) => {
    this.setState({
      type,
    });
  }
  submitData = () => {
    this.sleek.toggle();
    const { items, typeIndex, type } = this.state;
    if (typeIndex === null) {
      Toast.show('请选择身份');
      return;
    }
    console.log(items[typeIndex].identityId, type);
  }
}
export default AdjectiveInfoBase;
