import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Tab, Tabs, TabHeading, Content, ActionSheet } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import notificationSystemBase from './base';
import styles from './styles';

class NotificationSystem extends notificationSystemBase {
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
    const Tab4 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="全部" />
          <Tab2 tabLabel="系统" />
          <Tab3 tabLabel="活动" />
          <Tab4 tabLabel="交易" />
        </ScrollableTabView>
      </View>
    )
  }
  _rendContent() {
    const { pop, push } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.newsItem} onPress={() => { push({ key: 'NotificationSystemDetail' }); }}>
          <View style={styles.top}>
            <Text
              numberOfLines={1}
              style={styles.leftText}
            >
              你提交的品种名暂未通过审核你提交的品种名暂未通过审核你提交的品种名暂未通过审核你提交的品种名暂未通过审核你提交的品种名暂未通过审核
            </Text>
            <Icon style={styles.rightIcn} name="arrow-back" />
          </View>
          <Text style={styles.newsTime}>2017年12月19日</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="系统通知" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._randerBody()}
        </Content>
      </Container>
    );
  }
}

NotificationSystem.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(NotificationSystem);
