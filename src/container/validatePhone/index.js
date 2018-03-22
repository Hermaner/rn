import React from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading, TFeedback, TOpacity } from '../../components';
import revisePhoneBase from './base';
import styles from './styles';

class RevisePassword extends revisePhoneBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { phone, code, sec, passWord } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.accountView}>
          <Text style={{ marginRight: 15, color: '#333' }}>+86</Text>
          <Text style={styles.account} >{phone}</Text>
        </View>
        <View style={styles.formBom}>
          <Input
            style={styles.password}
            placeholderTextColor="#999"
            placeholder="输入验证码"
            clearButtonMode="while-editing"
            keyboardType="numeric"
            value={code}
            onChangeText={value => this.setState({ code: value })}
          />
          <View>
            <TOpacity
              style={styles.sendBtn}
              content={
                <Text style={styles.sendBtnText}>{this.isSend ? `${sec}s可重发` : '获取验证码'}</Text>
              }
              onPress={this.sendCode}
            />
          </View>
        </View>
        <View style={styles.formBom}>
          <Input
            style={styles.password}
            placeholderTextColor="#999"
            placeholder="密码"
            clearButtonMode="while-editing"
            value={passWord}
            onChangeText={value => this.setState({ passWord: value })}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="设置支付密码" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>确定</Text>
              </View>}
            onPress={() => this.reviseUserInfo()}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

RevisePassword.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(RevisePassword);
