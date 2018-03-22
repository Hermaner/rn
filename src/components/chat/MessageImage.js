/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes, Platform, TouchableOpacity } from 'react-native';
import Lightbox from 'react-native-lightbox';

export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  currentMessage,
  showImage,
}) {
  const { text, path, pressWidth, pressHeight, width, height } = currentMessage;
  return (
    <View style={[styles.container, containerStyle]}>
      {/* <Lightbox
        activeProps={{
          style: styles.imageActive,
        }}
        {...lightboxProps}
      >
        <Image
          {...imageProps}
          style={[styles.image, { width: pressWidth, height: pressHeight }]}
          source={{ uri: path ? (Platform.OS === 'android' ? `file://${path}` : path) : text }}
        />
      </Lightbox> */}
      <TouchableOpacity
        onPress={() => {
          showImage({
            path,
            text,
            width,
            height,
          });
        }}
      >
        <Image
          {...imageProps}
          style={[styles.image, { width: parseFloat(pressWidth, 10), height: parseFloat(pressHeight, 10) }]}
          source={{ uri: path ? (Platform.OS === 'android' ? `file://${path}` : path) : text }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    borderRadius: 13,
  },
  imageActive: {
    flex: 1,
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
  showImage: PropTypes.func,
};
