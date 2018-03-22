import React from 'react';
import Communications from 'react-native-communications';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: '1',
        title: '主营',
        last: false,
        label: '',
        isIcn: false,
      }, {
        id: '1',
        title: '所在地',
        last: false,
        label: '',
        isIcn: false,
      }, {
        id: '1',
        title: '注册时间',
        last: false,
        label: '2017-12-3',
        isIcn: false,
      }, {
        id: '1',
        title: '备注',
        last: false,
        label: '',
        isIcn: true,
      }],
      items2: [{
        id: '1',
        title: '实名认证',
        icn: 'arrow-back',
      }, {
        id: '1',
        title: '企业认证',
        icn: 'arrow-back',
      }, {
        id: '1',
        title: '实地认证',
        icn: 'arrow-back',
      }, {
        id: '1',
        title: '买家保障',
        icn: 'arrow-back',
      }],
      isHidden: false,
    };
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
  };
  tellPhone = (phone) => {
    Communications.phonecall(phone, false);
  }
}
export default Base;
