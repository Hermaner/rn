import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { BHeader, Loading } from '../../components';
import base from './base';
import styles from './styles';

class UserPage extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        <BHeader back={pop} title="注册登陆" />
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={styles.form}>
            <View style={styles.accountView}>
              <Input
                style={styles.account}
                placeholderTextColor="#999"
                placeholder="输入您的手机号"
                clearButtonMode="while-editing"
                value={phone}
                onChangeText={value => this.setState({ phone: value })}
                onSubmitEditing={this.login}
              />
            </View>
            <View style={styles.formBom}>
              <Input
                style={styles.password}
                placeholderTextColor="#999"
                placeholder="输入验证码"
                clearButtonMode="while-editing"
                value={code}
                onChangeText={value => this.setState({ code: value })}
                onSubmitEditing={this.login}
              />
              <View>
                <Button light style={styles.sendBtn} disabled={this.isSend} onPress={this.sendCode}>
                  <Text style={[styles.sendBtnText, this.isSend && styles.sendBtnCur]}>{this.isSend ? `${sec}s可重发` : '获取验证码'}</Text>
                </Button>
              </View>
            </View>
          </View>
          <Button full style={styles.submitBtn} onPress={this.login}>
            <Text style={styles.submitBtnText}>登陆</Text>
          </Button>
          <View style={styles.bottomView}>
            <View style={styles.agreementView}>
              <Text style={styles.agreementLabel}>登陆即表示同意</Text>
              <TouchableOpacity onPress={() => push({ key: 'Agreement' })}>
                <Text style={styles.agreementText}>《服务协议》</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.bottomTipsView}>
              <Text style={styles.bottomTipsLabel}>如有疑问，请联系客服：</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('400322322', true)}>
                <Text style={styles.bottomTipsText}>400-000-000</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

UserPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(UserPage);
