
import { observer } from 'mobx-react/native';
import React from 'react';
import {
    KeyboardAvoidingView,
    RefreshControl,
    ListView,
    Image,
    Text,
    TextInput,
    Platform,
    View,
} from 'react-native';
import { Footer } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

@observer
class ChatRoom extends base {
  constructor(props: Object) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  // 不要和动画效果抢系统资源
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  // 判断用户是否输入过
  _userHasBeenInputed: boolean = false;
  _userAtPage = 0;
  _userReachEnd = true;
  _renderRow = (row, sectionID, index) => {
    let differentStyle = {};
    let item = {};
    if (row.user.memberId === global.memberId) {
      differentStyle = {
        flexDirection: 'row-reverse',
        backgroundColor: '#92E649',
      };
      item = row.user;
    } else {
      differentStyle = {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
      };
      item = row.toUser;
    }
    return (
      <View
        style={[styles.messageCell, { flexDirection: differentStyle.flexDirection }]}
        key={index}
      >
        <Image
          source={{
            uri: item.imgUrl,
          }}
          style={styles.avatar}
        />
        <View style={styles.sepView}>
          <View style={styles.sepViewEnd} />
          <View
            style={[styles.contentView, { backgroundColor: differentStyle.backgroundColor }]}
          >
            <Text style={styles.messageCellText}>{row.message.message}</Text>
          </View>
        </View>
        <View style={styles.endBlankBlock} />
      </View>
    );
  }
  render() {
    const { ds, inputValue, textInputHeight, refreshing, toUser } = this.state;
    const { pop } = this.props;
    const lists = global.socketStore.sessionList;
    console.log(lists);
    const dataSource = ds.cloneWithRows(lists);
    const content = (
      <View style={styles.container}>
        <Header back={pop} title={decodeURI(toUser.nickName)} />
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onPullMessage}
            />
          }
          onEndReached={() => {
            this._userReachEnd = true;
          }}
          onEndReachedThreshold={10}
          ref={(reference) => { this.chatListView = reference; }}
          dataSource={dataSource}
          enableEmptySections
          onLayout={this._scrollToBottom}
          onContentSizeChange={this._scrollToBottom}
          renderRow={this._renderRow}
        />
        <Footer style={styles.bottomToolBar}>
          <TextInput
            style={[styles.input, {
              height: Math.max(40,
                textInputHeight < 180 ? textInputHeight : 180),
            }]}
            multiline
            controlled
            underlineColorAndroid="transparent"
            returnKeyType="default"
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
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.KeyboardAvoidingView}
          keyboardVerticalOffset={this.props.keyboardVerticalOffset || 64}
        >
          {content}
        </KeyboardAvoidingView>
      );
    }
    return content;
  }
}

ChatRoom.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChatRoom);
