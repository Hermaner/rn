import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Tab, Tabs, TabHeading, Content } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { Header } from '../../components';
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
  _randerBody() {
    const { pop, push } = this.props;
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
            <View style={styles.rowItem}>
              <TouchableOpacity>
                <View style={styles.rowBox}>
                  <Text style={styles.flexOneleft}>12-19 10:30</Text>
                  <Text style={styles.flexOneCenter}>增光</Text>
                  <Text style={styles.flexOneRight}>新疆烤羊</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.isHidden}>
                <View style={styles.userBox}>
                  <View style={styles.leftPart}>
                    <View style={styles.flexRow}>
                      <Image
                        style={styles.userImg}
                        source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513849497983&di=f3f3fb38de9b5b7d7f41f1063cbc4767&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8ad4b31c8701a18bb4b1f022942f07082838fe01.jpg' }}
                      />
                      <View>
                        <View style={styles.flexRow}>
                          <Text style={styles.userName}>刘德华</Text>
                          <Icon style={{ fontSize: 14, marginBottom: 6 }} name="arrow-back" />
                        </View>
                        <Text style={styles.time}>注册时间: 2017年05月14日 批发商</Text>
                      </View>
                    </View>
                    <Text style={styles.userAdress}>湖南省长沙市天心区黄兴中路84</Text>
                  </View>
                  <Icon style={styles.rightIcn} name="arrow-back" />
                </View>
                <View style={[styles.btnList, styles.btnLeft]}>
                  <TouchableOpacity style={styles.btn} onPress={() => { push({ key: 'VisitDetail' }); }}>
                    <Text style={[styles.btnText, styles.btnLeftText]}>他浏览过什么</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btnCenter]}>
                    <Text style={styles.btnText}>打电话</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btnRight]} onPress={() => { push({ key: 'TalkBusiness' }); }}>
                    <Text style={styles.btnText}>聊生意</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
        <Header back={pop} title="我的访客" />
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
