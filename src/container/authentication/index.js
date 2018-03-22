import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Text, Input, Button } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading, TFeedback } from '../../components';
import authenticationBase from './base';
import styles from './styles';

class Authentication extends authenticationBase {
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
    const { code, sec } = this.state;
    const { phone } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Text style={styles.text}>
            您的账号绑定的是尾号为{phone.substring(phone.length, phone.length - 4) }的手机号码
          </Text>
          <Text style={styles.text}>请先输入验证码证明身份</Text>
        </View>
        <View style={styles.formBom}>
          <Input
            style={styles.password}
            placeholderTextColor="#999"
            placeholder="点击输入验证码"
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
        <Header back={pop} title="验证身份" />
        <Content>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.footerButton}>
                <Text style={styles.footerButtonText}>下一步</Text>
              </View>}
            onPress={() => this.enterSetPassword()}
          />
          <View style={styles.footerText}>
            <View style={styles.flexOne}>
              <Text style={styles.footerBottom}>如有疑问，请联系客服：</Text>
              <TouchableOpacity>
                <Text style={styles.footerBottomRight}>400-008-8688</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

Authentication.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Authentication);
