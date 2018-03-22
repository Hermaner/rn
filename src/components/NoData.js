import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import TOpacity from './TOpacity';

const NoData = ({ onPress, label }) => (
  <TOpacity
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    content={<View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <CachedImage source={require('./nodata.png')} style={{ width: 50, height: 50, marginBottom: 10 }} />
      <Text style={{ color: '#666', fontSize: 14, marginLeft: 5 }}>{label || '没有相关信息'}</Text>
    </View>}
    onPress={onPress && onPress}
  />

);
NoData.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
};
export default NoData;
