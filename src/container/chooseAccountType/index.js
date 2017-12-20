import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import chooseAccountTypeBase from './base';
import styles from './styles';

class ChooseAccountType extends chooseAccountTypeBase {
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
        <View style={styles.detailInfo}>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 10 }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>支付宝账号</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={styles.tuijian}>推荐</Text>
              <Text style={{ color: '#999', fontSize: 16 }}>极速到账,便捷安全</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 10 }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>微信账号</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={styles.tuijian}>推荐</Text>
              <Text style={{ color: '#999', fontSize: 16 }}>极速到账,便捷安全</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 10 }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>银行卡-个人账号</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 10 }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>银行卡-对公账号</Text>
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
        <Header back={pop} title="请选择账号类型" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

ChooseAccountType.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChooseAccountType);
