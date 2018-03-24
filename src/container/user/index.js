import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute, resetHome } from '../../actions';
import { Header, Loading, TOpacity } from '../../components';
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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderForm() {
    const { phone, passWord, code, sec, isCode } = this.state;
    return (
      <View style={styles.form}>
        <View style={styles.accountView}>
          <Input
            style={styles.account}
            placeholderTextColor="#999"
            placeholder="输入您的手机号"
            clearButtonMode="while-editing"
            keyboardType="numeric"
            value={phone}
            onChangeText={value => this.setState({ phone: value })}
            onSubmitEditing={this.login}
          />
        </View>
        {
          isCode ?
            <View style={styles.formBom}>
              <Input
                style={styles.password}
                placeholderTextColor="#999"
                placeholder="输入验证码"
                keyboardType="numeric"
                clearButtonMode="while-editing"
                value={code}
                onChangeText={value => this.setState({ code: value })}
                onSubmitEditing={this.login}
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
            :
            <View style={styles.accountView}>
              <Input
                style={styles.account}
                placeholderTextColor="#999"
                placeholder="输入您的密码"
                clearButtonMode="while-editing"
                value={passWord}
                secureTextEntry
                onChangeText={value => this.setState({ passWord: value })}
                onSubmitEditing={this.login}
              />
            </View>
        }
      </View>
    );
  }
  _renderMid() {
    const { isCode } = this.state;
    const { push } = this.props;
    return (
      <View>
        <TOpacity
          style={styles.submitBtn}
          content={
            <Text style={styles.submitBtnText}>登陆</Text>
          }
          onPress={this.login}
        />
        <View style={styles.bottomView}>
          <View style={styles.agreementView}>
            <Text style={styles.agreementLabel}>登陆即表示同意</Text>
            <TOpacity
              content={
                <Text style={styles.agreementText}>《服务协议》</Text>
              }
              onPress={() => push({ key: 'Agreement' })}
            />
          </View>
          <TOpacity
            content={
              <Text style={styles.changeText}>切换至{!isCode ? '验证码' : '密码'}登陆</Text>
            }
            onPress={this.changeLogin}
          />
        </View>
      </View>
    );
  }
  _renderOther() {
    const { others } = this.state;
    return (
      <View style={styles.otherView}>
        <View style={styles.otherTitle}>
          <Text style={styles.otherTitleText}>第三方登录</Text>
        </View>
        <View style={styles.otherLists}>
          {
            others.map((item, index) => (
              <TOpacity
                key={index}
                style={styles.otherList}
                content={
                  <View key={index} style={styles.otherList}>
                    <View style={[styles.otherTop, { backgroundColor: item.color }]}>
                      <Icon name={item.icon} style={styles.otherIcon} />
                    </View>
                    <Text style={styles.otherText}>{item.label}</Text>
                  </View>
                }
                onPress={() => this.otherLogin(index)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="注册登陆" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderForm()}
          {this._renderMid()}
          {this._renderOther()}
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
export default connect(null, { pop: popRoute, push: pushRoute, resetHome })(UserPage);
