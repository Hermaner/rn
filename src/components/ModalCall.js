import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { Input } from 'native-base';
import { Mcolor, st } from '../utils';
import TOpacity from './TOpacity';
import { DySmsCallService } from '../api';

const styles = StyleSheet.create({
  ModalStyle: {
    width: 220,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  content: {
    width: 220,
    height: 200,
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
    height: 60,
    ...st.jacenter,
  },
  phone: {
    color: Mcolor,
    fontSize: 22,
  },
  tips: {
    width: 180,
    ...st.jacenter,
  },
  tipsText: {
    fontSize: 12,
    color: '#888',
  },
  modalBtns: {
    padding: 20,
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
  modalBtnCur: {
    backgroundColor: Mcolor,
  },
  modalText: {
    color: Mcolor,
    fontSize: 15,
  },
  modalTextCur: {
    color: '#fff',
  },
  input: {
    width: 200,
    color: Mcolor,
    fontSize: 20,
    textAlign: 'center',
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
      value: '',
      modalVisible: false,
      isChange: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }
  change = () => {
    this.setState({
      isChange: !this.state.isChange,
    });
  }
  call = () => {
    const { value, isChange, phoneB, memberIdB } = this.state;
    const { phone } = global.userData;
    if (isChange) {
      const telReg = !(value).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
      if (telReg) {
        Toast.show('手机号格式不对');
        return;
      }
      DySmsCallService({
        phoneA: value,
        memberIdA: global.memberId,
        phoneB,
        memberIdB,
      }).then((res) => {
        console.log(res);
        if (res.isSuccess) {
          const result = res.data;
          Communications.phonecall(result, false);
        } else {
          Toast.show(res.msg);
        }
      }).catch(() => {
        // this.sleek.toggle();
      });
    } else {
      DySmsCallService({
        phoneA: phone,
        memberIdA: global.memberId,
        phoneB,
        memberIdB,
      }).then((res) => {
        console.log(res);
        if (res.isSuccess) {
          const result = res.data;
          Communications.phonecall(result, false);
        } else {
          Toast.show(res.msg);
        }
      }).catch(() => {
      });
    }
  }
  show(phoneB, memberIdB) {
    if (!global.memberId) {
      Toast.show('请先登录');
      return;
    }
    if (!global.userData.phone) {
      Toast.show('请先绑定手机号');
      return;
    }
    this.setState({
      modalVisible: true,
      phoneB,
      memberIdB,
    });
  }
  close() {
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { modalVisible, value, isChange } = this.state;
    const userData = global.userData;
    if (!userData) {
      return <View />;
    }
    const { phone } = userData;
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
              {
                !isChange ?
                  <Text style={styles.phone}>
                    {phone}
                  </Text>
                  :
                  <Input
                    style={styles.input}
                    placeholderTextColor="#999"
                    placeholder="输入手机号"
                    clearButtonMode="while-editing"
                    value={value}
                    autoFocus
                    onChangeText={e => this.setState({ value: e })}
                    onSubmitEditing={this.login}
                  />
              }
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
              onPress={this.change}
            />
            <TOpacity
              style={[styles.modalBtn, styles.modalBtnCur]}
              content={
                <View>
                  <Text style={[styles.modalText, styles.modalTextCur]}>确认拨打</Text>
                </View>
              }
              onPress={this.call}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
