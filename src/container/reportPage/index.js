import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Header, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
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
  _readerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pop} style={{marginLeft:20}}>
            <Text>关闭</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center'}}>举报-理由</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pop} style={{marginLeft:20}}>
            <Text>关闭</Text>
          </TouchableOpacity>
        </View>
      </Header>
    );
  }
  _renderBody() {
    const { pop, push } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.whyReport}>您为什么要举报该账号？</Text>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>货品信息有问题</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>诈骗</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>骚扰/广告</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>价格虚假</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>服务问题</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>发布色情/政治/违法内容</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.reason}>其他原因</Text>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            onPress={() => { push({ key: 'ReportDetailPage' }); }}
          >
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        {this._readerHeader()}
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
