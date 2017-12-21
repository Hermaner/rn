import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
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
    const { pop, push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.detailInfo}>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>我的头像</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Image style={styles.lookForImg} source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>绑定手机号</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#999', fontSize: 14 }}>123445567</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>个人信息</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#999', fontSize: 14 }}>未设置</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>我的身份</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#999', fontSize: 14 }}>买家/其他行业</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={[styles.last, styles.infoBox]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>收货地址</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
        </View>
        <View style={styles.detailInfo}>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>修改登录密码</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
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
