import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Header, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab } from '../../components';
import systemSetBase from './base';
import styles from './styles';

class SystemSet extends systemSetBase {
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
  _readerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>系统设置</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
      </Header>
    );
  }
  _renderBody() {
    const { pop, push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={[styles.rowBox, styles.marginTopBottom]}>
          <Text style={styles.boxLeft}>接收新消息通知</Text>
          <Text style={styles.boxRight}>已开启</Text>
        </View>
        <Text style={{ color: '#666', fontSize: 12, paddingLeft: 10, paddingRight: 14, marginBottom: 10 }}>
          如果您要关闭或开启手机惠农网的新消息通知,请在iphone的“设置”—“通知”功能中,找到应用程序“手机惠农”更改
        </Text>
        <TouchableOpacity>
          <View style={styles.rowBox}>
            <Text style={styles.boxLeft}>清理缓存</Text>
            <Icon name="arrow-back" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.rowBox}>
            <Text style={styles.boxLeft}>服务条款与协议</Text>
            <Icon name="arrow-back" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'AboutUs' }); }}>
          <View style={styles.rowBox}>
            <Text style={styles.boxLeft}>关于我们</Text>
            <Icon name="arrow-back" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        {this._readerHeader()}
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={{ backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10 }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>退出当前登录</Text>
            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

SystemSet.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SystemSet);
