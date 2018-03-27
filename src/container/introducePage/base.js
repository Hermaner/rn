import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        id: '1',
        title: '买家保障',
        label: '缴纳诚信保证金并承诺提供买家保障服务',
        labelTitle: '',
        isHave: true,
      }, {
        id: '1',
        title: '个人实名认证',
        label: '个人实名认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '企业认证',
        label: '企业认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '实地认证',
        label: '实地考察认证',
        labelTitle: '申请认证',
        isHave: true,
      }],
      beMemberId: '',
      supplyId: '',
    };
  }
  listPush = (index) => {
    const { push } = this.props;
    switch (index) {
      case 0:
        push();
        break;
      case 1:
        push({ key: global.memberId ? 'IndividualAuthentication' : 'User' });
        break;
      case 2:
        push({ key: global.memberId ? 'CollectiveAuthentication' : 'User' });
        break;
      case 3:
        push(); // EnlistBusiness
        break;
      default:
    }
    this.ModalView.closeModal();
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
