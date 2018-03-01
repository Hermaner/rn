import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import StarRating from 'react-native-star-rating';
import { CachedImage } from 'react-native-img-cache';
import { st, Mcolor } from '../utils';

const styles = StyleSheet.create({
  list: {
    marginTop: 4,
    backgroundColor: '#fff',
    padding: 10,
    ...st.frcenter,
  },
  left: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 6,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  right: {
    flex: 1,
  },
  star: {
    ...st.fr,
    ...st.acenter,
    flex: 1,
  },
  starText: {
    marginLeft: 5,
    color: Mcolor,
    fontSize: 14,
  },
  line: {
    ...st.frcenter,
    height: 24,
  },
  name: {
    color: '#333',
    flex: 1,
    fontSize: 15,
  },
  count: {
    color: '#888',
    fontSize: 12,
  },
  text: {
    color: '#666',
    fontSize: 12,
  },
  bzView: {
    ...st.frcenter,
    flex: 1,
  },
  noBao: {
    ...st.jacenter,
    width: 15,
    height: 15,
    backgroundColor: '#aaa',
    borderRadius: 3,
    marginRight: 5,
  },
  bao: {
    ...st.jacenter,
    width: 15,
    height: 15,
    backgroundColor: Mcolor,
    borderRadius: 3,
    marginRight: 5,
  },
  baoText: {
    color: '#fff',
    fontSize: 12,
  },
  baoLabel: {
    color: '#666',
    fontSize: 12,
    flex: 1,
  },
});


const DecorateItem = ({ item, onPress }) => (
  <TouchableHighlight
    underlayColor="#eee"
    onPress={onPress}
  >
    <View style={styles.list}>
      <View style={styles.left}>
        <CachedImage source={item.imgUrl ? { uri: item.imgUrl } : require('../assets/img/aver.png')} style={styles.img} />
      </View>
      <View style={styles.right}>
        <View style={styles.line}>
          <Text style={styles.name}>
            {item.bmMarketName}
          </Text>
        </View>
        <View style={styles.line}>
          <View style={styles.star}>
            <StarRating
              disabled
              starSize={20}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              rating={item.starLevel || 5}
            />
            <Text style={styles.starText}>{item.starLevel || 5}分</Text>
          </View>
          <Text style={styles.text}>
            访问量{item.browsingVolume || 0}
          </Text>
        </View>
        <View style={styles.line}>
          {
            item.depositAmount ?
              <View style={styles.bzView}>
                <View style={styles.bao}>
                  <Text style={styles.baoText}>
                    保
                  </Text>
                </View>
                <Text style={styles.baoLabel}>
                  已缴纳{item.depositAmount}元保障金
                </Text>
              </View>
              :
              <View style={styles.bzView}>
                <View style={styles.noBao}>
                  <Text style={styles.baoText}>
                    保
                  </Text>
                </View>
                <Text style={styles.baoLabel}>
                未缴纳保障金
                </Text>
              </View>
          }
          <Text style={styles.text}>
            {item.distance > 200 ? `${(item.distance / 1000).toFixed(2)}km` : '小于200m'}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

DecorateItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};
export default DecorateItem;
