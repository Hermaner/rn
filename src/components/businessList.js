import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableHighlight, StyleSheet } from 'react-native';
import { Mred } from '../utils';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
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
  name: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  label: {
    fontSize: 11,
    color: '#888',
    marginBottom: 6,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 3,
  },
  iconText: {
    fontSize: 10,
  },
  icon1: {
    borderColor: '#71cbf1',
  },
  iconText1: {
    color: '#71cbf1',
  },
  icon2: {
    borderColor: Mred,
  },
  iconText2: {
    color: Mred,
  },
  icon3: {
    borderColor: '#64c9ac',
  },
  iconText3: {
    color: '#3dbce6',
  },
  priceView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  priceLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: '#666',
    fontSize: 12,
    marginRight: 2,
  },
  priceLabel: {
    fontSize: 10,
    color: Mred,
  },
  priceRightText: {
    fontSize: 12,
    color: '#999',
  },
});


const BusinessList = ({ onPress, data }) => (
  <TouchableHighlight
    underlayColor="#eee"
    onPress={onPress}
  >
    <View style={styles.list}>
      <Image source={{ uri: data.imgUrl }} style={styles.img} />
      <View style={styles.right}>
        <Text style={styles.name} numberOfLines={1}>{data.nickName}</Text>
        <Text style={styles.label}>
          {data.provinceName}{data.cityName}{data.districtName}
        </Text>
        <View style={styles.iconView}>
          {/* <View style={[styles.icon, styles.icon1]}>
            <Text style={[styles.iconText, styles.iconText1]}>lllll</Text>
          </View>
          <View style={[styles.icon, styles.icon2]}>
            <Text style={[styles.iconText, styles.iconText2]}>买家保障</Text>
          </View>
          <View style={[styles.icon, styles.icon3]}>
            <Text style={[styles.iconText, styles.iconText3]}>实名</Text>
          </View> */}
          {
            data.memberVerifs &&
            data.memberVerifs.map((item, index) => (
              <View style={[styles.icon, styles.icon1]} key={index}>
                <Text style={[styles.iconText, styles.iconText1]}>{item.verifFieldName}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.priceView}>
          <View style={styles.priceLeftView}>
            <Text style={styles.priceText}>主营：{data.sell}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

BusinessList.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object,
};
export default BusinessList;
