/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

import { MIN_COMPOSER_HEIGHT } from './Constant';

export default class Composer extends React.Component {

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

  render() {
    return (
      <TextInput
        multiline={this.props.multiline}
        onChange={e => this.onContentSizeChange(e)}
        onContentSizeChange={e => this.onContentSizeChange(e)}
        onChangeText={text => this.onChangeText(text)}
        style={[styles.textInput,
          this.props.textInputStyle, { height: this.props.composerHeight }]}
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

}

const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    backgroundColor: '#fff',
    paddingRight: 5,
    marginLeft: 5,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    backgroundColor: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
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
  textInputStyle: TextInput.propTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};
