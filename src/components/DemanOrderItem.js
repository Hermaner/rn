import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, StyleSheet } from 'react-native';
import { st, mColor } from '../utils';

const styles = StyleSheet.create({
  list: {
    paddingBottom: 5,
    position: 'relative',
    background: '#fff',
  },
  top: {
    height: 30,
    paddingRight: 10,
  },
  name: {
    fontSize: 14,
    color: mColor,
  },
  mid: {
    padding: 5,
  },
  detail: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  detailText: {
    color: '#444',
    lineHeight: 20,
  },
  close: {
  },
  closeText: {
    fontSize: 12,
    color: '#666',
  },
  label: {
  },
  labelText: {
    color: mColor,
    fontSize: 12,
  },
  priceText: {
    color: mColor,
    fontSize: 12,
  },
  price: {
    position: 'absolute',
    background: mColor,
    height: 30,
    borderRadius: 15,
    paddingRight: 10,
    paddingLeft: 10,
    right: 0,
    top: 6,
  },
  priceIcon: {
    background: '#fff',
    borderRadius: 15,
    padding: 4,
    marginRight: 3,
  },
  priceValue: {
    color: '#fff',
    fontSize: 15,
  },
  bom: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingLeft: 10,
    paddingRight: 10,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  nick: {
    paddingRight: 5,
  },
  nickText: {
    fontSize: 12,
    color: '#888',
  },
  address: {
  },
  addressText: {
    fontSize: 12,
    color: '#888',
  },
  distanceText: {
    fontSize: 12,
    color: '#888',
  },
});


const DemanOrderItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <Text style={styles.name}>
        {item.demandCategoryName}
      </Text>
    </View>
    <View style={styles.mid}>
      <View style={styles.detail}><Text style={styles.detailText}>{item.detail}</Text></View>
      <View style={styles.close}>
        <View><Text style={styles.closeText}>截止日期：{item.closingDate.substr(0, 10)}</Text></View>
        <View style={styles.label}>
          <Text style={styles.labelText}>{item.modiDate}</Text>
        </View>
      </View>
      <View style={styles.price}>
        <View style={styles.priceIcon}><Text style={styles.priceText}>费用</Text></View><Text style={styles.priceValue}>{item.servicesPrice ? `${item.servicesPrice}元` : '再议'}</Text>
      </View>
    </View>
    <View style={styles.bom}>
      <Image source={{ uri: item.memberInfo.imgUrl }} style={styles.img} />
      <View style={styles.nick}>
        <Text style={styles.nickText}>{decodeURI(item.memberInfo.nickName)}</Text>
      </View>
      <View style={styles.address}>
        <Text style={styles.addressText}>{item.provinceName}{item.cityName}</Text>
      </View>
      <Text style={styles.distanceText}>{item.distance > 200 ? `${(item.distance / 1000).toFixed(2)}km` : '小于200m'}</Text>
    </View>
  </View>
);

DemanOrderItem.propTypes = {
  item: PropTypes.object,
};
export default DemanOrderItem;
