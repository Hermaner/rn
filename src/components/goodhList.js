import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableHighlight, StyleSheet } from 'react-native';
import { Mred, deviceW } from '../utils';

const styles = StyleSheet.create({
  list: {
    paddingTop: 4,
    paddingLeft: 4,
  },
  img: {
    marginBottom: 2,
  },
  bom: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    color: '#333',
    lineHeight: 22,
  },
  label: {
    fontSize: 11,
    color: Mred,
    lineHeight: 22,
    marginBottom: 6,
  },
});
const GoodList = ({ onPress, data, count }) => {
  const height = (deviceW / count) - 6;
  return (
    <TouchableHighlight
      underlayColor="#eee"
      onPress={onPress}
    >
      <View style={styles.list}>
        <View>
          <Image source={{ uri: data.supplyImages[0].imgUrl }} style={[styles.img, { width: height, height }]} />
          <View style={styles.bom}>
            <Text style={styles.name} numberOfLines={1}>{data.categoryName}{data.brandName}{data.supplyItems.map((item => item.specName)).join(' ')}</Text>
            <Text style={styles.label}>{data.wholesalePrice}元/{data.unit}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
GoodList.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object,
  count: PropTypes.number,
};
export default GoodList;
