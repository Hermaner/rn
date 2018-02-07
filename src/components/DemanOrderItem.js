import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Icon } from 'native-base';
import { Mcolor, st } from '../utils';

const styles = StyleSheet.create({
  list: {
    marginBottom: 3,
    position: 'relative',
    backgroundColor: '#fff',
  },
  top: {
    height: 35,
    paddingTop: 5,
    ...st.frcenter,
    paddingRight: 10,
    paddingLeft: 10,
  },
  name: {
    fontSize: 14,
    flex: 1,
    color: Mcolor,
    fontWeight: 'bold',
  },
  priceText: {
    color: Mcolor,
    fontSize: 12,
  },
  price: {
    backgroundColor: Mcolor,
    height: 24,
    ...st.frcenter,
    borderRadius: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  priceIcon: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
    marginRight: 3,
  },
  priceValue: {
    color: '#fff',
    fontSize: 15,
  },
  mid: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  detail: {
    paddingBottom: 6,
  },
  detailText: {
    color: '#444',
    lineHeight: 20,
  },
  close: {
    ...st.frcenter,
  },
  closeText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  label: {
  },
  labelText: {
    color: '#ff0000',
    fontSize: 14,
  },
  bom: {
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    paddingLeft: 10,
    paddingRight: 10,
    ...st.frcenter,
    height: 35,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  nick: {
    paddingRight: 5,
    flex: 1,
    ...st.fr,
  },
  nickText: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#666',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
});


const DemanOrderItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <Text style={styles.name}>
        {item.demandCategoryName}
      </Text>
      <View style={styles.price}>
        <View style={styles.priceIcon}>
          <Icon name="logo-usd" style={styles.priceText} />
        </View>
        <Text style={styles.priceValue}>{item.servicesPrice ? `${item.servicesPrice}元` : '再议'}</Text>
      </View>
    </View>
    <View style={styles.mid}>
      <View style={styles.detail}><Text style={styles.detailText}>{item.detail}</Text></View>
      <View style={styles.close}>
        <Text style={styles.closeText}>截止日期：{item.closingDate.substr(0, 10)}</Text>
        <Text style={styles.labelText}>{item.modiDate}</Text>
      </View>
    </View>
    <View style={styles.bom}>
      <CachedImage source={{ uri: item.memberInfo.imgUrl }} style={styles.img} />
      <View style={styles.nick}>
        <Text style={styles.nickText}>{decodeURI(item.memberInfo.nickName)}</Text>
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
