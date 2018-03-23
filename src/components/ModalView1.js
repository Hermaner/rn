import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { Mcolor, st } from '../utils';
import TOpacity from './TOpacity';

const styles = StyleSheet.create({
  content: {
    width: 220,
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...st.jacenter,
  },
  title: {
    fontSize: 15,
    color: '#333',
  },
  main: {
    flex: 1,
    ...st.jacenter,
  },
  phoneView: {
    height: 70,
    ...st.jacenter,
  },
  phone: {
    color: Mcolor,
    fontSize: 18,
  },
  tips: {
    marginBottom: 20,
  },
  tipsText: {
    fontSize: 12,
    color: '#888',
  },
  modalBtns: {
    padding: 10,
    ...st.fr,
    justifyContent: 'space-between',
  },
  modalBtn: {
    width: 80,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Mcolor,
    ...st.jacenter,
  },
  modalText: {
    color: Mcolor,
    fontSize: 15,
  },
});

export default class Prompt extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.element,
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  showModal() {
    this.setState({
      modalVisible: true,
    });
  }
  close() {
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { title, content } = this.props;
    const { modalVisible } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="center"
        entry="bottom"
        animationDuration={300}
        onClosed={this.close}
        isOpen={modalVisible}
        coverScreen
        ref={(o) => { this.ModaladsView = o; }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              使用此号码进行通话
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.phoneView}>
              <Text style={styles.phone}>
                18017011377
              </Text>
            </View>
            <View style={styles.tips}>
              <Text style={styles.tipsText}>
                本次通话通过慧包网转接电话呼出，如果号码有误将无法接通
              </Text>
            </View>
          </View>
          <View style={styles.modalBtns}>
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>更换号码</Text>
                </View>
              }
              onPress={this.createAddress}
            />
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>确认拨打</Text>
                </View>
              }
              onPress={this.createAddress}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
