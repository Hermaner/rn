import React from 'react';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import { Text, View, StyleSheet } from 'react-native';
import { st, Mcolor } from '../utils';
import ImageLook from './ImageLook';

const styles = StyleSheet.create({
  list: {
    paddingBottom: 5,
    margin: 3,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  top: {
    padding: 10,
    ...st.fr,
    ...st.jcenter,
  },
  img: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  infoTop: {
    ...st.fr,
    height: 22,
    ...st.acenter,
  },
  name: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  typeView: {
    ...st.fr,
  },
  type: {
    height: 20,
    backgroundColor: '#8A2BE2',
    borderRadius: 5,
    paddingLeft: 6,
    paddingRight: 6,
    ...st.jacenter,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
  },
  star: {
    height: 24,
    ...st.fr,
    ...st.acenter,
    marginTop: 1,
  },
  starText: {
    color: '#888',
    marginLeft: 5,
    fontSize: 12,
  },
  dateText: {
    color: '#888',
    fontSize: 12,
  },
  dv: {
    overflow: 'hidden',
    height: 1,
    marginBottom: 10,
  },
  dl: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mid: {
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    position: 'relative',
  },
  leftcon: {
    position: 'absolute',
    top: -5,
    backgroundColor: '#eee',
    width: 10,
    height: 10,
    borderRadius: 5,
    left: -5,
  },
  rightcon: {
    position: 'absolute',
    top: -5,
    backgroundColor: '#eee',
    width: 10,
    height: 10,
    borderRadius: 5,
    right: -5,
  },
  addressText: {
    color: '#888',
    fontSize: 12,
    lineHeight: 20,
  },
  detailText: {
    color: '#666',
    fontSize: 12,
    lineHeight: 20,
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


const MasterEval = ({ item }) => (
  <View style={styles.list}>
    <View style={styles.top}>
      <CachedImage source={{ uri: item.memberInfo.imgUrl }} style={styles.img} />
      <View style={styles.info}>
        <View style={styles.infoTop}>
          <Text style={styles.name}>
            {decodeURI(item.memberInfo.userName)}
          </Text>
          <Text style={styles.dateText}>{item.modiDate}</Text>
        </View>
        <View style={styles.typeView}>
          <View style={styles.type}>
            <Text style={styles.typeText}>{item.servicesTypeName}</Text>
          </View>
        </View>
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
            rating={item.attitudeScore || 5}
          />
          <Text style={styles.starText}>{item.attitudeScore || 5}分</Text>
        </View>
      </View>
    </View>
    <View style={styles.mid}>
      <View style={styles.dv}>
        <View style={styles.dl} />
      </View>
      <View style={styles.leftcon} />
      <View style={styles.rightcon} />
      <View style={styles.address}><Text style={styles.addressText}>{item.addressName}</Text></View>
      <View style={styles.detail}><Text style={styles.detailText}>{item.content}</Text></View>
    </View>
    <View style={styles.bom}>
      {
        item.imgUrl.length > 0 && <ImageLook images={item.imgUrl.split(',')} />
      }
    </View>
  </View>
);

MasterEval.propTypes = {
  item: PropTypes.object,
};
export default MasterEval;