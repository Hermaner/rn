import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import IconI from 'react-native-vector-icons/Ionicons';
import { Mred } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentView: {
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  topView: {
    flexDirection: 'row',
    height: 50,
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    marginTop: 18,
  },
  closeBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 40,
    right: 0,
    top: 0,
  },
  btnView: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  confirm: {
    justifyContent: 'center',
    backgroundColor: Mred,
    flex: 1,
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});

const time = 200;
export default class Prompt extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    content: React.PropTypes.element,
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      CHeight: new Animated.Value(300),
      loadingSleek: false,
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.closeLoading = this.closeLoading.bind(this);
  }
  showModal() {
    this.setState({
      modalVisible: true,
    }, () => {
      Animated.timing(
        this.state.CHeight,
        {
          toValue: 0,
          duration: time,
        },
      ).start();
    });
  }
  closeModal() {
    setTimeout(() => {
      this.setState({
        modalVisible: false,
      });
    }, time);
    Animated.timing(
      this.state.CHeight,
      {
        toValue: 300,
        duration: time,
      },
    ).start();
  }
  showLoading() {
    this.setState({
      loadingSleek: true,
    });
  }
  closeLoading() {
    this.setState({
      loadingSleek: false,
    });
  }
  render() {
    const { title, content } = this.props;
    const { modalVisible, loadingSleek } = this.state;
    return (
      <Modal
        animationType={'none'}
        transparent
        visible={modalVisible}
        onRequestClose={() => { console.log('关闭'); }}
      >
        <TouchableWithoutFeedback onPress={this.closeModal}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[styles.contentView, { transform: [{ translateY: this.state.CHeight }] }]}
              >
                <View style={styles.topView}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity style={styles.closeBtn} onPress={this.closeModal}>
                    <IconI name="ios-close-outline" size={35} color="#444" />
                  </TouchableOpacity>
                </View>
                <View style={styles.content}>
                  {content}
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        <SleekLoadingIndicator loading={loadingSleek} />
      </Modal>
    );
  }
}
