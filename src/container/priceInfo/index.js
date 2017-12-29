import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { TFeedback, Header } from '../../components';
import base from './base';
import styles from './styles';

class PriceDetail extends base {
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
    return (
      <View style={styles.pagebody}>
        <View style={styles.border}>
          <View style={styles.flexRow}>
            <Text style={[styles.normalText, { color: '#D93114' }]}>[采购中]</Text>
            <Text style={[styles.normalText, { color: '#FC8521' }]}>八月瓜/青皮八月瓜</Text>
          </View>
          <Text style={styles.normalText}>采购人：吴涛</Text>
          <Text style={styles.normalText}>采购地：河南省石家庄市</Text>
          <Text style={styles.normalText}>采购截止日期：2018-01-03</Text>
        </View>
        <Text style={styles.normalText}>价格：111.00元/斤</Text>
        <Text style={styles.normalText}>供应量：11.00斤</Text>
        <Text style={styles.normalText}>供货地：吉林省辽源市</Text>
        <Text style={styles.normalText}>报价时间：2017-12-29</Text>
        <Text style={styles.normalText}>补充说明</Text>
        <Input style={styles.inputs} multiline />
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="报价详情" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
        <View style={styles.flexRow}>
          <TFeedback
            content={
              <View style={styles.leftBtn}>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>聊生意</Text>
              </View>}
            onPress={() => { push({ key: 'User' }); }}
          />
          <TFeedback
            content={
              <View style={styles.rightBtn}>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>打电话</Text>
              </View>}
            onPress={() => { push({ key: 'User' }); }}
          />
        </View>
      </Container>
    );
  }
}

PriceDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(PriceDetail);
