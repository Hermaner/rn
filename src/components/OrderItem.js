import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Mcolor, st } from '../utils';

const styles = StyleSheet.create({
  list: {
    marginTop: 3,
    position: 'relative',
    backgroundColor: '#fff',
  },
  top: {
    height: 38,
    ...st.frcenter,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingLeft: 10,
  },
  num: {
    fontSize: 14,
    flex: 1,
    color: '#555',
  },
  status: {
    color: Mcolor,
    fontSize: 12,
  },
  mid: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f8f8f8',
  },
  product: {
    paddingBottom: 5,
    paddingTop: 5,
    ...st.frcenter,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  productName: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  count: {
    fontSize: 12,
    color: '#777',
    lineHeight: 20,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  bom: {
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    paddingLeft: 10,
    paddingRight: 10,
    ...st.fr,
    ...st.acenter,
    height: 38,
  },
  date: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  bomLabel: {
    fontSize: 14,
    color: '#666',
  },
  bomBoldLabel: {
    fontSize: 18,
    color: Mcolor,
  },
});


const OrderItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <Text style={styles.num}>
        {item.orderNumber}
      </Text>
      <Text style={styles.status}>
        {item.status === 1 ? '待支付' : item.status === 3 ? '待服务' : item.status === 4 ? '待评价' : item.status === 5 ? '已完成' : item.status === 6 ? '订单退款' : item.status === 7 ? '订单取消' : ''}
      </Text>
    </View>
    <View style={styles.mid}>
      {
        item.orderItems.map((list, index) => (
          <View style={styles.product} key={index}>
            <CachedImage source={{ uri: `${list.imgUrl}?imageView2/1/w/60` }} style={styles.img} />
            <View style={styles.productName}>
              <Text style={styles.name}>
                {list.servicesTypeName}
              </Text>
              <Text style={styles.count}>
                数量：{list.count}
              </Text>
            </View>
            <Text style={styles.price}>
              ￥{list.servicesPrice}
            </Text>
          </View>
        ))
      }
    </View>
    <View style={styles.bom}>
      <Text style={styles.date}>{item.orderDate}</Text>
      <Text style={styles.bomLabel}>共{item.orderCount}个服务，共</Text>
      <Text style={styles.bomBoldLabel}>{item.amount}</Text>
      <Text style={styles.bomLabel}>元</Text>
    </View>
  </View>
);

OrderItem.propTypes = {
  item: PropTypes.object,
};
export default OrderItem;
