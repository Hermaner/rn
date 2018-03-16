/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import {
  Clipboard,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ViewPropTypes,
} from 'react-native';

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

  renderMessageText() {
    const { type } = this.props.currentMessage;
    if (type === '1') {
      return (
        <Text style={styles.left.text}>
          {this.props.currentMessage.text}
        </Text>
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
  render() {
    const { position, touchableProps } = this.props;
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
            <View>
              {this.renderMessageImage()}
              {this.renderMessageText()}
              {this.renderMessageProduct()}
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
      backgroundColor: '#fff',
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
      backgroundColor: '#92E649',
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
