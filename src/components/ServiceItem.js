import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { st, Mcolor } from '../utils';

const styles = StyleSheet.create({
  list: {
    ...st.fr,
    padding: 8,
    backgroundColor: '#fff',
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 8,
  },
  right: {
    flex: 1,
  },
  top: {
    height: 25,
    ...st.fr,
    ...st.acenter,
  },
  topname: {
    fontSize: 14,
    flex: 1,
    color: '#444',
  },
  toplabel: {
    fontSize: 12,
    color: '#888',
  },
  detail: {
    fontSize: 12,
    lineHeight: 24,
    color: '#888',
  },
  bom: {
    height: 30,
    ...st.fr,
    ...st.acenter,
  },
  price: {
    flex: 1,
    ...st.fr,
  },
  priceText: {
    fontSize: 14,
    color: Mcolor,
  },
  tipsView: {
    borderWidth: 0.8,
    borderColor: 'green',
    height: 18,
    paddingLeft: 5,
    paddingRight: 5,
    ...st.jcenter,
    borderRadius: 4,
    marginLeft: 4,
  },
  tips: {
    fontSize: 10,
    color: 'green',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
});


const ServiceItem = ({ onPress, item }) => (
  <TouchableHighlight
    underlayColor="#eee"
    onPress={onPress}
  >
    <View style={styles.list}>
      <CachedImage source={{ uri: item.imgUrl.split(',')[0] }} style={styles.img} />
      <View style={styles.right}>
        <View style={styles.top}>
          <Text style={styles.topname}>{item.name}</Text>
          <Text style={styles.toplabel}>已售出{item.sales || 0}</Text>
        </View>
        <Text style={styles.detail} numberOfLines={1}>{item.detail}</Text>
        <View style={styles.bom}>
          <View style={styles.price}>
            <Text style={styles.priceText}>{item.price}元/次</Text>
            <View style={styles.tipsView}>
              <Text style={styles.tips}>新用户立减10</Text>
            </View>
          </View>
          <Text style={styles.label}>{item.distance > 200 ? `${(item.distance / 1000).toFixed(2)}km` : '小于200m'}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

ServiceItem.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
};
export default ServiceItem;
