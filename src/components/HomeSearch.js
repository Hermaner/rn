import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { pushRoute } from '../actions';
import { Mcolor, st } from '../utils';
import TFeedback from './TFeedback';
import TOpacity from './TOpacity';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f8f8f8',
    ...st.jacenter,
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    ...st.fr,
    ...st.jacenter,
    backgroundColor: '#eee',
    borderRadius: 15,
    marginLeft: 10,
    overflow: 'hidden',
    height: 30,
  },
  HeaderMainText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  HeaderIcon: {
    color: '#444',
    fontSize: 18,
  },
  left: {
    ...st.frcenter,
  },
  leftText: {
    color: '#666',
    fontSize: 13,
  },
  right: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.jacenter,
  },
  rightText: {
    color: Mcolor,
    fontSize: 14,
  },
  leftIcon: {
    fontSize: 18,
    color: '#444',
    marginLeft: 4,
  },
});
const headerBar = ({ label, push }) => (
  <Header style={styles.header}>
    <TOpacity
      content={
        <View style={styles.left}>
          <Text style={styles.leftText}>{label}</Text>
          <Icon name="ios-arrow-down-outline" style={styles.leftIcon} />
        </View>
      }
      onPress={() => { }}
    />
    <TFeedback
      content={
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Text style={styles.HeaderMainText}>搜索服务</Text>
        </View>
      }
      onPress={() => push({ key: 'MainSearch' })}
    />
  </Header>
);

headerBar.propTypes = {
  label: PropTypes.string,
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(headerBar);
