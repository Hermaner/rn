import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text, Footer, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TOpacity, CheckBox } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class MyAddressCreate extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
    this.getInit();
  }
  componentWillUnmount() {
    this.deleteInit();
  }
  _renderUser() {
    const { name, phone, code, sec, addressTitle, fullAddress, receiveAddressId } = this.state;
    return (
      <View style={styles.mainList}>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>联系人</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少2字"
              clearButtonMode="while-editing"
              value={name}
              onChangeText={value => this.setState({ name: value })}
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
              <Button light style={styles.sendBtn} onPress={this.sendCode}>
                <Text style={[styles.sendBtnText, this.isSend && styles.sendBtnCur]}>{this.isSend ? `${sec}s可重发` : '获取验证码'}</Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>所在地区</Text>
          <TOpacity
            style={styles.listRight}
            content={
              <View style={styles.areaView}>
                <Text style={[styles.areaText, { color: addressTitle.length > 0 ? '#333' : '#999' }]}>{addressTitle || '选择所在地区'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => this.props.push({ key: 'CgyCitys', params: { type: 'emitArea' } })}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>所在地址</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少5字"
              clearButtonMode="while-editing"
              value={fullAddress}
              onChangeText={value => this.setState({ fullAddress: value })}
            />
          </View>
        </View>
        {!receiveAddressId && this._renderDefault()}
      </View>
    );
  }
  _renderDefault() {
    const { isDefault } = this.state;
    return (
      <View style={styles.listBom}>
        <CheckBox
          content={
            <Text style={styles.checkText}>设为默认</Text>
          }
          value={1}
          isAn
          reverse
          onPress={this.backCheck}
          color={Mcolor}
          modal={isDefault}
        />
        <View style={styles.listcK} />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="创建新地址" />
        <Content>
          {this._renderUser()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'保存信息'}</Text>
            }
            onPress={this.AddOrUpdateReceiveAddressService}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyAddressCreate.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyAddressCreate);
