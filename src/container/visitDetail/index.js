import React from 'react';
import { View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
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
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const Tab1 = () => this._rendContent();
    const Tab2 = () => this._rendContent();
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <Icon style={styles.leftIcn} name="arrow-back" />
          <Text style={styles.visitText}>访客姓名:钟莲花</Text>
          <Icon style={styles.rightIcn} name="arrow-back" />
        </View>
        <View style={styles.rowBox}>
          <Icon style={styles.leftIcn} name="arrow-back" />
          <Text style={styles.visitText}>联系方式:124734378483</Text>
        </View>
        <View style={styles.rowBox}>
          <Icon style={styles.leftIcn} name="arrow-back" />
          <Text style={styles.visitText}>所在地:湖北省孝感市安陆市</Text>
        </View>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="访问详情" />
          <Tab2 tabLabel="近期浏览详情" />
        </ScrollableTabView>
      </View>
    );
  }
  _rendContent() {
    return (
      <Text>ddddd</Text>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="访问详情" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

VisitDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(VisitDetail);
