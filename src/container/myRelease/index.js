import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Tab, Tabs, TabHeading, Content, ActionSheet } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
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
  _randerBody() {
    const { pop } = this.props;
    const Tab1 = () => this._rendContent();
    const Tab2 = () => this._rendContent();
    const Tab3 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="采购中" />
          <Tab2 tabLabel="已停止" />
          <Tab3 tabLabel="被驳回" />
        </ScrollableTabView>
      </View>
    )
  }
  _rendContent() {
    const { pop, push } = this.props;
    const { BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX } = this.state;
    return (
      <TouchableOpacity onPress={() => { push({ key: 'PurchaseDetail' }); }}>
        <View style={styles.goodsitem}>
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
                <Text style={{ fontSize: 14, color: '#666' }}>浏览次数:4次</Text>
              </View>
            </View>
          </View>
          <View style={styles.readPeople}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FC8521', fontSize: 14 }}>11</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>人报价</Text>
            </View>
            <Text style={styles.renovateTime}>距截止6天</Text>
          </View>
          <View style={styles.btnList}>
            <TouchableOpacity
              style={styles.btnBox}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: '是否停止采购?'
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )}
            >
              <Text style={styles.btnText}>停止采购</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnBox, styles.btnChoose]}>
              <Text style={[styles.btnText, styles.btnTextChoose]}>查看报价</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="采购管理" />
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
