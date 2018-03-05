import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { BHeader, Loading } from '../../components';
import base from './base';
import styles from './styles';

class BindPhone extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
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
  render() {
    const { phone, code, sec } = this.state;
    const { pop } = this.props;
    return (
      <Container>
        <BHeader back={pop} title="绑定手机号" />
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
          <Button full style={styles.submitBtn} onPress={this.UpdateMemberService}>
            <Text style={styles.submitBtnText}>确认修改</Text>
          </Button>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

BindPhone.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(BindPhone);
