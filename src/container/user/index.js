import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Text } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { BHeader, Loading, TOpacity, Iconfont } from '../../components';
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
    this.getInit();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  }
  _renderTop() {
    const { push } = this.props;
    return (
      <View style={styles.topView}>
        <Text style={styles.topLabel}>
          登陆注册更精彩
        </Text>
        <View style={styles.agreementView}>
          <Text style={styles.agreementLabel}>登陆即表示同意</Text>
          <TOpacity
            content={
              <Text style={styles.agreementText}>用户协议、隐私条款</Text>
            }
            onPress={() => push({ key: 'ClauseAndAgreement' })}
          />
        </View>
      </View>
    );
  }
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
            value={phone}
            keyboardType="numeric"
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
                clearButtonMode="while-editing"
                value={code}
                keyboardType="numeric"
                onChangeText={value => this.setState({ code: value })}
                onSubmitEditing={this.login}
              />
              <View>
                <TOpacity
                  style={[styles.sendBtn, this.isSend && { backgroundColor: '#aaa' }]}
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
  renderBindInfo() {
    const { memberInfo: { imgUrl, nickName } } = this.state;
    return (
      <View style={styles.infoTop}>
        <View style={styles.infoImgView}>
          <CachedImage source={{ uri: imgUrl }} style={styles.infoImg} />
        </View>
        <Text style={styles.infoName}>{decodeURI(nickName)}</Text>
      </View>
    );
  }
  renderSubmit() {
    return (
      <View>
        <TOpacity
          style={styles.submitBtn}
          content={
            <Text style={styles.submitBtnText}>立即绑定</Text>
          }
          onPress={this.GetMemberExistsService}
        />
      </View>
    );
  }
  _renderMid() {
    const { isCode } = this.state;
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
          <View style={styles.agreementView} />
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
    const { others, isWechatExist, isQQExist } = this.state;
    return (
      <View style={styles.otherView}>
        <View style={styles.otherTitle}>
          <Text style={styles.otherTitleText}>第三方登录</Text>
        </View>
        <View style={styles.otherLists}>
          {
            isWechatExist &&
            <TOpacity
              style={styles.otherList}
              content={
                <View style={styles.otherList}>
                  <Iconfont
                    name={others[0].icon}
                    style={[styles.otherIcon, { color: others[0].color }]}
                  />
                  <Text style={styles.otherText}>{others[0].label}</Text>
                </View>
              }
              onPress={() => this.otherLogin(0)}
            />
          }
          {
            isQQExist &&
            <TOpacity
              style={styles.otherList}
              content={
                <View style={styles.otherList}>
                  <Iconfont
                    name={others[1].icon}
                    style={[styles.otherIcon, { color: others[1].color }]}
                  />
                  <Text style={styles.otherText}>{others[1].label}</Text>
                </View>
              }
              onPress={() => this.otherLogin(1)}
            />
          }
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { isBind, isWechatExist, isQQExist } = this.state;
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <BHeader back={pop} title={isBind ? '绑定手机号' : '注册登陆'} />
        {
          isBind ?
            <Content style={styles.bindContent}>
              {this._renderTop()}
              {this.renderBindInfo()}
              {this._renderForm()}
              {this.renderSubmit()}
            </Content>
            :
            <Content contentContainerStyle={{ flex: 1 }}>
              {this._renderTop()}
              {this._renderForm()}
              {this._renderMid()}
              {(isWechatExist || isQQExist) && this._renderOther()}
            </Content>
        }
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
