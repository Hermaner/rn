import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
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
  chatPeople = (item) => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (item.purchase.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: item.purchase.memberId,
          userName: decodeURI(item.purchase.nickName),
          imgUrl: item.purchase.imgUrl,
        },
      },
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
