import React from 'react';
import {
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import uuid from 'uuid';
import KeyboardManager from 'react-native-keyboard-manager';
import PropTypes from 'prop-types';
import { popRoute, pushRoute } from '../../actions';
import CustomActions from './CustomActions';
import AccessoryActions from './AccessoryActions';
import { Chat, Header } from '../../components';
import base from './base';

const { GiftedChat, Actions } = Chat;
class ChatRoom extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
    this._isMounted = false;
    this.renderCustomActions = this.renderCustomActions.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(false);
    }
    DeviceEventEmitter.addListener('phraseEmit', (text) => {
      this.onSend({
        text,
        type: '1',
        status: '1',
        user: this.renderUser(),
        createdAt: new Date().getTime(),
        _id: uuid.v4(),
      });
    });
    this.getInit();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  onLoadEarlier = () => {
    this.setState({
      isLoadingEarlier: true,
    });
    if (this._isMounted === true) {
      this.loadMore();
    }
  }
  onProductPress = (id) => {
    console.log(id)
  }
  goAccessory = (index) => {
    console.log(index);
    switch (index) {
      case 0:

        break;
      default:
    }
  }
  onSend = (messages = []) => {
    console.log(messages);
    global.socketStore.socket.emit('sendMessage', messages);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    global.socketStore.socket.emit('sendGetChatList');
  }
  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }
  renderUser = () => {
    const { toUser } = this.state;
    const { memberId, imgUrl, userName } = global.userData;
    return {
      _id: memberId.toString(),
      userName,
      avatar: imgUrl,
      toId: toUser.memberId.toString(),
      toUserName: toUser.userName,
      toAvatar: toUser.imgUrl,
    };
  }
  renderAccessory(props) {
    return (
      <AccessoryActions
        {...props}
      />
    );
  }
  render() {
    const { pop } = this.props;
    const { toUser, messages } = this.state;
    return (
      <Container>
        <Header back={pop} title={decodeURI(toUser.userName)} />
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          onProductPress={this.onProductPress}
          isLoadingEarlier={this.state.isLoadingEarlier}
          renderAccessory={this.renderAccessory}
          user={this.renderUser()}
          renderActions={this.renderCustomActions}
        />
      </Container>
    );
  }
}

ChatRoom.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChatRoom);
