import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Mcolor, st, Mg } from '../utils';
import TOpacity from './TOpacity';

const styles = StyleSheet.create({
  list: {
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
  topLeft: {
    ...st.fr,
    ...st.acenter,
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: Mcolor,
    fontWeight: 'bold',
  },
  priceText: {
    color: '#555',
    fontSize: 12,
  },
  price: {
    ...st.frcenter,
  },
  priceValue: {
    color: Mcolor,
    fontSize: 15,
    marginLeft: 3,
  },
  mid: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
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
  apply: {
    width: 50,
    height: 20,
    ...st.jacenter,
    backgroundColor: 'green',
    borderRadius: 4,
    marginLeft: 4,
  },
  applyText: {
    fontSize: 12,
    color: '#fff',
  },
  btn: {
    backgroundColor: Mg,
    height: 26,
    width: 60,
    borderRadius: 4,
    ...st.jacenter,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
  },
});


const DemanOrderItem = ({ item, changePrice }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <View style={styles.topLeft}>
        <Text style={styles.name}>
          {item.demandOrder.demandCategoryName}
        </Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>
          {/* 申请价格 */}
        </Text>
        <Text style={styles.priceValue}>{item.price}元</Text>
      </View>
    </View>
    <View style={styles.mid}>
      <View style={styles.detail}>
        <Text style={styles.detailText}>
          {item.demandOrder.detail}
        </Text>
      </View>
      <View style={styles.close}>
        <Text style={styles.closeText}>截止日期：{item.demandOrder.closingDate.substr(0, 10)}</Text>
        <TOpacity
          style={styles.btn}
          content={
            <Text style={styles.btnText}>改价</Text>
          }
          onPress={changePrice}
        />
      </View>
    </View>
    <View style={styles.bom}>
      <CachedImage source={{ uri: `${item.demandOrder.memberInfo.imgUrl}?imageView2/1/w/30` }} style={styles.img} />
      <View style={styles.nick}>
        <Text style={styles.nickText}>{decodeURI(item.demandOrder.memberInfo.nickName)}</Text>
        <Text style={styles.addressText}>
          {item.demandOrder.provinceName}{item.demandOrder.cityName}
        </Text>
      </View>
      <Text style={styles.distanceText}>{item.demandOrder.distance > 200 ? `${(item.demandOrder.distance / 1000).toFixed(2)}km` : '小于200m'}</Text>
    </View>
  </View>
);

DemanOrderItem.propTypes = {
  item: PropTypes.object,
  changePrice: PropTypes.func,
};
export default DemanOrderItem;
