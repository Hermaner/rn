import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import validatePhoneBase from './base';
import styles from './styles';

class ValidatePhone extends validatePhoneBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <View style={styles.tsHeader}>
          <Text style={styles.ts}>本地操作需要验证手机号码，请输入134******6844收到的短信验证码</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={{ marginRight: 15, color: '#333' }}>验证码</Text>
          <Input
            placeholderTextColor="#999"
            style={styles.inputs}
            placeholder="请输入收到的验证码"
            onChangeText={value => this.savePhone(value)}
          />
          <TouchableOpacity style={styles.getBox} onPress={this.sendCode}>
            <Text style={styles.get}>获取验证码</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="验证手机号码" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>下一步</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

ValidatePhone.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ValidatePhone);
