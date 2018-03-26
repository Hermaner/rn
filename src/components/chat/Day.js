/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';

import Color from './Color';

import { isSameDay, isSameUser, isSameTime, warnDeprecated } from './utils';
import { DATE_FORMAT } from './Constant';

export default function Day(
  { currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle },
) {
  const sDay = isSameDay(currentMessage, previousMessage);
  const sTime = isSameTime(currentMessage, previousMessage);
  let label = '';
  if (!sDay) {
    label = moment(parseInt(currentMessage.createdAt, 10))
      .locale('zh-cn')
      .format('LLL');
  } else if (sTime > 1) {
    label = moment(parseInt(currentMessage.createdAt, 10))
      .locale('zh-cn')
      .format('LT');
  }
  if (!sDay || sTime > 1) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {label}
          </Text>
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '600',
  },
});

Day.contextTypes = {
  getLocale: PropTypes.func,
};

Day.defaultProps = {
  currentMessage: {
    // TODO: test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  // TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
  dateFormat: DATE_FORMAT,
};

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
