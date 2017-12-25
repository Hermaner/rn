import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import AccountCenterBase from './base';
import styles from './styles';

class AccountCenter extends AccountCenterBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { pop, push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerImgBox}>
          <Image style={styles.headerImg} source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} />
        </View>
        <View style={{ height: 150 }}>
          <View style={styles.accountMoney}>
            <Text style={styles.textBackground}>账户资金</Text>
            <TouchableOpacity style={styles.rightBtn} onPress={() => { push({ key: 'ValidatePhone' }); }}>
              <Text style={styles.textBackground}>提现</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.textBackground, styles.textMoney]}>￥0.00</Text>
        </View>
        <View style={styles.detailInfo}>
          <TouchableOpacity onPress={() => { push({ key: 'Bill' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#53BB20' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>账单</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>收支记录</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 20, color: '#53BB20' }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>支付密码</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#999', fontSize: 14 }}>设置/重置/修改支付密码</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <TouchableOpacity onPress={() => { push({ key: 'GatheringAccount' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#53BB20' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>收款账号</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>银行卡/支付宝账号/微信账号</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="账户中心" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

AccountCenter.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AccountCenter);
