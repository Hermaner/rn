import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Mred, ColorList } from '../utils';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 3,
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
    flexWrap: 'wrap',
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
  aaBox: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderWidth: 0.6,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 2,
  },
  aa: {
    color: '#777',
    fontSize: 11,
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
      <CachedImage source={{ uri: `${data.supplyImages[0].imgUrl}?imageView2/1/w/80` }} style={styles.img} />
      <View style={styles.right}>
        <Text style={styles.name} numberOfLines={1}>{data.categoryName}{data.brandName}{data.supplyItems.map((item => item.specName)).join(' ')}</Text>
        <Text style={styles.label}>
          {data.sendProvinceName}{data.sendCityName}{data.sendDistrictName}
        </Text>
        <View style={styles.iconView}>
          {
            data.member &&
            data.member.memberVerifs &&
            data.member.memberVerifs.map((item3, index3) => (
              <View
                style={[
                  styles.aaBox,
                  { borderColor: ColorList[index3 > ColorList.length ? index3 % ColorList.length : index3] }
                ]}
                key={index3}
              >
                <Text style={styles.aa}>{item3.verifFieldName}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.priceView}>
          <View style={styles.priceLeftView}>
            <Text style={styles.priceText}>{data.wholesalePrice}</Text>
            <Text style={styles.priceLabel}>元/{data.unit}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <TouchableOpacity onPress={onPressTell}>
              <View style={styles.tell}>
                <Text style={styles.tellText}>聊生意</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onPressLastBtn}>
              <View style={styles.tell}>
                <Text style={styles.tellText}>申请拿样</Text>
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
