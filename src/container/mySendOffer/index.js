import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Tab, Tabs, TabHeading, Content } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab } from '../../components';
import ScrollableTabView from 'react-native-scrollable-tab-view';
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
  _readerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        </View>
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>已买到的货品</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Icon style={{ color: '#5DA942' }} name="arrow-back" />
          </TouchableOpacity>
        </View>
      </Header>
    );
  }
  _randerBody() {
    const { pop } = this.props;
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
    )
  }
  _rendContent() {
    return (
      <View style={styles.goodsitem}>

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

MySendOffer.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySendOffer);
