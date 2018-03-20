import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Icon } from 'native-base';
import { Mcolor, st, Mg } from '../utils';

const styles = StyleSheet.create({
  list: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  top: {
    height: 40,
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingRight: 10,
    paddingLeft: 10,
  },
  topLeft: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
  },
  topDate: {
    fontSize: 14,
    color: '#666',
  },
  topTime: {
    fontSize: 13,
    color: Mg,
  },
  item: {
    ...st.frcenter,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  img: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  itemMid: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  count: {
    fontSize: 13,
    color: '#888',
  },
  priceText: {
    color: Mcolor,
    fontSize: 12,
  },
  price: {
    backgroundColor: Mcolor,
    height: 30,
    ...st.frcenter,
    borderRadius: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  priceIcon: {
    backgroundColor: '#fff',
    height: 20,
    width: 20,
    borderRadius: 10,
    ...st.jacenter,
    marginRight: 5,
  },
  priceValue: {
    color: '#fff',
    fontSize: 15,
  },
  mid: {
    ...st.frcenter,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  address: {
    flex: 1,
    fontSize: 12,
    color: '#333',
  },
  disc: {
    fontSize: 13,
    color: '#888',
  },
  bomText: {
    fontSize: 12,
    color: '#666',
  },
  btn: {
    width: 70,
    height: 32,
    ...st.jacenter,
    backgroundColor: Mcolor,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
  itemRight: {

  },
  itemRightText: {
    fontSize: 14,
    color: '#555',
  },
});


const MasterOrderItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <View style={styles.topLeft}>
        <Text style={styles.topDate}>
          {item.orderNumber}
        </Text>
        <Text style={styles.topTime} numberOfLines={1}>
          ({item.modiDate})
        </Text>
      </View>
      <View style={styles.price}>
        <View style={styles.priceIcon}>
          <Icon name="ios-flame" style={styles.priceText} />
        </View>
        <Text style={styles.priceValue}>{item.amount}</Text>
      </View>
    </View>
    {
      item.masterOrderItems.map((list, index) => (
        <View key={index} style={styles.item}>
          <CachedImage source={{ uri: `${list.imgUrl}?imageView2/1/w/60` }} style={styles.img} />
          <View style={styles.itemMid}>
            <Text style={styles.name}>{list.servicesTypeName}</Text>
            <Text style={styles.count}>数量{list.count}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemRightText}>￥{list.servicesPrice}</Text>
          </View>
        </View>
      ))
    }
    <View style={styles.mid}>
      <Text style={styles.address} numberOfLines={1}>
        {item.provinceName}{item.cityName}{item.districtName}{item.address}
      </Text>
      <Text style={styles.disc}>{item.distance > 200 ? `${(item.distance / 1000).toFixed(2)}km` : '小于200m'}</Text>
    </View>
  </View>
);

MasterOrderItem.propTypes = {
  item: PropTypes.object,
};
export default MasterOrderItem;
