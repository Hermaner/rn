import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 4,
  },
});
const spotLine = () => (
  <View>
    <Image source={require('../assets/img/11.png')} style={styles.img} />
  </View>
);

export default spotLine;
