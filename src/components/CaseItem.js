import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, StyleSheet } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { st } from '../utils';

const styles = StyleSheet.create({
  list: {
    paddingBottom: 5,
    margin: 3,
    background: '#fff',
  },
  top: {
    padding: 10,
    ...st.fr,
    ...st.jacenter,
  },
  img: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    color: '#666',
  },
  type: {
    height: 20,
    background: '#8A2BE2',
    borderRadius: 5,
    paddingLeft: 6,
    paddingRight: 6,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
  },
  star: {
    height: 30,
  },
  starText: {
    color: '#888',
    fontSize: 12,
  },
  date: {
    width: 60,
  },
  dateText: {
    color: '#888',
    fontSize: 12,
  },
  mid: {
    fontSize: 12,
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 8,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    position: 'relative',
  },
  leftcon: {
    position: 'absolute',
    content: '',
    top: -5,
    background: '#eee',
    width: 10,
    height: 10,
    borderRadius: 5,
    left: -5,
  },
  rightcon: {
    position: 'absolute',
    content: '',
    top: -5,
    background: '#eee',
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -5,
  },
  addressText: {
    color: '#888',
    fontSize: 12,
  },
  detailText: {
    color: '#666',
    fontSize: 12,
  },
  bom: {
    ...st.fr,
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  bomImg: {
    width: 60,
    height: 60,
    marginTop: 4,
    marginRight: 4,
  },
});


const CaseItem = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <CachedImage source={{ uri: item.supplyImages[0].imgUrl }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.masterName}
        </Text>
        <View style={styles.type}>
          <Text style={styles.typeText}>{item.servicesTypeName}</Text>
        </View>
        <View style={styles.star}>
          <Text style={styles.starText}>{item.masterStarLevel || 5}分</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={styles.dateText}>{item.modiDate}</Text>
      </View>
    </View>
    <View style={styles.mid}>
      <View style={styles.leftcon} />
      <View style={styles.rightcon} />
      <View style={styles.address}><Text style={styles.addressText}>{item.address}</Text></View>
      <View style={styles.detail}><Text style={styles.detailText}>{item.detail}</Text></View>
    </View>
    <View style={styles.bom}>
      {
          item.images.split(',').map((list, index) => (
            <CachedImage
              key={index}
              source={{ uri: item.supplyImages[0].imgUrl }}
              style={styles.bomImg}
            />
          ))
      }
    </View>
  </View>
);

CaseItem.propTypes = {
  item: PropTypes.object,
};
export default CaseItem;
