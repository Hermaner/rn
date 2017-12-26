import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab } from '../../components';
import mySupplyBase from './base';
import styles from './styles';

class MySupply extends mySupplyBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _randerBody() {
    const Tab1 = () => this._rendContent();
    const Tab2 = () => this._rendContent();
    const Tab3 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="销售中" />
          <Tab2 tabLabel="已下架" />
          <Tab3 tabLabel="被驳回" />
        </ScrollableTabView>
      </View>
    );
  }
  _rendContent() {
    const { push } = this.props;
    return (
      <TouchableOpacity onPress={() => { push({ key: 'GoodDetail' }); }}>
        <View style={styles.goodsitem}>
          <View style={styles.goodsDetail}>
            <Image style={styles.goodsImg} source={require('../app/resource/imgs/avatar.jpg')} />
            <View style={{ flex: 1 }}>
              <View style={styles.goodsPrice}>
                <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>哈哈 野生 90-100g</Text>
                <View style={{}}>
                  <Text style={{ fontSize: 16, color: '#FC8521' }}>12.00元/斤</Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: '#666' }}>90-100g,野生,红色</Text>
              </View>
            </View>
          </View>
          <View style={styles.readPeople}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FC8521', fontSize: 14 }}>11</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>人查看</Text>
            </View>
            <Text style={styles.renovateTime}>2017-12-19 13:13:10 刷新</Text>
          </View>
          <View style={styles.btnList}>
            <TouchableOpacity style={styles.btnBox}>
              <Text style={styles.btnText}>下架</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBox}>
              <Text style={styles.btnText}>修改</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBox}>
              <Text style={styles.btnText}>刷新</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="我的供应" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._randerBody()}
        </Content>
      </Container>
    );
  }
}

MySupply.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySupply);
