import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { UpdateMessageIsReadService } from '../../api';

class NotificationSystemDetailBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      item: '',
    };
  }
  getInit = () => {
    const { item } = this.props.navigation.state.params;
    this.setState({
      item,
    }, this.getData);
  }
  getData = () => {
    const { item } = this.state;
    UpdateMessageIsReadService({
      messageId: item.messageId,
    }).then((res) => {
      if (res.isSuccess) {
        DeviceEventEmitter.emit('notificationSystem');
        console.log(res);
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
NotificationSystemDetailBase.propTypes = {
  navigation: PropTypes.object,
};
export default NotificationSystemDetailBase;
