import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Header, Footer, Title, FooterTab, Button, Left, Right, Card, Switch, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import reportDetailPagebase from './base';
import styles from './styles';

class ReportDetailPage extends reportDetailPagebase {
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
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>举报-详细</Text>
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
      <View style={styles.pagebody}>
        <Text style={styles.whyReport}>详细描述</Text>
        <View style={styles.infoBox}>
          <TextInput
            style = {styles.inputs}
            multiline="true"
            returnKeyType = "search"
            placeholder= "详细描述被举报人的恶意行为(必填,最少输入20个字)"
          />
          <Text style={{ textAlign: 'right', color: '#666' }}>0/200</Text>
        </View>
        <Text style={styles.addPz}>上传举报凭证</Text>
        <View style={styles.infoBox2}>
          <View style={{ width: 80, height: 80 }}></View>
          <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传举报凭证,增加可信度,最多可上传9张图片</Text>
        </View>
        <View style={styles.shieldThePeople}>
          <Text style={{ color: '#666', fontSize: 14 }}>屏蔽此人</Text>
          <Right>
            <Switch value={false} />
          </Right>
        </View>
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
          <View style={styles.btnBox}>
            <TouchableOpacity style={styles.submitBtn} onPress={pop}>
              <Text style={styles.submitBtnText}>提交</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

ReportDetailPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportDetailPage);
