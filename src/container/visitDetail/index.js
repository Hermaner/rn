import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header, TFeedback } from '../../components';
import visitDetailBase from './base';
import styles from './styles';

class VisitDetail extends visitDetailBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { data } = this.props.navigation.state.params;
    const Tab1 = () => this._rendContent();
    const Tab2 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <Icon style={styles.leftIcn} name="arrow-back" />
          <Text style={styles.visitText}>访客姓名:{data.member.nickName}</Text>
          {/* <Icon style={styles.rightIcn} name="arrow-back" /> */}
        </View>
        <View style={styles.rowBox}>
          <Icon style={styles.leftIcn} name="arrow-back" />
          <Text style={styles.visitText}>联系方式:{data.member.phone}</Text>
        </View>
        <View style={styles.rowBox}>
          <Icon style={styles.leftIcn} name="arrow-back" />
          <Text style={styles.visitText}>
            所在地:{data.member.provinceName}{data.member.cityName}
          </Text>
        </View>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="访问详情" />
          <Tab2 tabLabel="近期浏览详情" />
        </ScrollableTabView>
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="访问详情" />
        <Content>
          {this._renderBody()}
        </Content>
        <TFeedback
          content={
            <View style={styles.footerBox}>
              <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>聊生意</Text>
            </View>}
          onPress={() => { push({ key: 'TalkBusiness' }); }}
        />
      </Container>
    );
  }
}

VisitDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(VisitDetail);
