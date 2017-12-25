import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Tab, Tabs, TabHeading, Content, ActionSheet } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import notificationSystemDetailBase from './base';
import styles from './styles';

class NotificationSystemDetail extends notificationSystemDetailBase {
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
    return (
      <View style={styles.pagebody}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>您提交的品种名暂未通过审核</Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text style={styles.content}>
            您好:您提交的品种名:哈哈暂未通过平台盛和，原因是：品种与分类不服，感谢您对惠农网的支持，感谢您对平台的完善所做的努力！
          </Text>
          <Text style={styles.time}>19:12:12</Text>
        </View>
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

NotificationSystemDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(NotificationSystemDetail);
