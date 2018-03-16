/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const Avatar = ({ position, onPressAvatar, currentMessage }) => (
  <View
    style={[
      styles[position].container,
    ]}
  >
    <TouchableOpacity
      onPress={() => onPressAvatar &&
        this.props.onPressAvatar(currentMessage.user)}
      accessibilityTraits="image"
    >
      <Image
        source={{ uri: currentMessage.user.avatar }}
        style={styles.left.image}
      />
    </TouchableOpacity>
  </View>
);
const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
};

Avatar.defaultProps = {
  position: 'left',
  currentMessage: {
    user: null,
  },
  onPressAvatar: () => {},
};

Avatar.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  onPressAvatar: PropTypes.func,
};

export default Avatar;
