import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { Content } from 'native-base';
import TOpacity from './TOpacity';
import { st, deviceW, deviceH, Mcolor } from '../utils';

const styles = StyleSheet.create({
  ModalStyle: {
    width: deviceW - 100,
    height: deviceH - 200,
  },
  imageListView: {
    position: 'relative',
  },
  imageList: {
    marginTop: 10,
    marginLeft: 10,
    width: (deviceW / 4) - 10,
    height: (deviceW / 4) - 10,
  },
  title: {
    height: 45,
    backgroundColor: '#eee',
    ...st.jacenter,
  },
  titleText: {
    fontSize: 15,
    color: Mcolor,
  },
  list: {
    height: 42,
    ...st.jcenter,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  listCur: {
    borderRightWidth: 3,
    borderColor: Mcolor,
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
});
const Select = ({ selectShow, closeModal, items, value, title, onValueChange }) => (
  <Modal
    style={styles.ModalStyle}
    position="center"
    entry="bottom"
    swipeToClose={false}
    animationDuration={300}
    onClosed={closeModal}
    isOpen={selectShow}
    ref={(o) => { this.ModalView = o; }}
  >
    <Content style={styles.modalView}>
      <View style={styles.title}><Text style={styles.titleText}>{title}</Text></View>
      {
        items.map((item, index) => (
          <TOpacity
            style={[styles.list, value === item.value && styles.listCur]}
            key={index}
            content={
              <Text style={styles.text}>{item.label}</Text>
            }
            onPress={() => onValueChange(item.value, item.label)}
          />
        ))
      }
    </Content>
  </Modal>

);
Select.propTypes = {
  selectShow: PropTypes.bool,
  closeModal: PropTypes.func,
  onValueChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
  items: PropTypes.array,
};
export default Select;
