import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const loadNoMore = () => (
  <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', padding: 15 }}>
    <Text style={{ color: '#666', fontSize: 14 }}>
       没有更多数据了
    </Text>
  </View>

);
export default loadNoMore;
