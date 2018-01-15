/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 * 聊天室
 *
 * TODO: 聊天室有两次渲染问题
 */
import { observer } from 'mobx-react/native';
import uuid from 'uuid';
import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    RefreshControl,
    StyleSheet,
    ListView,
    Image,
    Text,
    TextInput,
    Platform,
    View,
} from 'react-native';
import {
    FontSize,
    Color,
    Button,
} from '../../components/UiLibrary';

import {
    socketStore,
    profileStore,
} from '../../components/socket/storeSingleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Color.BackgroundGrey,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Color.LittleGrey,
  },
  sendButton: {
    marginHorizontal: 10,
    backgroundColor: Color.WechatGreen,
    borderColor: Color.WechatGreen,
  },
  sendButtonText: {
    color: Color.White,
  },
  input: {
    flex: 1,
    color: Color.Black,
    fontSize: FontSize.Main,
    padding: 10,
  },
  messageCell: {
    marginTop: 5,
    marginBottom: 5,
  },
  messageCellText: {
    fontSize: FontSize.Content,
  },
  avatar: {
    borderRadius: 4,
    margin: 5,
    width: 40,
    height: 40,
  },
  contentView: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flex: 1,
    margin: 5,
    justifyContent: 'center',
  },
  endBlankBlock: {
    margin: 5,
    width: 50,
    height: 40,
  },
});
@observer
class ChatRoom extends Component {
  constructor(props: Object) {
    super(props);
    this.toInfo = props.navigation.state.params.toInfo;
    this.firstEnter = 0;
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid,
    });
    this.state = {
      textInputHeight: 40,
      inputValue: '',
      refreshing: false,
    };
  }
  state: Object;
  // 不要和动画效果抢系统资源
  componentDidMount() {
    socketStore.currentChatKey = `${profileStore.userInfo.userId}-${this.toInfo.userId}`;
    socketStore.fillCurrentChatRoomHistory();
  }
  componentWillUnmount() {
    socketStore.clearUnReadMessageCount(socketStore.currentChatKey);
    socketStore.currentChatKey = null;
  }
  // 接收者 ID
  toInfo: Object;
  firstEnter: number;
  ds: Object;
  rows: Object[];
  currentMaxRowId: number = 0;
  chatListView: Object;

  // 判断用户是否输入过
  _userHasBeenInputed: boolean = false;
  _userAtPage = 0;
  _userReachEnd = true;
  _scrollToBottom = () => {
    const scrollProperties = this.chatListView.scrollProperties;
    // 如果组件没有挂载完全，则不进行内容偏移
    if (!scrollProperties.visibleLength) { return; }

    // 如果是刷新操作，则不进行滑动
    if (!this._userReachEnd) {
      return;
    }

    // 如果组件内元素还没渲染完全，则不进行底部偏移
    if (socketStore.currentChatRoomHistory.length - this.currentMaxRowId > 11) {
      return;
    }

    // 这里是一个大坑，在测试环境的时候，由于运行速度较慢，scrollProperties.contentLength 总能
    // 获取到正确的值，生产环境需要加个延时，用来保证 `renderRow` 执行完毕
    // 这里设置了 130ms 的延时
    setTimeout(() => {
      const offsetY = scrollProperties.contentLength - scrollProperties.visibleLength;
      this.chatListView.scrollTo({
        y: offsetY > 0 ? offsetY : 0,
        animated: this._userHasBeenInputed,
      });
    }, this._userHasBeenInputed ? 0 : 130);
  }
  _onSubmitEditing = () => {
    this._userHasBeenInputed = true;
    // 数据组装
    const { userInfo } = profileStore;
    const payload = {
      from: userInfo.userId,
      to: this.toInfo.userId,
      uuid: uuid.v4(),
      msg: {
        type: 'txt',
        content: this.state.inputValue,
      },
      ext: {
        avatar: userInfo.avatar,
        name: userInfo.name,
      },
    };
    this.setState({ inputValue: '' });
    // 远程发送
    console.log(payload)
    socketStore.socket.emit('message', [payload]);
    // 本地会话列表更新
    socketStore.pushLocalePayload(Object.assign({
      localeExt: {
        toInfo: this.toInfo,
      },
    }, payload));
  }

  _renderRow = (row, sectionID, rowId) => {
    this.currentMaxRowId = +rowId;
    return (
      <MessageCell
        key={`cell-${rowId}`}
        currentUser={profileStore.userInfo.userId}
        message={row}
      />
    );
  }
  _onPullMessage = async () => {
    this._userReachEnd = false;
    this.setState({
      refreshing: true,
    });
    // 历史消息推入
    await socketStore.fillCurrentChatRoomHistory(this._userAtPage += 1, 8);
    this.setState({
      refreshing: false,
    });
  }
  render() {
    console.log(socketStore.currentChatRoomHistory)
    console.log(socketStore.currentChatRoomHistory.slice())
    const content = (
      <View style={styles.container}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onPullMessage}
            />
          }
          onEndReached={() => {
            this._userReachEnd = true;
          }}
          onEndReachedThreshold={10}
          ref={(reference) => { this.chatListView = reference; }}
          dataSource={this.ds.cloneWithRows(socketStore.currentChatRoomHistory.slice())}
          enableEmptySections
          onLayout={this._scrollToBottom}
          onContentSizeChange={this._scrollToBottom}
          renderRow={this._renderRow}
        />
        <View style={styles.bottomToolBar}>
          <TextInput
            style={[styles.input, {
              height: Math.max(40,
                this.state.textInputHeight < 180 ? this.state.textInputHeight : 180),
            }]}
            multiline
            controlled
            underlineColorAndroid="transparent"
            returnKeyType="default"
            value={this.state.inputValue}
            placeholder="Type here to send message"
            // ios only
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

          <Button
            style={styles.sendButton}
            textStyle={styles.sendButtonText}
            disabled={!this.state.inputValue}
            onPress={this._onSubmitEditing}
          >
            发送
          </Button>
        </View>
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


const MessageCell = ({ currentUser, message }) => {
  let differentStyle = {};
  if (message.from === currentUser) {
    differentStyle = {
      flexDirection: 'row-reverse',
      backgroundColor: '#92E649',
    };
  } else {
    differentStyle = {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
    };
  }
  return (
    <View
      style={[styles.messageCell, { flexDirection: differentStyle.flexDirection }]}
    >
      <Image
        source={{
          uri: message.ext.avatar,
        }}
        style={styles.avatar}
      />
      <View
        style={[styles.contentView, { backgroundColor: differentStyle.backgroundColor }]}
      >
        <Text style={styles.messageCellText}>{message.msg.content}</Text>
      </View>
      <View style={styles.endBlankBlock} />
    </View>
  );
};
export default ChatRoom;
