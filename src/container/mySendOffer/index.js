import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import mySendOfferBase from './base';
import styles from './styles';

class MySendOffer extends mySendOfferBase {
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
    const Tab4 = () => this._rendContent();
    const Tab5 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="全部" />
          <Tab2 tabLabel="已读" />
          <Tab3 tabLabel="未读" />
          <Tab4 tabLabel="审核中" />
          <Tab5 tabLabel="未通过" />
        </ScrollableTabView>
      </View>
    );
  }
  _rendContent() {
    return (
      <View style={styles.goodsitem}>
        <View style={styles.listItem}>
          <View style={styles.rowBox}>
            <Text>八月瓜</Text>
            <Text style={styles.textRight}>未读</Text>
          </View>
          <View style={styles.rowBox}>
            <Text>采购人：吴涛</Text>
          </View>
          <View style={styles.rowBox}>
            <Text>报价时间：2017-12-28</Text>
          </View>
          <View style={[styles.rowBox, { justifyContent: 'flex-end' }]}>
            <TFeedback
              content={
                <View style={[styles.leftBtn, styles.btnTotal]}>
                  <Text style={styles.btnText}>查看详情</Text>
                </View>}
              onPress={() => { push({ key: 'User' }); }}
            />
            <TFeedback
              content={
                <View style={[styles.rightBtn, styles.btnTotal]}>
                  <Text style={styles.btnText}>在线咨询</Text>
                </View>}
              onPress={() => { push({ key: 'User' }); }}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="发出报价" />
        <Content>
          {this._randerBody()}
        </Content>
      </Container>
    );
  }
}

MySendOffer.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySendOffer);
