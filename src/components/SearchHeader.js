import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'native-base';
import { Mcolor, st } from '../utils';
import TFeedback from './TFeedback';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Mcolor,
    ...st.jacenter,
  },
  left: {
    width: 20,
    ...st.jacenter,
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    ...st.fr,
    ...st.jacenter,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 10,
    height: 30,
  },
  HeaderMainText: {
    color: '#999',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  HeaderIcon: {
    color: '#666',
    fontSize: 18,
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
  backIcon: {
    fontSize: 24,
    color: '#fff',
  },
});
const headerBar = ({ back, showRight, rightText, rightPress }) => (
  <Header style={styles.header}>
    <TouchableOpacity onPress={back} style={styles.left}>
      <Icon name="arrow-back" style={styles.backIcon} />
    </TouchableOpacity>
    <TFeedback
      content={
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Text style={styles.HeaderMainText}>搜索服务</Text>
        </View>
      }
      onPress={() => { }}
    />
    {
      showRight &&
      <TouchableOpacity onPress={rightPress} style={styles.right}>
        <Text style={styles.rightText}>{rightText}</Text>
      </TouchableOpacity>
    }
  </Header>
);

headerBar.propTypes = {
  back: PropTypes.func,
  rightPress: PropTypes.func,
  rightText: PropTypes.string,
  showRight: PropTypes.bool,
};
export default headerBar;
