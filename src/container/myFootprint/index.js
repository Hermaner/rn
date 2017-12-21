import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Tab, Tabs, TabHeading, Content } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab } from '../../components';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import myReleaseBase from './base';
import styles from './styles';

class MyRelease extends myReleaseBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
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
        </View>
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>采购管理</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
      </Header>
    );
  }
  _randerBody() {
    const { pop } = this.props;
    const Tab1 = () => this._renderRelease();
    const Tab2 = () => this._renderSupply();
    const Tab3 = () => this._renderShop();
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="采购" />
          <Tab2 tabLabel="供应" />
          <Tab3 tabLabel="店铺" />
        </ScrollableTabView>
      </View>
    )
  }
  _renderRelease() {
    return (
      <View style={styles.goodsList}>
        <View style={styles.goodsitem}>
          <View style={styles.buyTime}>
            <Text style={styles.buyTimeText}>12月20日</Text>
          </View>
          <View style={styles.goodsDetail}>
            <View style={{ flex: 1 }}>
              <View style={styles.goodsPrice}>
                <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>哈哈 野生 90-100g</Text>
                <View style={{}}>
                  <Text style={{ fontSize: 16, color: '#FC8521' }}>面议</Text>
                </View>
              </View>
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 14, color: '#666' }}>品种:野生八月瓜</Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: '#666' }}>所在地:江苏省南京市</Text>
              </View>
              <View style={styles.activeDetail}>
                <View style={{ flex: 1 }}>
                  <View style={styles.time}>
                    <Text style={styles.everyWeek}>不限</Text>
                    <Text style={styles.scaleText}>距截止35天</Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <View style={styles.offerBox}>
                    <Text style={styles.offer}>去报价</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  _renderSupply() {
    return (
      <View style={styles.goodsList}>
        <View style={styles.goodsitem}>
          <View style={styles.buyTime}>
            <Text style={styles.buyTimeText}>12月20日</Text>
          </View>
          <View style={styles.goodsInfoDetail}>
            <Image style={styles.goodsImg} source={require('../app/resource/imgs/avatar.jpg')} />
            <View>
              <Text style={styles.goodsName}>波姬红</Text>
              <Text style={styles.price}>25.00元/棵</Text>
              <View style={styles.label}>
                <Text style={styles.labelText}>协助找车</Text>
              </View>
              <View style={styles.address}>
                <Icon style={{ fontSize: 14, marginRight: 6 }} name="arrow-back" />
                <Text style={styles.addressText}>湖南省 岳阳市 岳阳县 王立雄</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  _renderShop() {
    return (
      <View style={styles.goodsList}>
        <View style={styles.goodsitem}>
          <View style={styles.buyTime}>
            <Text style={styles.buyTimeText}>12月20日</Text>
          </View>
          <View style={styles.userInfoDetail}>
            <Image style={styles.userImg} source={require('../app/resource/imgs/avatar.jpg')} />
            <View>
              <Text style={styles.userName}>姓名</Text>
              <Text style={styles.yw}>主营业务:</Text>
              <Text style={styles.yw}>认证信息:</Text>
              <View style={styles.userAddress}>
                <Text style={styles.addressText}>地址:</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        {this._readerHeader()}
        <Content style={{ backgroundColor: '#fff' }}>
          {this._randerBody()}
        </Content>
      </Container>
    );
  }
}

MyRelease.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyRelease);
