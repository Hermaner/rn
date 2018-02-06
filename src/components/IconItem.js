import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Iconfont } from './index';
import { st, deviceW } from '../utils';

const styles = StyleSheet.create({
  list: {
    ...st.jacenter,
    flex: 1,
  },
  iconView: {
    ...st.jacenter,
    width: deviceW * 0.2,
    height: deviceW * 0.2,
    borderRadius: deviceW * 0.1,
  },
  icon: {
    fontSize: 28,
    color: '#fff',
  },
  text: {
    color: '#444',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 5,
  },
});


const IconItem = ({ item, big }) => (
  <View style={styles.list}>
    <View
      style={[styles.iconView,
        {
          width: deviceW * (big ? 0.18 : 0.14),
          height: deviceW * (big ? 0.18 : 0.14),
          borderRadius: deviceW * (big ? 0.9 : 0.07),
          backgroundColor: item.color,
        }]
    }
    >
      <Iconfont style={styles.icon} name={item.icon} />
    </View>
    <Text style={styles.text}>{item.text}</Text>
  </View>
);

IconItem.propTypes = {
  item: PropTypes.object,
  big: PropTypes.bool,
};
export default IconItem;
