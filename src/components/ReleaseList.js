import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { Mcolor, Fcolor, Bcolor, st } from '../utils';

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buyGoodsName: {
    fontSize: 16,
    color: '#333',
  },
  buyGoodsVariety: {
    fontSize: 14,
    color: '#666',
  },
  flexRight: {
    flex: 1,
    textAlign: 'right',
    color: Fcolor,
    fontSize: 16,
  },
  buyGoodsPlace: {
    marginTop: 4,
    color: '#666',
    flex: 1,
    fontSize: 14,
  },
  goBuyBtnBox: {
    width: 60,
    height: 30,
    ...st.jacenter,
    backgroundColor: Mcolor,
    borderRadius: 5,
  },
  goBuyBtn: {
    color: '#fff',
    fontSize: 14,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userDoBigBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDoBox: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '#67BC46',
    borderRadius: 2,
  },
  userDo: {
    fontSize: 12,
    color: '#fff',
  },
  everyWeek: {
    fontSize: 12,
    color: '#FC8521',
    borderWidth: 1,
    borderColor: '#FC8521',
    borderRadius: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 4,
  },
  howLong: {
    fontSize: 10,
    color: '#666',
  },
  howLongDay: {
    fontSize: 10,
    color: '#FC8521',
  },
  itemNameLine: {
    ...st.fr,
    height: 30,
    ...st.acenter,
  },
  mid: {
    ...st.frcenter,
  },
  left: {
    flex: 1,
  },
  address: {
    color: '#666',
    fontSize: 12,
  },
  asof: {
    ...st.fr,
    ...st.acenter,
    height: 26,
  },
  cycle: {
    color: Bcolor,
    fontSize: 14,
  },
  normalText: {
    fontSize: 12,
    color: '#666',
  },
  btn: {
    backgroundColor: Bcolor,
    width: 70,
    height: 30,
    ...st.jacenter,
    borderRadius: 8,
  },
  bom: {
    ...st.frcenter,
    height: 22,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
  role: {
    fontSize: 16,
    color: Bcolor,
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});


const ReleaseList = ({ onPress, item }) => (
  <TouchableHighlight
    underlayColor="#eee"
    onPress={onPress}
  >
    <View style={styles.list}>
      <View style={styles.itemNameLine}>
        <Text style={styles.buyGoodsName}>{item.categoryName}</Text>
        <Text style={styles.buyGoodsVariety}>
          ({item.brandName}{item.categoryName})
        </Text>
        <Text style={styles.flexRight}>{item.demand}{item.unit}</Text>
      </View>
      <View style={styles.mid}>
        <View style={styles.left}>
          <Text style={styles.address}>{item.receiveProvinceName}{item.receiveCityName}</Text>
          <View style={styles.asof}>
            <Text style={styles.cycle}>
              {item.frequency}
            </Text>
            <Text style={styles.normalText}>距截止</Text>
            <Text style={styles.cycle}>{item.purchaseTime}天</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <Text style={styles.btnText}>去报价</Text>
        </View>
      </View>
      <View style={styles.bom}>
        <Text style={styles.role}>{item.member.identityName}</Text>
        <Text style={styles.time}>{item.modiDate}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

ReleaseList.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
};
export default ReleaseList;
