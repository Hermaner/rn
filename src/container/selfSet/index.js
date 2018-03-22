import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import selfSetBase from './base';
import styles from './styles';

class SelfSet extends selfSetBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
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
    const { push } = this.props;
    const { userInfo, isSet } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.detailInfo}>
          {/* <TFeedback
            content={
              <View style={styles.infoBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 16 }}>绑定手机号</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#999', fontSize: 14 }}>{userInfo.phone}</Text>
                  <Icon style={styles.icn} name="md-arrow-dropright" />
                </View>
              </View>}
            onPress={() => { push({ key: 'RevisePhone' }); }}
          /> */}
          <TFeedback
            content={
              <View style={styles.infoBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 16 }}>个人信息</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#999', fontSize: 14 }}>{isSet ? '' : '未设置'}</Text>
                  <Icon style={styles.icn} name="md-arrow-dropright" />
                </View>
              </View>}
            onPress={() => { push({ key: 'UserInfo', params: { info: userInfo, set: isSet } }); }}
          />
          <TFeedback
            content={
              <View style={styles.lookForBtn}>
                <View style={styles.infoBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 16 }}>我的身份</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#999', fontSize: 14 }}>{userInfo.role === '1' ? '买家' : '卖家'}, {userInfo.identityName}</Text>
                    <Icon style={styles.icn} name="md-arrow-dropright" />
                  </View>
                </View>
              </View>}
            onPress={() => { push({ key: 'AdjectiveInfo', params: { type: userInfo.role, name: userInfo.identityName } }); }}
          />
          <TFeedback
            content={
              <View style={styles.lookForBtn}>
                <View style={[styles.last, styles.infoBox]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 16 }}>收货地址</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon style={styles.icn} name="md-arrow-dropright" />
                  </View>
                </View>
              </View>}
            onPress={() => { push({ key: 'ShippingAddress' }); }}
          />
        </View>
        <View style={styles.detailInfo}>
          {/* <TFeedback
            content={
              <View style={styles.lookForBtn}>
                <View style={styles.infoBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 16 }}>关于我们</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon style={styles.icn} name="md-arrow-dropright" />
                  </View>
                </View>
              </View>}
            onPress={() => { push({ key: 'Authentication', params: { phone: userInfo.phone } }); }}
          /> */}
          <TFeedback
            content={
              <View style={styles.lookForBtn}>
                <View style={[styles.last, styles.infoBox]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 16 }}>关于我们</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon style={styles.icn} name="md-arrow-dropright" />
                  </View>
                </View>
              </View>}
            onPress={() => { push({ key: 'AboutUs' }); }}
          />
          <TFeedback
            content={
              <View style={styles.lookForBtn}>
                <View style={[styles.last, styles.infoBox]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 16 }}>退出当前登录</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon style={styles.icn} name="md-arrow-dropright" />
                  </View>
                </View>
              </View>}
            onPress={() => { this.logOut(); }}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="个人设置" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

SelfSet.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SelfSet);
