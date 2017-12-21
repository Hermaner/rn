import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Tab, Tabs, TabHeading, Content } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import myVisitorBase from './base';
import styles from './styles';

class MyVisitor extends myVisitorBase {
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
        <Text style={{ width: '50%', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>我的访客</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity onPress={pop}>
            <Text style={{ marginRight: 10 }}>筛选</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pop}>
            <Icon style={{ color: '#5DA942' }} name="arrow-back" />
          </TouchableOpacity>
        </View>
      </Header>
    );
  }
  _randerBody() {
    const { pop } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.visitData}>
          <View style={styles.flexRow}>
            <View style={styles.leftBorder}>
              <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>近7天看我店铺的人数</Text>
            </View>
            <Text style={{ flex: 1, textAlign: 'right', fontSize: 16, color: '#17B4EF', fontWeight: 'bold' }}>11</Text>
          </View>
        </View>
        <View style={styles.visitorInfo}>
          <View style={styles.visitorType}>
            <Text style={styles.flexOneleft}>访问时间</Text>
            <Text style={[styles.flexOneCenter, styles.flexTextColor]}>访客姓名</Text>
            <Text style={styles.flexOneRight}>浏览的供应</Text>
          </View>
          <View style={styles.rowBoxList}>
            <View style={styles.rowBox}>
              <Text style={styles.flexOneleft}>12-19 10:30</Text>
              <Text style={styles.flexOneCenter}>增光</Text>
              <Text style={styles.flexOneRight}>新疆烤羊</Text>
            </View>
            <View style={styles.rowBox}>
              <Text style={styles.flexOneleft}>12-19 10:30</Text>
              <Text style={styles.flexOneCenter}>增光</Text>
              <Text style={styles.flexOneRight}>新疆烤羊</Text>
            </View>
          </View>
        </View>
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

MyVisitor.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyVisitor);
