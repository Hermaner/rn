import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../actions';
import { Mcolor, st, deviceW, deviceH } from '../utils';
import TFeedback from './TFeedback';
import Iconfont from './Iconfont';

const isX = Platform.OS === 'ios' && deviceH === 812;
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    ...st.fr,
    paddingTop: isX ? 40 : 20,
    height: deviceW * 0.6,
  },
  headerImg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    resizeMode: 'contain',
    height: deviceW * 0.6,
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    ...st.fr,
    ...st.jacenter,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
    marginLeft: 10,
    overflow: 'hidden',
    height: 35,
  },
  HeaderMainText: {
    color: '#333',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  HeaderIcon: {
    color: '#333',
    fontSize: 18,
  },
  left: {
    ...st.frcenter,
    height: 35,
    width: 80,
  },
  leftText: {
    color: '#fff',
    fontSize: 14,
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
    color: '#fff',
    marginRight: 4,
  },
});
const headerBar = ({ push, label, image }) => (
  <View style={styles.header}>
    {
      <CachedImage style={styles.headerImg} source={{ uri: image || 'https://img.hbw128.com/FnyZDZQ7KEri2P-PhJmHe0GG3MWt' }} />
    }
    <View style={styles.left}>
      <Iconfont style={styles.leftIcon} name="icon-shouhuodizhi" />
      <Text style={styles.leftText}>{label}</Text>
    </View>
    <TFeedback
      content={
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Text style={styles.HeaderMainText}>点击搜索货品</Text>
        </View>
      }
      onPress={push}
    />
  </View>
);

headerBar.propTypes = {
  label: PropTypes.string,
  push: PropTypes.func,
  image: PropTypes.any,
};
export default connect(null, { pushR: pushRoute })(headerBar);
