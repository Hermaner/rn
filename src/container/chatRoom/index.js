import React from 'react';
import {
  Platform,
  DeviceEventEmitter,
  BackHandler,
  View,
  Text,
} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import uuid from 'uuid';
import KeyboardManager from 'react-native-keyboard-manager';
import PropTypes from 'prop-types';
import { popRoute, pushRoute } from '../../actions';
import AccessoryActions from './AccessoryActions';
import { Chat, ChatHeader, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.deleteInit();
    this.phraseEmit.remove();
    this.selectProduct.remove();
    this._isMounted = false;
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  renderAccessory(props) {
    return (
      <AccessoryActions
        {...props}
      />
    );
  }
  renderTop() {
    const { isProductSend, product: { productImgUrl, price, name } } = this.state;
    return (
      <View style={styles.chatTop}>
        <View style={styles.chatTopImgView}>
          <CachedImage source={{ uri: productImgUrl }} style={styles.chatTopImg} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.topName}>
            <Text numberOfLines={2} style={styles.topNameText}>{name}</Text>
          </View>
          <View style={styles.topPrice}>
            <Text style={styles.topPriceText}>￥{price}</Text>
            {
              isProductSend &&
              <TOpacity
                style={styles.topBtn}
                content={
                  <Text style={styles.topBtnText}>发送链接</Text>
                }
                onPress={this.sendProduct}
              />
            }
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { pop } = this.props;
    const { toUser, messages, chatStatus, product } = this.state;
    return (
      <Container>
        <ChatHeader titleLabel={chatStatus === '1'} back={pop} title={decodeURI(toUser.userName)} />
        {product && this.renderTop()}
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          deleteMsgList={this.deleteMsgList}
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
