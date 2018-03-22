import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { st, Mcolor } from '../utils';

const styles = StyleSheet.create({
  title: {
    ...st.frcenter,
    height: 42,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    marginTop: 4,
    paddingRight: 10,
    borderBottomColor: '#e2e2e2',
  },
  line: {
    marginLeft: 5,
    marginRight: 5,
    width: 3,
    backgroundColor: Mcolor,
    height: 14,
  },
  text: {
    color: '#444',
    flex: 1,
    fontSize: 14,
  },
});
const TitleItem = ({ text, rightContent }) => (
  <View style={styles.title}>
    <View style={styles.line} />
    <Text style={styles.text}>{text}</Text>
    {
      rightContent &&
      rightContent
    }
  </View>
);

TitleItem.propTypes = {
  text: PropTypes.string,
  rightContent: PropTypes.any,
};
export default TitleItem;
