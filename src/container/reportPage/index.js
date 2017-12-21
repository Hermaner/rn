import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import reportPageBase from './base';
import styles from './styles';

class ReportPage extends reportPageBase {
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
      <View style={{ flex: 1 }}>
        <Text style={styles.whyReport}>您为什么要举报该账号？</Text>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>货品信息有问题</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>诈骗</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>骚扰/广告</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>价格虚假</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>服务问题</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>发布色情/政治/违法内容</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { push({ key: 'ReportDetailPage' }); }}>
          <View style={styles.infoBox}>
            <Text style={styles.reason}>其他原因</Text>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Icon name="arrow-back" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="举报-理由" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.returnIndex} onPress={pop}>
              <Text style={styles.returnIndexText}>返回首页</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactService} onPress={pop}>
              <Text style={styles.contactServiceText}>联系客服</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

ReportPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportPage);
