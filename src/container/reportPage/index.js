import React from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import reportPageBase from './base';
import styles from './styles';

class ReportPage extends reportPageBase {
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
    const { push } = this.props;
    const { list, beMemberId, supplyId } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.whyReport}>您为什么要举报该账号？</Text>
        {
          list.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.infoBox}>
                  <Text style={styles.reason}>{item.title}</Text>
                  <View
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
                  >
                    <Icon style={styles.icn} name="md-arrow-dropright" />
                  </View>
                </View>}
              onPress={() => { push({ key: 'ReportDetailPage', params: { beMemberId, supplyId, type: item.id } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { push, pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="举报-理由" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
          {/* <View style={styles.footer}>
            <TFeedback
              content={
                <View style={styles.returnIndex} onPress={pop}>
                  <Text style={styles.returnIndexText}>返回首页</Text>
                </View>}
              onPress={() => { push({ key: 'Home' }); }}
            />
            <TFeedback
              content={
                <View style={styles.contactService} onPress={pop}>
                  <Text style={styles.contactServiceText}>联系客服</Text>
                </View>}
              onPress={() => { this.tellPhone(); }}
            />
          </View> */}
        </Content>
      </Container>
    );
  }
}

ReportPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportPage);
