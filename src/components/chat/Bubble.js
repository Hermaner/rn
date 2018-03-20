/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  Clipboard,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ViewPropTypes,
} from 'react-native';
import { Icon } from 'native-base';
import Sound from 'react-native-sound';

import MessageImage from './MessageImage';
import Color from './Color';
import TOpacity from '../TOpacity';
import { st, Mcolor } from '../../utils';

import { isSameUser, isSameDay } from './utils';

export default class Bubble extends React.Component {

  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  onLongPress() {
    const options = ['复制', '取消'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(this.props.currentMessage.text);
            break;
          default:
            break;
        }
      },
    );
  }
  handleBubbleToNext() {
    if (
      isSameUser(this.props.currentMessage, this.props.nextMessage) &&
      isSameDay(this.props.currentMessage, this.props.nextMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToNext,
        this.props.containerToNextStyle[this.props.position],
      ]);
    }
    return null;
  }

  handleBubbleToPrevious() {
    if (
      isSameUser(this.props.currentMessage, this.props.previousMessage) &&
      isSameDay(this.props.currentMessage, this.props.previousMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToPrevious,
        this.props.containerToPreviousStyle[this.props.position],
      ]);
    }
    return null;
  }
  _play = async (url) => {
    if (global.sound) {
      global.sound.stop();
    }
    const index = url.lastIndexOf('/') + 1;
    const key = url.substr(index);
    const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${key}`;
    RNFetchBlob.fs.exists(path)
    .then((exist) => {
      if (!exist) {
        RNFetchBlob.config({
          fileCache: true,
          path,
        })
        .fetch('GET', url, {
        })
        .then(() => {
          this.readSound(path);
        });
      } else {
        this.readSound(path);
      }
    })
    .catch(err => console.log(err));
  }
  readSound = (path) => {
    global.sound = new Sound(path, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
      console.log('chenggong');
    });
    setTimeout(() => {
      global.sound.play((success) => {
        if (success) {
          global.sound = null;
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 100);
  }
  renderMessageText() {
    const { currentMessage: { type }, position } = this.props;
    if (type === '1') {
      return (
        <View style={[styles.messageTextView, position === 'left' && { backgroundColor: '#fff' }]}>
          <Text style={styles.left.text}>
            {this.props.currentMessage.text}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderMessageImage() {
    const { type } = this.props.currentMessage;
    if (type === '2') {
      return <MessageImage {...this.props} />;
    }
    return null;
  }
  renderMessageProduct() {
    const { type } = this.props.currentMessage;
    if (type === '3') {
      // const { order: { id, title, imgUrl, price } } = this.props.currentMessage;
      const title = 'asdak=斯柯达拉开大龙大厦科利达恐龙当家阿达肯定是撒了口袋里卡山东省';
      const price = '23';
      const imgUrl = 'https://img.mm.sunhousm.cn/2018228113127873.jpg';
      const id = 1;
      return (
        <TOpacity
          style={styles.productTab}
          content={
            <View style={styles.product}>
              <View style={styles.imageview}>
                <Image
                  style={styles.image}
                  source={{ uri: imgUrl }}
                />
              </View>
              <View style={styles.rightProduct}>
                <Text numberOfLines={2} style={styles.name}>{title}</Text>
                <Text style={styles.price}>{price}元</Text>
              </View>
            </View>
          }
          onPress={() => this.props.onProductPress(id)}
        />
      );
    }
    return null;
  }
  renderMessageAudio() {
    const { type } = this.props.currentMessage;
    if (type === '4') {
      const { position } = this.props;
      const { text, secend } = this.props.currentMessage;
      const width = 40 + secend * 8;
      return (
        <View style={[styles.messageAudioView, position === 'left' && { flexDirection: 'row-reverse' }]}>
          <Text style={styles.messageAudioText}>{secend}s</Text>
          <TOpacity
            style={[styles.messageAudio, { width: width > 200 ? 200 : width }, position === 'left' && { alignItems: 'flex-start' }]}
            content={
              <Icon name="ios-volume-up" style={[styles.messageAudioIcon, { transform: [{ rotate: position === 'left' ? '360deg' : '180deg' }] }]} />
            }
            onPress={() => this._play(text)}
          />
        </View>
      );
    }
    return null;
  }
  render() {
    const { position, touchableProps, currentMessage: { status } } = this.props;
    return (
      <View
        style={[
          styles[position].container,
        ]}
      >
        <View
          style={[
            styles[position].wrapper,
            this.handleBubbleToNext(),
            this.handleBubbleToPrevious(),
          ]}
        >
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits="text"
            {...touchableProps}
          >
            <View
              style={{
                ...st.fr,
              }}
            >
              {position === 'right' && <Text style={[styles.unRead, status === '3' && { color: '#888' }]}>{status === '1' ? '发送中' : status === '2' ? '未读' : status === '3' ? '已读' : '失败'}</Text>}
              {this.renderMessageImage()}
              {this.renderMessageText()}
              {this.renderMessageProduct()}
              {this.renderMessageAudio()}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 4,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    text: {
      color: '#111',
      fontSize: 14,
      lineHeight: 20,
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 10,
      marginRight: 10,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 4,
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
  }),
  unRead: {
    color: Mcolor,
    fontSize: 12,
    marginRight: 6,
    marginTop: 10,
  },
  messageTextList: {
    ...st.fr,
  },
  messageTextView: {
    backgroundColor: '#92E649',
    borderRadius: 5,
  },
  messageAudioView: {
    ...st.fr,
    ...st.acenter,
  },
  messageAudioText: {
    fontSize: 12,
    color: '#666',
    marginRight: 5,
    marginLeft: 5,
  },
  messageAudio: {
    height: 35,
    borderRadius: 6,
    backgroundColor: '#92E649',
    ...st.jcenter,
    alignItems: 'flex-end',
  },
  messageAudioIcon: {
    color: '#666',
    fontSize: 24,
    marginLeft: 6,
    marginRight: 6,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tick: {
    fontSize: 10,
    backgroundColor: Color.backgroundTransparent,
    color: Color.white,
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  productTab: {
    width: 230,
    height: 70,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  product: {
    flex: 1,
    ...st.frcenter,
  },
  imageview: {
    width: 60,
    height: 60,
    marginRight: 6,
  },
  image: {
    width: 60,
    height: 60,
  },
  rightProduct: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#333',
  },
  price: {
    color: Mcolor,
    fontSize: 14,
    marginTop: 5,
  },
};
Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};

Bubble.defaultProps = {
  touchableProps: {},
  position: 'left',
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
  onProductPress: () => {},
};

Bubble.propTypes = {
  touchableProps: PropTypes.object,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  onProductPress: PropTypes.func,
};
