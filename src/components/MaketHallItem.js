import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { st } from '../utils';

const styles = StyleSheet.create({
  list: {
    ...st.frcenter,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    backgroundColor: '#fff',
  },
  name: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  unit: {
    flex: 1,
    fontSize: 13,
    color: '#444',
  },
  date: {
    flex: 1,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});
const MaketHallItem = ({ item }) => (
  <View style={styles.list}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.unit}>{item.minPrice}-{item.maxPrice}元/{item.unit}</Text>
    <Text style={styles.date}>{item.modiDate.substr(0, 10)}</Text>
  </View>
);

MaketHallItem.propTypes = {
  item: PropTypes.object,
};
export default MaketHallItem;
