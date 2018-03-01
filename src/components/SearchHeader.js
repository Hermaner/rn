import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon, Input } from 'native-base';
import { Mcolor, st } from '../utils';
import TFeedback from './TFeedback';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f8f8f8',
    ...st.jacenter,
  },
  left: {
    width: 20,
    ...st.jacenter,
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    ...st.fr,
    ...st.jacenter,
    backgroundColor: '#eee',
    borderRadius: 15,
    marginLeft: 10,
    height: 30,
  },
  HeaderMainText: {
    color: '#444',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  HeaderIcon: {
    color: '#333',
    fontSize: 18,
  },
  right: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    ...st.jacenter,
  },
  rightText: {
    color: Mcolor,
    fontSize: 14,
  },
  backIcon: {
    fontSize: 24,
    color: '#444',
  },
});
const headerBar = ({ back, submit, value, searchChange }) => (
  <Header style={styles.header}>
    <TouchableOpacity onPress={back} style={styles.left}>
      <Icon name="arrow-back" style={styles.backIcon} />
    </TouchableOpacity>
    <TFeedback
      content={
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Input
            style={styles.HeaderMainText}
            placeholderTextColor="#666"
            placeholder="搜索服务"
            clearButtonMode="while-editing"
            value={value}
            onSubmitEditing={() => submit(value)}
            onChangeText={searchChange}
          />
        </View>
      }
      onPress={() => { }}
    />
  </Header>
);

headerBar.propTypes = {
  back: PropTypes.func,
  value: PropTypes.string,
  submit: PropTypes.func,
  searchChange: PropTypes.func,
};
export default headerBar;
