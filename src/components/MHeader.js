import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'native-base';
import { Mcolor, st } from '../utils';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Mcolor,
  },
  left: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 48,
    width: 48,
    ...st.jacenter,
    zIndex: 9,
  },
  title: {
    flex: 1,
    ...st.jacenter,
  },
  titleText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
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
    fontSize: 22,
    marginLeft: 10,
    color: '#fff',
  },
});
const headerBar = ({ back, title, showRight, rightText, hideBack, rightPress }) => (
  <Header style={styles.header}>
    {
      !hideBack &&
      <TouchableOpacity onPress={back} style={styles.left}>
        <Icon name="arrow-back" style={styles.backIcon} />
      </TouchableOpacity>
    }
    <View style={styles.title}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
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
  title: PropTypes.string,
  hideBack: PropTypes.bool,
  rightPress: PropTypes.func,
  rightText: PropTypes.string,
  showRight: PropTypes.bool,
};
export default headerBar;
