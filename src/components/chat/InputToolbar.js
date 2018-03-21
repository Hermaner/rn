/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, View, Keyboard, ViewPropTypes, TouchableOpacity, Text, Animated } from 'react-native';
import { Icon } from 'native-base';
import Composer from './Composer';
import Send from './Send';
import Color from './Color';
import { st } from '../../utils';
import { TOpacity } from '../../components';

export default class InputToolbar extends React.Component {

  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      position: 'absolute',
      audios: [{
        name: '取消',
        icon: 'ios-flame',
      }, {
        name: '点击说话',
        icon: 'ios-flame',
      }, {
        name: '拍摄',
        icon: 'ios-flame',
      }],
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    this.setState({
      position: 'relative',
    });
  }

  keyboardWillHide() {
    this.setState({
      position: 'absolute',
    });
  }
  goAduio = (index) => {
    console.log(index);
    switch (index) {
      case 0:
        this.props.setAudioShow(false);
        break;
      case 1:
        this.setModalVisible(true);
        break;
      case 2:
      default:
    }
  }
  tabAudio = () => {
    const { tabAudio, isAudioTab } = this.props;
    tabAudio(!isAudioTab);
  }
  renderAudio() {
    const { isAudioTab } = this.props;
    return (
      <TouchableOpacity
        style={styles.leftAudioView}
        onPress={this.tabAudio}
      >
        <Icon name={isAudioTab ? 'ios-keypad-outline' : 'ios-microphone-outline'} style={styles.leftAudioIcon} />
      </TouchableOpacity>
    );
  }
  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} />;
  }

  renderAccessory() {
    // const { audios } = this.state;
    // const { audioHeight } = this.props;
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory]}>
          {this.props.renderAccessory(this.props)}
          {/* <Animated.View
            style={[styles.audioView, { transform: [{ translateY: audioHeight }] }]}
          >
            {
              audios.map((item, index) => (
                <TOpacity
                  key={index}
                  style={styles.accessList}
                  content={
                    <View key={index} style={styles.accessList}>
                      <View style={styles.accessView}>
                        <Icon name={item.icon} style={styles.accessIcon} />
                      </View>
                      <Text style={styles.accessText}>{item.name}</Text>
                    </View>
                  }
                  onPress={() => this.goAduio(index)}
                />
              ))
            }
          </Animated.View> */}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle, { position: this.state.position }]}
      >
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderAudio()}
          {this.renderComposer()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.defaultColor,
  },
  accessory: {
    height: 80,
    overflow: 'hidden',
  },
  accessList: {
    flex: 1,
    ...st.jacenter,
  },
  accessView: {
    width: 40,
    height: 40,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    ...st.jacenter,
  },
  accessIcon: {
    fontSize: 30,
    color: '#666',
  },
  accessText: {
    fontSize: 12,
    color: '#666',
  },
  audioView: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    ...st.frcenter,
    backgroundColor: '#fff',
  },
  leftAudioView: {
    width: Platform.select({
      ios: 30,
      android: 34,
    }),
    height: Platform.select({
      ios: 30,
      android: 34,
    }),
    borderRadius: Platform.select({
      ios: 15,
      android: 17,
    }),
    marginLeft: 6,
    marginRight: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    overflow: 'hidden',
    marginBottom: 8,
    ...st.jacenter,
  },
  leftAudioIcon: {
    fontSize: 20,
    color: '#666',
  },
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  isAudioShow: false,
  setAudioShow: () => {},
  onPressActionButton: () => {},
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  isAudioShow: PropTypes.bool,
  isAudioTab: PropTypes.bool,
  tabAudio: PropTypes.func,
  onPressActionButton: PropTypes.func,
  setAudioShow: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
  accessoryContainerHeight: PropTypes.number,
};
