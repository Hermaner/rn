/* eslint
    no-param-reassign: 0,
    no-use-before-define: ["error", { "variables": false }],
    no-return-assign: 0,
    no-mixed-operators: 0,
    react/sort-comp: 0
*/

import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Platform, StyleSheet, View, Text } from 'react-native';

import ActionSheet from '@expo/react-native-action-sheet';
import moment from 'moment';
import uuid from 'uuid';
import { Icon } from 'native-base';

import * as utils from './utils';
import Avatar from './Avatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import MessageImage from './MessageImage';
import MessageText from './MessageText';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import LoadEarlier from './LoadEarlier';
import Message from './Message';
import MessageContainer from './MessageContainer';
import Send from './Send';
import Time from './Time';
import { st, Mcolor } from '../../utils';

import {
  MIN_COMPOSER_HEIGHT,
  MAX_COMPOSER_HEIGHT,
  TIME_FORMAT,
  DATE_FORMAT,
} from './Constant';

class GiftedChat extends React.Component {

  constructor(props) {
    super(props);

    // default values
    this._isMounted = false;
    this._keyboardHeight = 0;
    this._bottomOffset = 0;
    this._maxHeight = null;
    this._isFirstLayout = true;
    this._locale = 'en';
    this._messages = [];

    this.state = {
      isInitialized: false, // initialization will calculate maxHeight before rendering the chat
      composerHeight: MIN_COMPOSER_HEIGHT,
      messagesContainerHeight: null,
      accessoryContainerHeight: 0,
      typingDisabled: false,
      audioHeight: new Animated.Value(80),
      isAudioShow: false,
      isAudioTab: false,
      isAudioTipShow: false,
      isAudioTipUp: false,
    };

    this.onKeyboardWillShow = this.onKeyboardWillShow.bind(this);
    this.onKeyboardWillHide = this.onKeyboardWillHide.bind(this);
    this.onKeyboardDidShow = this.onKeyboardDidShow.bind(this);
    this.onKeyboardDidHide = this.onKeyboardDidHide.bind(this);
    this.onSend = this.onSend.bind(this);
    this.getLocale = this.getLocale.bind(this);
    this.onInputSizeChanged = this.onInputSizeChanged.bind(this);
    this.onInputTextChanged = this.onInputTextChanged.bind(this);
    this.onMainViewLayout = this.onMainViewLayout.bind(this);
    this.onInitialLayoutViewLayout = this.onInitialLayoutViewLayout.bind(this);

    this.invertibleScrollViewProps = {
      inverted: this.props.inverted,
      keyboardShouldPersistTaps: this.props.keyboardShouldPersistTaps,
      onKeyboardWillShow: this.onKeyboardWillShow,
      onKeyboardWillHide: this.onKeyboardWillHide,
      onKeyboardDidShow: this.onKeyboardDidShow,
      onKeyboardDidHide: this.onKeyboardDidHide,
    };
  }

