import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Mred, st } from '../utils';
import Iconfont from './Iconfont';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 3,
    backgroundColor: '#fff',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    flexWrap: 'wrap',
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
  imgBox: {
    width: 80,
    marginRight: 8,
    borderRadius: 40,
  },
  aaBox: {
    marginRight: 6,
    ...st.fr,
    ...st.acenter,
  },
  aa: {
    color: '#666',
    fontSize: 12,
  },
  ckIcon: {
    fontSize: 18,
    marginRight: 2,
    color: '#5CBE74',
  },
});


const BusinessList = ({ onPress, data }) => (
  <TouchableHighlight
    underlayColor="#eee"
    onPress={onPress}
  >
    <View style={styles.list}>
      <View style={styles.imgBox}>
        <CachedImage source={{ uri: `${data.imgUrl}?imageView2/1/w/80` }} style={styles.img} />
      </View>
      <View style={styles.right}>
        <Text style={styles.name} numberOfLines={1}>{decodeURI(data.nickName)}</Text>
        <Text style={styles.label}>
          {data.provinceName}{data.cityName}{data.districtName}
        </Text>
        <View style={styles.iconView}>
          {
            data.memberVerifs &&
            data.memberVerifs.map((item, index) => (
              <View
                style={styles.aaBox}
                key={index}
              >
                <Iconfont style={styles.ckIcon} name="icon-shimingrenzheng" />
                <Text style={styles.aa}>
                  {item.verifFieldName}
                </Text>
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
