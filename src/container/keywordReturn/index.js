import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Text, Input, Switch, Icon } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import keywordReturnBase from './base';
import styles from './styles';

class KeywordReturn extends keywordReturnBase {
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
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>类目</Text>
          <Text style={[styles.defaultText, styles.diffentText]}>八月瓜</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>品种</Text>
          <Text style={[styles.defaultText, styles.diffentText]}>哈哈</Text>
        </View>
        <View style={styles.rowBox}>
          <View style={[styles.box, styles.flexOne]}>
            <Text style={styles.leftText}>产地</Text>
            <Text style={styles.defaultText}>河北省</Text>
          </View>
          <View style={styles.rightICn}>
            <Icon name="arrow-back" />
          </View>
        </View>
        <View style={styles.rowBox}>
          <View style={[styles.box, styles.flexOne]}>
            <Text style={styles.leftText}>供货范围</Text>
            <Text style={styles.defaultText}>全国</Text>
          </View>
          <View style={styles.rightICn}>
            <Icon name="arrow-back" />
          </View>
        </View>
        <View style={[styles.rowBox, styles.flex]}>
          <Text style={styles.leftText}>推送要求</Text>
          <Input
            placeholderTextColor="#999"
            multiline
            style={styles.inputs}
            placeholder="您还有什么其他推送要求可以在这里填写您还有什么其他推送要求可以在这里填写"
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={{ fontSize: 14, color: '#666' }}>接受代买信息</Text>
          <View style={styles.switchBox}>
            <Switch style={styles.switch} value={false} />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.whatDm}>
            什么是代卖？
          </Text>
          <Text style={styles.whatContent}>
            市场中有门店的老板发布信息，他们将铺面租给供货商卖货，或供货商将货品放在店中代卖，门店老板按照卖出货品的销售额按比例提成或按天收取固定的费用
          </Text>
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="修改关键词" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.footerButton}>
            <View style={styles.footerButtonBox}>
              <Text style={styles.footerButtonText}>发供应</Text>
            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

KeywordReturn.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(KeywordReturn);
