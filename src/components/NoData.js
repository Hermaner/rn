import React from 'react';
import { View, Image, Text } from 'react-native';
import TOpacity from './TOpacity';

const NoData = ({ onPress, label }) => (
  <TOpacity
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    content={<View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./nodata.png')} style={{ width: 40, height: 40, marginBottom: 10 }} />
      <Text style={{ color: '#666', fontSize: 14, marginLeft: 5 }}>{label || '没有相关信息'}</Text>
    </View>}
    TPress={onPress && onPress}
  />

);
NoData.propTypes = {
  label: React.PropTypes.string,
  onPress: React.PropTypes.func,
};
export default NoData;
