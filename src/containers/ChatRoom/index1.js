
import { observer } from 'mobx-react/native';
import React from 'react';
import {
    Text,
    TextInput,
    View,
    FlatList,
    Keyboard,
} from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import KeyboardManager from 'react-native-keyboard-manager';
import { Footer, Container, Content, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { TOpacity, Header, NoData, Loading } from '../../components';
import base from './base';
import styles from './styles';
import { deviceH } from '../../utils';

@observer
class ChatRoom extends base {
  constructor(props: Object) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      ...this.state,
    };
  }
  // 不要和动画效果抢系统资源
  componentDidMount() {
    this.getInit();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    KeyboardManager.setEnable(false);
  }
  componentWillUnmount() {
  }
  _keyboardDidShow = (e) => {
    this.setState({
      keyboardHeight: e.startCoordinates.height,
    }, () => this.chatListView.scrollToEnd());
  }
  _keyboardDidHide = () => {
    this.setState({
      keyboardHeight: 0,
    });
  }
  // 判断用户是否输入过
  _userHasBeenInputed: boolean = false;
  _userReachEnd = true;
  _renderRow = (data) => {
    const { memberId, imgUrl, toImgUrl, message } = data.item;
    const isMine = memberId.toString() === global.memberId.toString();
    return (
      <View
        style={[styles.list, isMine && { flexDirection: 'row-reverse' }]}
      >
        <CachedImage
          source={{
            uri: isMine ? imgUrl : toImgUrl,
          }}
          style={styles.avatar}
        />
        <View style={[styles.sepView, !isMine && { flexDirection: 'row-reverse' }]}>
          <View style={styles.sepViewEnd} />
          <View
            style={[styles.contentView, isMine && { backgroundColor: '#92E649' }]}
          >
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
        <View style={styles.endBlankBlock} />
      </View>
    );
  }
  _renderContent() {
    const { refresh } = this.state;
    const items = global.socketStore.sessionList;
    console.log(items);
    return (
      <View style={styles.listContent}>
        <FlatList
          data={items}
          onLayout={(e) => {
            console.log(e.nativeEvent);
          }}
          style={{ borderWidth: 2 }}
          renderItem={this._renderRow}
          ref={(reference) => { this.chatListView = reference; }}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          onRefresh={this._onRefresh}
          refreshing={refresh}
          onEndReached={() => {
            this._userReachEnd = true;
          }}
          enableEmptySections
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
  _renderFooter() {
    const { inputValue, textInputHeight } = this.state;
    return (
      <Footer style={styles.bottomToolBar}>
        <Input
          // multiline
          style={[styles.input, {
            height: Math.max(40,
              textInputHeight < 180 ? textInputHeight : 180),
          }]}
          clearButtonMode="while-editing"
          value={inputValue}
          onSubmitEditing={this._onSubmitEditing}
          enablesReturnKeyAutomatically
          onContentSizeChange={
            (event) => {
              this.setState({ textInputHeight: event.nativeEvent.contentSize.height });
            }
          }
          onChangeText={(text) => {
            this.setState({ inputValue: text });
          }}
        />
        <TOpacity
          style={styles.sendButton}
          content={
            <View>
              <Text style={styles.sendButtonText}>发送</Text>
            </View>
          }
          onPress={this._onSubmitEditing}
        />
      </Footer>
    );
  }
  render() {
    const { toUser, keyboardHeight } = this.state;
    const { pop } = this.props;
    return (
      <View style={{ height: deviceH - keyboardHeight }}>
        <Header back={pop} title={decodeURI(toUser.userName)} />
        <View style={{ flex: 1 }}>
          {this._renderContent()}
        </View>
        {this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}

ChatRoom.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChatRoom);
