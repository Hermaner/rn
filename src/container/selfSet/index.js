import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
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
  }
  _renderBody() {
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.detailInfo}>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>我的头像</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Image style={styles.lookForImg} source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }} />
            </View>
          </View>
          <TouchableOpacity onPress={() => { push({ key: 'RevisePhone' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>绑定手机号</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>123445567</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'UserInfo' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>个人信息</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>未设置</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lookForBtn} onPress={() => { push({ key: 'AdjectiveInfo' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>我的身份</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>买家/其他行业</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lookForBtn} onPress={() => { push({ key: 'ShippingAddress' }); }}>
            <View style={[styles.last, styles.infoBox]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>收货地址</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.detailInfo}>
          <TouchableOpacity style={styles.lookForBtn} onPress={() => { push({ key: 'Authentication' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>修改登录密码</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
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
