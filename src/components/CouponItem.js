import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { st, mColor } from '../utils';

const styles = StyleSheet.create({
  list: {
    ...st.fr,
    margin: 5,
    background: '#fff',
  },
  left: {
    position: 'relative',
    color: '#fff',
    background: mColor,
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    width: 100,
    height: 80,
  },
  cl: {

  },
  con: {

  },
  unit: {
    marginBottom: 3,
  },
  unitText: {
    fontSize: 18,
    color: '#fff',
  },
  price: {

  },
  priceText: {
    fontSize: 32,
  },
  leftcon: {
    position: 'absolute',
    content: '',
    top: -5,
    background: '#eee',
    width: 10,
    height: 10,
    borderRadius: 5,
    left: -5,
  },
  rightcon: {
    position: 'absolute',
    content: '',
    top: -5,
    background: '#eee',
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -5,
  },
  right: {
    height: 80,
  },
  label: {

  },
  labelText: {

  },
  time: {

  },
  timeText: {

  },
});

const CouponItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.left}>
      <View style={styles.cl} />
      <View style={styles.con}>
        <View style={styles.unit}><Text style={styles.unitText}>￥</Text></View>
        <View style={styles.price}><Text style={styles.priceText}>{item.price}</Text></View>
      </View>
    </View>
    <View style={styles.right}>
      <View style={styles.cl} />
      <View style={styles.label}><Text style={styles.labelText}>{item.label}</Text></View>
      <View style={styles.time}><Text style={styles.timeText}>有效日期：{item.time}</Text></View>
    </View>
  </View>
);

CouponItem.propTypes = {
  item: PropTypes.object,
};
export default CouponItem;
