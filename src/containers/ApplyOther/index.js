import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class ApplyOther extends base {
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
  _renderUser() {
    const { companyName, contacts, phone, code, sec } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="入驻信息" />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>企业名称</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少4字"
              clearButtonMode="while-editing"
              value={companyName}
              onChangeText={value => this.setState({ companyName: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>真实姓名</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少2字"
              clearButtonMode="while-editing"
              value={contacts}
              onChangeText={value => this.setState({ contacts: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>手机号</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="11位手机号"
              clearButtonMode="while-editing"
              value={phone}
              onChangeText={value => this.setState({ phone: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>验证码</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="请输入验证码"
              clearButtonMode="while-editing"
              value={code}
              onChangeText={value => this.setState({ code: value })}
            />
            <View>
              <Button light style={styles.sendBtn} disabled={this.isSend} onPress={this.sendCode}>
                <Text style={[styles.sendBtnText, this.isSend && styles.sendBtnCur]}>{this.isSend ? `${sec}s可重发` : '获取验证码'}</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="其他商家入驻" />
        <Content>
          {this._renderUser()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即申请'}</Text>
            }
            onPress={this.CreateOtherOrgService}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ApplyOther.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ApplyOther);
