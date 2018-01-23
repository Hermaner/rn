import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

const loadMore = () => (
  <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', padding: 15 }}>
    <ActivityIndicator
      size={'small'}
      color="#666"
      animating
      style={{ width: 20, height: 20 }}
    />
    <Text style={{ color: '#666', fontSize: 14, marginLeft: 10 }}>
        正在加载...
    </Text>
  </View>

);
export default loadMore;
