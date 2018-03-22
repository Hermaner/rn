/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Color from './Color';

export default function Send({ text, containerStyle, onSend, children, textStyle, label }) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => {
        if (text.trim().length === 0) {
          return;
        }
        onSend({ text: text.trim(), type: '1' }, true);
      }}
      accessibilityTraits="button"
    >
      <View>{children || <Text style={[styles.text, textStyle]}>{label}</Text>}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 5,
    marginRight: 10,
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: '发送',
  containerStyle: {},
  textStyle: {},
  children: null,
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
};
