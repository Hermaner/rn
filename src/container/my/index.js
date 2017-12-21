import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Header, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

class My extends myBase {
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
    const { pop, push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerImgBox}>
          <Image style={styles.headerImg} source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} />
        </View>
        <View style={{ height: 150, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.accountMoney}>
            <Text style={styles.textBackground}>消息</Text>
            <TouchableOpacity onPress={() => { push({ key: 'SystemSet' }); }} style={styles.rightBtn}>
              <Text style={styles.textBackground}>设置</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { push({ key: 'SelfSet' }); }}>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.userImg} source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} />
              <View>
                <Text style={{ marginBottom: 25, backgroundColor: 'transparent', color: '#fff', fontSize: 16 }}>三生三世</Text>
                <Text style={[styles.textBackground, styles.textSmall]}>其他行业</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.myIdentity}>我是买家</Text>
          <TouchableOpacity onPress={() => { push({ key: 'MyRelease' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#5DA942' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>我发布的采购</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'MyBuyGoods' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#5DA942' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>买到的货品</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.myIdentity}>我是卖家</Text>
          <TouchableOpacity onPress={() => { push({ key: 'MySupply' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#00BAEE' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>我的供应</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'MySoldGoods' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#00BAEE' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>卖出的货品</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'MySendOffer' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#FD6A35' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>发出的报价</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'MyNichePush' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#FD6A35' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>商机推送</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'MyVisitor' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#66BC3C' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>我的访客</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.detailInfo, styles.paddingB]}>
          <Text style={styles.myIdentity}>其他</Text>
          <TouchableHighlight style={styles.infoBox} onPress={() => { push({ key: 'AccountCenter' }); }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#66BC3C' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>账户中心</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>账户资金/提现/账户安全</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 20, color: '#66BC3C' }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>一件代发</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#999', fontSize: 14 }}>惠农优选</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <TouchableOpacity onPress={() => { push({ key: 'MyInfo' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#66BC3C' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>我的主页</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'MyFootprint' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#00BAEE' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>我的足迹</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>我看过的采购/供应/店铺</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'Certification' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#00BAEE' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>我要认证</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: '#999', fontSize: 14 }}>提高货品曝光度</Text>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { push({ key: 'AboutUs' }); }}>
            <View style={styles.infoBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ marginRight: 20, color: '#FD6A35' }} name="arrow-back" />
                <Text style={{ color: '#666', fontSize: 16 }}>意见反馈</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon style={{ marginLeft: 10 }} name="arrow-back" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 20, color: '#FD6A35' }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>邀请好友</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
          <View style={[styles.infoBox, styles.borderB]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ marginRight: 20, color: '#FD6A35' }} name="arrow-back" />
              <Text style={{ color: '#666', fontSize: 16 }}>联系客服</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#999', fontSize: 14 }}>400-008-8900</Text>
              <Icon style={{ marginLeft: 10 }} name="arrow-back" />
            </View>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

My.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(My);
