import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { Mred } from '../utils';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
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
    color: Mred,
    fontSize: 16,
    fontWeight: 'bold',
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
  tell: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 4,
    borderWidth: 1,
    borderColor: '#F28336',
    borderRadius: 4,
    marginRight: 10,
  },
  tellText: {
    fontSize: 14,
    color: '#F28336',
  },
  lastBtn: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 4,
    borderWidth: 1,
    backgroundColor: '#F28336',
    borderColor: '#F28336',
    borderRadius: 4,
  },
  lastBtnText: {
    fontSize: 14,
    color: '#fff',
  },
});


const SampleGoodList = ({ onPress, data, onPressTell, onPressLastBtn }) => (
  <TouchableHighlight
    underlayColor="#eee"
    onPress={onPress}
  >
    <View style={styles.list}>
      <Image source={{ uri: data.supplyImages[0].imgUrl }} style={styles.img} />
      <View style={styles.right}>
        <Text style={styles.name} numberOfLines={1}>{data.categoryName}{data.brandName}{data.supplyItems.map((item => item.specName)).join(' ')}</Text>
        <Text style={styles.label}>
          {data.sendProvinceName}{data.sendCityName}{data.sendDistrictName}
        </Text>
        <View style={styles.iconView}>
          <View style={[styles.icon, styles.icon1]}>
            <Text style={[styles.iconText, styles.iconText1]}>lllll</Text>
          </View>
          <View style={[styles.icon, styles.icon2]}>
            <Text style={[styles.iconText, styles.iconText2]}>买家保障</Text>
          </View>
          <View style={[styles.icon, styles.icon3]}>
            <Text style={[styles.iconText, styles.iconText3]}>实名</Text>
          </View>
        </View>
        <View style={styles.priceView}>
          <View style={styles.priceLeftView}>
            <Text style={styles.priceText}>{data.wholesalePrice}</Text>
            <Text style={styles.priceLabel}>元/{data.unit}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onPressTell}>
              <View style={styles.tell}>
                <Text style={styles.tellText}>聊生意</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressLastBtn}>
              <View style={styles.lastBtn}>
                <Text style={styles.lastBtnText}>申请拿样</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

SampleGoodList.propTypes = {
  onPress: PropTypes.func,
  onPressTell: PropTypes.func,
  onPressLastBtn: PropTypes.func,
  data: PropTypes.object,
};
export default SampleGoodList;
