import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Icon } from 'native-base';
import { Mcolor, st } from '../utils';

const styles = StyleSheet.create({
  list: {
    marginBottom: 4,
    position: 'relative',
    backgroundColor: '#fff',
  },
  top: {
    height: 35,
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingRight: 10,
    paddingLeft: 10,
  },
  topDate: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  topTime: {
    fontSize: 13,
    color: 'green',
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
    borderRadius: 15,
    padding: 4,
    marginRight: 3,
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
    fontSize: 14,
    color: '#333',
  },
  disc: {
    fontSize: 13,
    color: '#888',
  },
  bom: {
    height: 35,
    paddingLeft: 10,
    ...st.jcenter,
  },
  bomText: {
    fontSize: 12,
    color: '#666',
  },
});


const MasterOrderItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <Text style={styles.topDate}>
        {item.masterOrderItems[0].serviceDate.substr(0, 10)}
      </Text>
      <Text style={styles.topTime}>
        {item.modiDate}
      </Text>
    </View>
    {
      item.masterOrderItems.map((list, index) => (
        <View key={index} style={styles.item}>
          <CachedImage source={{ uri: list.imgUrl }} style={styles.img} />
          <View style={styles.itemMid}>
            <Text style={styles.name}>{list.servicesTypeName}</Text>
            <Text style={styles.count}>数量{list.count}</Text>
          </View>
          <View style={styles.price}>
            <View style={styles.priceIcon}>
              <Icon name="logo-usd" style={styles.priceText} />
            </View>
            <Text style={styles.priceValue}>{item.amount}</Text>
          </View>
        </View>
      ))
    }
    <View style={styles.mid}>
      <Text style={styles.address}>
        {item.provinceName}{item.cityName}{item.districtName}{item.address}
      </Text>
      <Text style={styles.disc}>{item.distance > 200 ? `${(item.distance / 1000).toFixed(2)}km` : '小于200m'}</Text>
    </View>
    <View style={styles.bom}>
      <Text style={styles.bomText}>请尽快与用户电话联系并上门哦</Text>
      {/* <Text style={styles.bomText}>请为客服做出最优质的服务</Text>
      <Text style={styles.bomText}>订单已完成，等待7天入账</Text> */}
    </View>
  </View>
);

MasterOrderItem.propTypes = {
  item: PropTypes.object,
};
export default MasterOrderItem;
