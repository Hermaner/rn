import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import purchaseDetailBase from './base';
import styles from './styles';

class PurchaseDetail extends purchaseDetailBase {
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
        <View style={styles.endTime}>
          <Text style={{ color: '#333', fontSize: 14 }}>报价结束时间：</Text>
          <Text style={{ color: '#FC801B', fontSize: 18 }}>36天</Text>
          <Icon style={styles.closeIcon} name="arrow-back" />
        </View>
        <View style={styles.userImg}>
          <Image style={styles.img} source={require('../app/resource/imgs/avatar.jpg')} />
          <View style={styles.userInfo}>
            {
              false &&
              <Text style={styles.userName}>姓名</Text>
            }
            <Text style={styles.purchaseCount}>已发1条采购</Text>
          </View>
        </View>
        <View style={styles.needGoodsDetail}>
          <View style={[styles.rowBox, styles.diffentBackground]}>
            <View style={styles.boderOne}>
              <Text style={styles.flexOne}>采购货品</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={styles.flexTwo}>货品规格</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={styles.boderOne}>
              <Text style={[styles.flexOne, styles.text7]}>枫树</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>不限</Text>
            </View>
          </View>
          <View style={[styles.rowBox, styles.diffentBackground]}>
            <View style={styles.boderOne}>
              <Text style={styles.flexOne}>品种</Text>
            </View>
            <View style={styles.boderOne}>
              <Text style={styles.flexOne}>需求量</Text>
            </View>
            <View style={styles.boderOne}>
              <Text style={styles.flexOne}>期望价格</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={styles.boderOne}>
              <Text style={[styles.flexOne, styles.text6]}>五角枫</Text>
            </View>
            <View style={styles.boderOne}>
              <Text style={[styles.flexOne, styles.text6]}>400棵</Text>
            </View>
            <View style={styles.boderOne}>
              <Text style={[styles.flexOne, styles.text7]}>面议</Text>
            </View>
          </View>
          <View style={[styles.rowBox, styles.diffentBackground]}>
            <View style={styles.boderOne}>
              <Text style={styles.flexOne}>期望货源地</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={styles.flexTwo}>所在地区</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={styles.boderOne}>
              <Text style={[styles.flexOne, styles.text6]}>江苏省南京市</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>江苏省南京市</Text>
            </View>
          </View>
        </View>
        {
          false &&
          <View style={styles.addExplain}>
            <Text style={styles.addExplainText}>补充说明</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#eee' }}>
              <Text style={{ color: '#666', fontSize: 14, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                求购胸径10公分五角松,2.2至2.5分枝,杆直冒圆,一级货源,土球75公分,数量400棵,有货速度联系我
              </Text>
            </View>
          </View>
        }
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="采购详情" />
        <Content>
          {this._renderBody()}
        </Content>
        {
          false &&
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>立即报价</Text>
          </TouchableOpacity>
        }
        {
          true &&
          <View style={styles.btnList}>
            <TouchableOpacity style={[styles.btnListOne, styles.leftBtn]}>
              <Text style={styles.footerBtnText}>聊生意</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnListOne, styles.rightBtn]}>
              <Text style={styles.footerBtnText}>打电话</Text>
            </TouchableOpacity>
          </View>
        }
      </Container>
    );
  }
}

PurchaseDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(PurchaseDetail);
