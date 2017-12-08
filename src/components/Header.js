import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'native-base';

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'bold',
  },
  right: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const headerBar = ({ back, title, showRight }) => (
  <Header>
    <TouchableOpacity onPress={back} style={styles.left}>
      <Icon name="arrow-back" />
    </TouchableOpacity>
    <View style={styles.title}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
    {
      showRight &&
      <TouchableOpacity onPress={back} style={styles.right}>
        <Text>12313112</Text>
      </TouchableOpacity>
    }
  </Header>
);

headerBar.propTypes = {
  back: PropTypes.func,
  title: PropTypes.string,
  showRight: PropTypes.bool,
};
export default headerBar;
