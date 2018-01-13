import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text, Input, Button } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading, TFeedback } from '../../components';
import revisePhoneBase from './base';
import styles from './styles';

class RevisePhone extends revisePhoneBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.getInit();
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { phone, code, sec } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.accountView}>
          <Text style={{ marginRight: 15, color: '#333' }}>+86</Text>
          <Input
            style={styles.account}
            placeholderTextColor="#999"
            placeholder="输入您的手机号"
            clearButtonMode="while-editing"
            value={phone}
            onChangeText={value => this.setState({ phone: value })}
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
          />
          <View>
            <Button light style={styles.sendBtn} disabled={this.isSend} onPress={this.sendCode}>
              <Text style={[styles.sendBtnText, { color: this.isSend ? '#fff' : '#fff' }]}>{this.isSend ? `${sec}s可重发` : '获取验证码'}</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="修改手机号码" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>立即绑定</Text>
              </View>}
            onPress={() => this.reviseUserInfo()}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

RevisePhone.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(RevisePhone);
