/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import { Platform, StyleSheet, TextInput, View, Text, PanResponder } from 'react-native';
import Toast from 'react-native-simple-toast';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Upload } from '../../components';
import { st, fileKey } from '../../utils';

import { MIN_COMPOSER_HEIGHT } from './Constant';

export default class Composer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTab: false,
      currentTime: 0,
      audioPath: `${AudioUtils.DocumentDirectoryPath}/aaa.aac`,
    };
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this.prepareRecordingPath(this.state.audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({ currentTime: Math.floor(data.currentTime) });
    };

    AudioRecorder.onFinished = (data) => {
      if (Platform.OS === 'ios') {
        this._finishRecording(data.audioFileURL);
      }
    };
  }
  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }

  onChangeText(text) {
    this.props.onTextChanged(text);
  }
  prepareRecordingPath = (audioPath) => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }
  _handlePanResponderGrant = async () => {
    this.props.audioTipShow(true);
    console.log(this.state.audioPath);
    this.prepareRecordingPath(this.state.audioPath);
    await AudioRecorder.startRecording();
    this.setState({
      isTab: true,
    });
  }
  _finishRecording = (filePath) => {
    const key = fileKey();
    const urlkey = `${global.buketUrl}${key}`;
    Upload(filePath, global.uptoken, key, () => {
      RNFetchBlob.fs.unlink(this.state.audioPath);
    });
    this.props.onSend({ text: urlkey, type: '4', status: '1', secend: this.state.currentTime }, true);
  }
  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    const { dy } = gestureState;
    if (dy < -60) {
      this.props.audioTipUp(true);
    } else {
      this.props.audioTipUp(false);
    }
  }
  _handlePanResponderEnd = async (e: Object, gestureState: Object) => {
    const { dy } = gestureState;
    this.props.audioTipShow(false);
    this.props.audioTipUp(false);
    this.setState({
      isTab: false,
    });
    if (this.state.currentTime < 1) {
      await AudioRecorder.stopRecording();
      Toast.show('少于1s自动取消');
      return;
    }
    if (dy < -50) {
      await AudioRecorder.stopRecording();
      console.log(this.state.audioPath);
      RNFetchBlob.fs.unlink(this.state.audioPath);
    } else {
      const filePath = await AudioRecorder.stopRecording();
      if (Platform.OS === 'android') {
        this._finishRecording(filePath);
      }
    }
  }
  render() {
    const { isAudioTab, textInputStyle, composerHeight } = this.props;
    const { isTab } = this.state;
    if (!isAudioTab) {
      return (
        <TextInput
          multiline={this.props.multiline}
          onChange={e => this.onContentSizeChange(e)}
          onContentSizeChange={e => this.onContentSizeChange(e)}
          onChangeText={text => this.onChangeText(text)}
          style={[styles.textInput,
            textInputStyle, { height: composerHeight }]}
          autoFocus={this.props.textInputAutoFocus}
          value={this.props.text}
          accessibilityLabel={this.props.text}
          enablesReturnKeyAutomatically
          underlineColorAndroid="transparent"
          keyboardAppearance={this.props.keyboardAppearance}
          {...this.props.textInputProps}
        />
      );
    }
    return (
      <View
        ref={(circle) => {
          this.btnView = circle;
        }}
        style={[styles.view, { backgroundColor: isTab ? '#eee' : '#fff' }]}
        {...this._panResponder.panHandlers}
      >
        <Text style={styles.text}>按住说话</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    margin: 5,
    ...st.jacenter,
    flex: 1,
    height: Platform.select({
      ios: 33,
      android: 41,
    }),
    paddingRight: 5,
    paddingLeft: 5,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    backgroundColor: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
    margin: 5,
  },
});

Composer.defaultProps = {
  composerHeight: MIN_COMPOSER_HEIGHT,
  text: '',
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: 'default',
  onTextChanged: () => {},
  onInputSizeChanged: () => {},
};
Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  isAudioTab: PropTypes.bool,
  textInputStyle: TextInput.propTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
  audioTipShow: PropTypes.func,
  audioTipUp: PropTypes.func,
  onSend: PropTypes.func,
};
