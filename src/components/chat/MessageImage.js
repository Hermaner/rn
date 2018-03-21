/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import { Image, StyleSheet, View, ViewPropTypes, Platform } from 'react-native';
import Lightbox from 'react-native-lightbox';

export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  imageStyle,
  currentMessage,
}) {
  const { text } = currentMessage;
  const index = text.lastIndexOf('/') + 1;
  const key = text.substr(index);
  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${key}`;
  RNFetchBlob.fs.exists(path)
  .then((exist) => {
    if (!exist) {
      Image.getSize(text, () => {
        RNFetchBlob.config({
          fileCache: true,
          path,
        })
        .fetch('GET', text, {
        })
        .then(() => {
          // console.log(path);
        });
      }, () => {});
    } else {
      // console.log(path);
    }
  })
  .catch(err => console.log(err));
  console.log(text);
  return (
    <View style={[styles.container, containerStyle]}>
      <Lightbox
        activeProps={{
          style: styles.imageActive,
        }}
        {...lightboxProps}
      >
        <Image
          {...imageProps}
          style={[styles.image, imageStyle]}
          // source={{ uri: Platform.OS === 'android' ? `file://${path}` : '' + path }}
          source={{ uri: text }}
        />
      </Lightbox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    resizeMode: 'cover',
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
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
