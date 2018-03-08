import React from 'react';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { Text, View, StyleSheet } from 'react-native';
import { st } from '../utils';
import InputNumber from './InputNumber';

const styles = StyleSheet.create({
  list: {
    padding: 8,
    backgroundColor: '#fff',
    ...st.frcenter,
  },
  left: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  img: {
    width: 60,
    height: 60,
  },
  mid: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#444',
    lineHeight: 28,
  },
  price: {
    fontSize: 14,
    color: '#444',
    lineHeight: 28,
  },
  right: {
  },
});


const GoodItem = ({ item, index, backChange }) => (
  <View style={styles.list}>
    <View style={styles.left}>
      <CachedImage source={{ uri: `${item.imgUrl}?imageView2/1/w/60` }} style={styles.img} />
    </View>
    <View style={styles.mid}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.salesPrice}元/次</Text>
    </View>
    <View style={styles.right}>
      <InputNumber
        onChange={c => backChange(index, c)}
        value={item.count}
        min={1}
      />
    </View>
  </View>
);
GoodItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  backChange: PropTypes.func,
};
export default GoodItem;
