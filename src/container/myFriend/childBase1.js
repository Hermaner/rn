import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetIntentionMemberService, CreateMemberFollowService, DeleteMemberFollowService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isFollow: false,
    };
  }
  getData = () => {
    this.sleek.toggle();
    GetIntentionMemberService({
      memberId: global.memberId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          items: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  isFollow = (otherMemeber) => {
    const { isFollow } = this.state;
    if (!isFollow) {
      this.CreateFollow(otherMemeber);
    } else {
      this.DeleteFollow(otherMemeber);
    }
  }
  CreateFollow = (otherMemeber) => {
    this.sleek.toggle();
    CreateMemberFollowService({
      memberId: global.memberId,
      byFollowMemberId: otherMemeber,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          isFollow: true,
        }, this.getData);
        Toast.show('已关注该用户');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  DeleteFollow = (otherMemeber) => {
    this.sleek.toggle();
    DeleteMemberFollowService({
      memberId: global.memberId,
      byFollowMemberId: otherMemeber,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('已取消关注该用户');
        this.setState({
          isFollow: false,
        }, this.getData);
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func,
};

export default Base;
