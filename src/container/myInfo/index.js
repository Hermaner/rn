import React from 'react';
import { TouchableHighlight, TouchableOpacity,  Image, View } from 'react-native';
import { Container, Content, Header, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab } from '../../components';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import myInfoBase from './base';
import styles from './styles';

class MyInfo extends myInfoBase {
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
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>名字</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon style={{ color: '#5DA942', marginRight: 15 }} name="arrow-back" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pop}>
            <Icon style={{ color: '#5DA942' }} name="arrow-back" />
          </TouchableOpacity>
        </View>
      </Header>
    );
  }
  _renderBody() {
    const { push } = this.props;
    const Tab1 = () => this._rendContent();
    const Tab2 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <View style={styles.topPart}>
          <Image style={styles.userImg} source={require('../app/resource/imgs/2.png')} />
          <View style={{ flex: 1, marginTop: 5 }}>
            <Text style={styles.name}>姓名</Text>
            <Text style={styles.status}>合作社</Text>
          </View>
          <Image style={styles.QRCode} source={require('../app/resource/imgs/avatar.jpg')} />
        </View>
        <View style={styles.isAccreditation}>
          <View style={styles.leftPart}>
            <View style={styles.accreditationBox}>
              <Icon style={{ fontSize: 14 }} name="arrow-back" />
              <Text style={styles.accreditationText}>实名认证</Text>
            </View>
            <View style={styles.accreditationBox}>
              <Icon style={{ fontSize: 14 }} name="arrow-back" />
              <Text style={styles.accreditationText}>企业认证</Text>
            </View>
            <View style={styles.accreditationBox}>
              <Icon style={{ fontSize: 14 }} name="arrow-back" />
              <Text style={styles.accreditationText}>实地认证</Text>
            </View>
            <View style={styles.accreditationBox}>
              <Icon style={{ fontSize: 14 }} name="arrow-back" />
              <Text style={styles.accreditationText}>买家保障</Text>
            </View>
          </View>
          <Icon style={styles.RightPart} name="arrow-back" />
        </View>
        <View style={styles.myBusiness}>
          <View style={styles.flexBox}>
            <Text style={styles.flexOneTextLeft}>主营</Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={styles.flexOneTextLeft}>所在地</Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={styles.flexOneTextLeft}>注册时间</Text>
            <Text style={styles.flexOneTextRight}>2017-12-3</Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={styles.flexOneTextLeft}>备注</Text>
            <Icon style={styles.flexOneTextRight} name="arrow-back" />
          </View>
        </View>
        <View style={styles.type}>
          <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
            <Tab1 tabLabel="供应" />
            <Tab2 tabLabel="采购" />
          </ScrollableTabView>
        </View>
      </View>
    )
  }
  _rendContent() {
    return (
      <Text>ddddd</Text>
    )
  }
  render() {
    return (
      <Container>
        {this._readerHeader()}
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

MyInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyInfo);