  static append(currentMessages = [], messages, inverted = true) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    return inverted ? messages.concat(currentMessages) : currentMessages.concat(messages);
  }

  static prepend(currentMessages = [], messages, inverted = true) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    return inverted ? currentMessages.concat(messages) : messages.concat(currentMessages);
  }

  getChildContext() {
    return {
      actionSheet: () => this._actionSheetRef,
      getLocale: this.getLocale,
    };
  }

  componentWillMount() {
    const { messages, text } = this.props;
    this.setIsMounted(true);
    this.initLocale();
    this.setMessages(messages || []);
    this.setTextFromProp(text);
  }

  componentWillUnmount() {
    this.setIsMounted(false);
  }

  componentWillReceiveProps(nextProps = {}) {
    const { messages, text } = nextProps;
    this.setMessages(messages || []);
    this.setTextFromProp(text);
  }

  initLocale() {
    if (this.props.locale === null || moment.locales().indexOf(this.props.locale) === -1) {
      this.setLocale('en');
    } else {
      this.setLocale(this.props.locale);
    }
  }

  setLocale(locale) {
    this._locale = locale;
  }

  getLocale() {
    return this._locale;
  }

  setTextFromProp(textProp) {
    // Text prop takes precedence over state.
    if (textProp !== undefined && textProp !== this.state.text) {
      this.setState({ text: textProp });
    }
  }
  audioTipShow = (isAudioTipShow) => {
    this.setState({
      isAudioTipShow,
    });
  }
  audioTipUp = (isAudioTipUp) => {
    this.setState({
      isAudioTipUp,
    });
  }
  tabAudio = (isAudioTab) => {
    this.setState({
      isAudioTab,
    });
  }
  setAudioShow = (isAudioShow) => {
    this.setState({
      isAudioShow,
    });
    if (isAudioShow) {
      this.setState({
        isAudioShow: true,
      }, () => {
        Animated.timing(
          this.state.audioHeight,
          {
            toValue: 0,
            duration: 200,
          },
        ).start();
      });
    } else {
      setTimeout(() => {
        this.setState({
          modalVisible: false,
        });
      }, 200);
      Animated.timing(
        this.state.audioHeight,
        {
          toValue: 80,
          duration: 200,
        },
      ).start();
    }
  }
  getTextFromProp(fallback) {
    if (this.props.text === undefined) {
      return fallback;
    }
    return this.props.text;
  }

  setMessages(messages) {
    this._messages = messages;
  }

  getMessages() {
    return this._messages;
  }

  setMaxHeight(height) {
    this._maxHeight = height;
  }

  getMaxHeight() {
    return this._maxHeight;
  }

  setKeyboardHeight(height) {
    this._keyboardHeight = height;
  }

  getKeyboardHeight() {
    if (Platform.OS === 'android' && !this.props.forceGetKeyboardHeight) {
      return 0;
    }
    return this._keyboardHeight;
  }


  setBottomOffset(value) {
    this._bottomOffset = value;
  }

  getBottomOffset() {
    return this._bottomOffset;
  }

  setIsFirstLayout(value) {
    this._isFirstLayout = value;
  }

  getIsFirstLayout() {
    return this._isFirstLayout;
  }

  setIsTypingDisabled(value) {
    this.setState({
      typingDisabled: value,
    });
  }

  getIsTypingDisabled() {
    return this.state.typingDisabled;
  }

  setIsMounted(value) {
    this._isMounted = value;
  }

  getIsMounted() {
    return this._isMounted;
  }

  // TODO: setMinInputToolbarHeight
  getMinInputToolbarHeight() {
    return this.props.renderAccessory
      ? this.props.minInputToolbarHeight * 3
      : this.props.minInputToolbarHeight;
  }
  calculateInputToolbarHeight(composerHeight) {
    return composerHeight + (this.getMinInputToolbarHeight() - MIN_COMPOSER_HEIGHT);
  }

  /**
   * Returns the height, based on current window size, without taking the keyboard into account.
   */
  getBasicMessagesContainerHeight(composerHeight = this.state.composerHeight) {
    return this.getMaxHeight() - this.calculateInputToolbarHeight(composerHeight);
  }

  /**
   * Returns the height, based on current window size, taking the keyboard into account.
   */
  getMessagesContainerHeightWithKeyboard(composerHeight = this.state.composerHeight) {
    return this.getBasicMessagesContainerHeight(composerHeight) - this.getKeyboardHeight()
    + this.getBottomOffset();
  }

  prepareMessagesContainerHeight(value) {
    if (this.props.isAnimated === true) {
      return new Animated.Value(value);
    }
    return value;
  }
  showAccessory = () => {
    this.setState({
      accessoryContainerHeight: 240,
    });
  }
  hideAccessory = () => {
    this.setState({
      accessoryContainerHeight: 0,
    });
    // Animated.timing(this.state.accessoryContainerHeight, {
    //   toValue: 0,
    //   duration: 210,
    // }).start();
  }
  onKeyboardWillShow(e) {
    this.setIsTypingDisabled(true);
    this.setAudioShow(false);
    this.showAccessory();
    this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
    this.setBottomOffset(this.props.bottomOffset);
    const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard();
    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesContainerHeight, {
        toValue: newMessagesContainerHeight,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesContainerHeight: newMessagesContainerHeight,
      });
    }
  }

  onKeyboardWillHide() {
    this.setAudioShow(false);
    this.setIsTypingDisabled(true);
    this.setKeyboardHeight(0);
    this.setBottomOffset(0);
    // this.hideAccessory();
    const newMessagesContainerHeight = this.getBasicMessagesContainerHeight();
    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesContainerHeight, {
        toValue: newMessagesContainerHeight,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesContainerHeight: newMessagesContainerHeight,
      });
    }
  }

  onKeyboardDidShow(e) {
    if (Platform.OS === 'android') {
      this.onKeyboardWillShow(e);
    }
    this.setIsTypingDisabled(false);
  }

  onKeyboardDidHide(e) {
    if (Platform.OS === 'android') {
      this.onKeyboardWillHide(e);
    }
    this.setIsTypingDisabled(false);
  }

  scrollToBottom(animated = true) {
    if (this._messageContainerRef === null) {
      return;
    }
    this._messageContainerRef.scrollTo({ y: 0, animated });
  }


  renderMessages() {
    const AnimatedView = this.props.isAnimated === true ? Animated.View : View;
    return (
      <AnimatedView
        style={{
          height: this.state.messagesContainerHeight,
        }}
      >
        <MessageContainer
          {...this.props}
          invertibleScrollViewProps={this.invertibleScrollViewProps}
          messages={this.getMessages()}
          ref={component => (this._messageContainerRef = component)}

        />
        {this.renderChatFooter()}
      </AnimatedView>
    );
  }

  onSend(messages = [], shouldResetInputToolbar = false) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    messages = messages.map(message => (
      {
        ...message,
        status: '1', // 1: 发送中2：发送成功未读：3对方已读4:发送失败
        user: this.props.user,
        createdAt: new Date().getTime(),
        _id: this.props.messageIdGenerator(),
      }
    ));
    if (shouldResetInputToolbar === true) {
      this.setIsTypingDisabled(true);
      this.resetInputToolbar();
    }

    this.props.onSend(messages);
    this.scrollToBottom();

    if (shouldResetInputToolbar === true) {
      setTimeout(() => {
        if (this.getIsMounted() === true) {
          this.setIsTypingDisabled(false);
        }
      }, 100);
    }
  }

  resetInputToolbar() {
    if (this.textInput) {
      this.textInput.clear();
    }
    this.notifyInputTextReset();
    const newComposerHeight = MIN_COMPOSER_HEIGHT;
    const newMessagesContainerHeight =
    this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
    this.setState({
      text: this.getTextFromProp(''),
      composerHeight: newComposerHeight,
      messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
    });
  }

  focusTextInput() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  onInputSizeChanged(size) {
    const newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT,
      Math.min(MAX_COMPOSER_HEIGHT, size.height));
    const newMessagesContainerHeight =
    this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
    this.setState({
      composerHeight: newComposerHeight,
      messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
    });
  }

  onInputTextChanged(text) {
    if (this.getIsTypingDisabled()) {
      return;
    }
    if (this.props.onInputTextChanged) {
      this.props.onInputTextChanged(text);
    }
    // Only set state if it's not being overridden by a prop.
    if (this.props.text === undefined) {
      this.setState({ text });
    }
  }

  notifyInputTextReset() {
    if (this.props.onInputTextChanged) {
      this.props.onInputTextChanged('');
    }
  }

  onInitialLayoutViewLayout(e) {
    const { layout } = e.nativeEvent;
    if (layout.height <= 0) {
      return;
    }
    this.notifyInputTextReset();
    this.setMaxHeight(layout.height);
    const newComposerHeight = MIN_COMPOSER_HEIGHT;
    const newMessagesContainerHeight =
    this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
    this.setState({
      isInitialized: true,
      text: this.getTextFromProp(''),
      composerHeight: newComposerHeight,
      messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
    });
  }

  onMainViewLayout(e) {
    // fix an issue when keyboard is dismissing during the initialization
    const { layout } = e.nativeEvent;
    if (this.getMaxHeight() !== layout.height || this.getIsFirstLayout() === true) {
      this.setMaxHeight(layout.height);
      this.setState({
        messagesContainerHeight:
        this.prepareMessagesContainerHeight(this.getBasicMessagesContainerHeight()),
      });
    }
    if (this.getIsFirstLayout() === true) {
      this.setIsFirstLayout(false);
    }
  }

  renderInputToolbar() {
    const inputToolbarProps = {
      ...this.props,
      text: this.getTextFromProp(this.state.text),
      composerHeight: Math.max(MIN_COMPOSER_HEIGHT, this.state.composerHeight),
      onSend: this.onSend,
      isAudioShow: this.state.isAudioShow,
      isAudioTab: this.state.isAudioTab,
      audioHeight: this.state.audioHeight,
      setAudioShow: this.setAudioShow,
      audioTipShow: this.audioTipShow,
      audioTipUp: this.audioTipUp,
      tabAudio: this.tabAudio,
      accessoryContainerHeight: this.state.accessoryContainerHeight,
      onInputSizeChanged: this.onInputSizeChanged,
      onTextChanged: this.onInputTextChanged,
      textInputProps: {
        ...this.props.textInputProps,
        ref: textInput => (this.textInput = textInput),
        maxLength: this.getIsTypingDisabled() ? 0 : this.props.maxInputLength,
      },
    };
    if (this.props.renderInputToolbar) {
      return this.props.renderInputToolbar(inputToolbarProps);
    }
    return (
      <InputToolbar
        {...inputToolbarProps}
      />
    );
  }

  renderChatFooter() {
    if (this.props.renderChatFooter) {
      const footerProps = {
        ...this.props,
      };
      return this.props.renderChatFooter(footerProps);
    }
    return null;
  }
  audioTipShow = (isAudioTipShow) => {
    this.setState({
      isAudioTipShow,
    });
  }
  audioTipUp = (isAudioTipUp) => {
    this.setState({
      isAudioTipUp,
    });
  }
  renderAudioTips() {
    const { isAudioTipUp } = this.state;
    return (
      <View style={styles.audioContent}>
        <View style={styles.audioTips}>
          <View style={styles.audioIconView}>
            <Icon name={isAudioTipUp ? 'ios-undo-outline' : 'ios-microphone-outline'} style={styles.audioTipsIcon} />
          </View>
          <View style={[styles.audioTipsView, isAudioTipUp && { backgroundColor: Mcolor }]}>
            <Text style={styles.audioTipsText}>
              {isAudioTipUp ? '手指松开，取消发送' : '手指上滑，取消发送'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  renderLoading() {
    if (this.props.renderLoading) {
      return this.props.renderLoading();
    }
    return null;
  }

  render() {
    const { isAudioTipShow } = this.state;
    if (this.state.isInitialized === true) {
      return (
        <ActionSheet ref={component => (this._actionSheetRef = component)}>
          <View style={styles.container} onLayout={this.onMainViewLayout}>
            {this.renderMessages()}
            {this.renderInputToolbar()}
            {isAudioTipShow && this.renderAudioTips()}
          </View>
        </ActionSheet>
      );
    }
    return (
      <View style={styles.container} onLayout={this.onInitialLayoutViewLayout}>
        {this.renderLoading()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioContent: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 90,
    ...st.jacenter,
  },
  audioTips: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
  },
  audioIconView: {
    height: 110,
    ...st.jacenter,
  },
  audioTipsIcon: {
    fontSize: 60,
    color: '#fff',
  },
  audioTipsView: {
    height: 24,
    marginLeft: 10,
    marginRight: 10,
    ...st.jacenter,
  },
  audioTipsText: {
    fontSize: 12,
    color: '#fff',
  },
});

GiftedChat.childContextTypes = {
  actionSheet: PropTypes.func,
  getLocale: PropTypes.func,
};

GiftedChat.defaultProps = {
  messages: [],
  text: undefined,
  messageIdGenerator: () => uuid.v4(),
  user: {},
  onSend: () => { },
  locale: null,
  timeFormat: TIME_FORMAT,
  dateFormat: DATE_FORMAT,
  isAnimated: Platform.select({
    ios: true,
    android: false,
  }),
  loadEarlier: false,
  onLoadEarlier: () => { },
  isLoadingEarlier: false,
  renderLoading: null,
  renderLoadEarlier: null,
  renderAvatar: undefined,
  showUserAvatar: false,
  renderAvatarOnTop: false,
  renderBubble: null,
  renderSystemMessage: null,
  onLongPress: null,
  renderMessage: null,
  renderMessageText: null,
  renderMessageImage: null,
  imageProps: {},
  lightboxProps: {},
  textInputProps: {},
  listViewProps: {},
  renderCustomView: null,
  renderDay: null,
  renderTime: null,
  renderFooter: null,
  renderChatFooter: null,
  renderInputToolbar: null,
  renderComposer: null,
  renderActions: null,
  renderSend: null,
  renderAccessory: null,
  onPressActionButton: null,
  bottomOffset: 0,
  minInputToolbarHeight: 44,
  keyboardShouldPersistTaps: Platform.select({
    ios: 'never',
    android: 'always',
  }),
  onInputTextChanged: null,
  maxInputLength: null,
  forceGetKeyboardHeight: false,
  inverted: true,
};

GiftedChat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  text: PropTypes.string,
  messageIdGenerator: PropTypes.func,
  user: PropTypes.object,
  onSend: PropTypes.func,
  locale: PropTypes.string,
  isAnimated: PropTypes.bool,
  renderLoading: PropTypes.func,
  renderChatFooter: PropTypes.func,
  renderInputToolbar: PropTypes.func,
  renderAccessory: PropTypes.func,
  bottomOffset: PropTypes.number,
  minInputToolbarHeight: PropTypes.number,
  keyboardShouldPersistTaps: PropTypes.oneOf(['always', 'never', 'handled']),
  onInputTextChanged: PropTypes.func,
  maxInputLength: PropTypes.number,
  forceGetKeyboardHeight: PropTypes.bool,
  inverted: PropTypes.bool,
  textInputProps: PropTypes.object,
};

export default {
  GiftedChat,
  Avatar,
  Bubble,
  SystemMessage,
  MessageImage,
  MessageText,
  Composer,
  Day,
  InputToolbar,
  LoadEarlier,
  Message,
  MessageContainer,
  Send,
  Time,
  utils,
};
