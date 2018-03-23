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
import AccessoryActions from './AccessoryActions';
import { Chat, Header } from '../../components';
import base from './base';

const { GiftedChat } = Chat;
class ChatRoom extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
    this._isMounted = false;
  }

  componentWillMount() {
    this._isMounted = true;
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(false);
    }
    this.phraseEmit = DeviceEventEmitter.addListener('phraseEmit', (text) => {
      this.onSend([{
        text,
        type: '1',
        status: '1',
        user: this.renderUser(),
        createdAt: new Date().getTime(),
        _id: uuid.v4(),
      }]);
    });
    this.selectProduct = DeviceEventEmitter.addListener('selectProduct', (order) => {
      this.onSend([{
        order,
        type: '3',
        status: '1',
        user: this.renderUser(),
        createdAt: new Date().getTime(),
        _id: uuid.v4(),
      }]);
    });
    this.getInit();
  }

  componentWillUnmount() {
    this.phraseEmit.remove();
    this.selectProduct.remove();
    this.deleteInit();
    this._isMounted = false;
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
    console.log(toUser);
    return (
      <Container>
        <Header back={pop} title={decodeURI(toUser.userName)} />
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          showImage={this.showImage}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          onProductPress={this.onProductPress}
          onPressAvatar={this.onPressAvatar}
          isLoadingEarlier={this.state.isLoadingEarlier}
          renderAccessory={this.renderAccessory}
          user={this.renderUser()}
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
