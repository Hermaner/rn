import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
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
    const { items2 } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <TFeedback
          content={
            <View style={styles.topPart}>
              <Image style={styles.userImg} source={require('../app/resource/imgs/2.png')} />
              <View style={{ flex: 1, marginTop: 5 }}>
                <Text style={styles.name}>姓名</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.status}>合作社</Text>
                  <View style={{ flex: 1 }} />
                </View>
              </View>
              <Icon name="play" />
            </View>}
          onPress={() => { push({ key: 'User' }); }}
        />
        <TFeedback
          content={
            <View style={styles.isAccreditation}>
              <View style={styles.leftPart}>
                {
                  items2.map((item, index) => (
                    <View style={styles.accreditationBox} key={index}>
                      <Icon style={{ fontSize: 14 }} name={item.icn} />
                      <Text style={styles.accreditationText}>{item.title}</Text>
                    </View>
                  ))
                }
              </View>
              <Icon style={styles.RightPart} name="play" />
            </View>}
          onPress={() => { push({ key: 'User' }); }}
        />
        <View style={styles.myBusiness}>
          <View style={styles.tableBox}>
            <View style={styles.tableRow}>
              <View style={styles.flexOne}>
                <Text style={styles.leftText}>供应品类</Text>
              </View>
              <View style={styles.flexThree}>
                <Text style={styles.rightText}>八月瓜</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.flexOne}>
                <Text style={styles.leftText}>供应量</Text>
              </View>
              <View style={styles.flexThree}>
                <Text style={styles.rightText}>10000.0斤</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.flexOne}>
                <Text style={styles.leftText}>价格</Text>
              </View>
              <View style={styles.flexThree}>
                <Text style={styles.rightText}>10元/斤</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.flexOne}>
                <Text style={styles.leftText}>供货地</Text>
              </View>
              <View style={styles.flexThree}>
                <Text style={styles.rightText}>湖南市常德市</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.flexOne}>
                <Text style={styles.leftText}>报价时间</Text>
              </View>
              <View style={styles.flexThree}>
                <Text style={styles.rightText}>2017-12-23 16:26:28</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderGoodsInfo() {
    return (
      <View style={styles.goodsInfo}>
        <View style={styles.flexRow}>
          <Image style={styles.goodsImg} source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.goodsName}>紫色一号八月瓜 150g以上</Text>
            <Text style={{ fontSize: 14, color: '#999' }}>150g以上 箱装</Text>
            <View style={[styles.flexRow, { marginTop: 20 }]}>
              <Text style={{ fontSize: 14, color: '#999' }}>25.00元/斤</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#999', textAlign: 'right' }}>53分钟前</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="报价详情" />
        <Content>
          {this._renderBody()}
          {this._renderGoodsInfo()}
          <View style={styles.Supplements}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 4 }}>补充说明</Text>
            <Text style={{ fontSize: 14, color: '#999' }}>八月瓜品种有紫色金色黑色</Text>
          </View>
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
