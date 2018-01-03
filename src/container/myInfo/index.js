import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import myInfoBase from './base';
import styles from './styles';

class MyInfo extends myInfoBase {
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
    const { items, items2 } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.topPart}>
          <Image style={styles.userImg} source={require('../app/resource/imgs/2.png')} />
          <View style={{ flex: 1, marginTop: 5 }}>
            <Text style={styles.name}>姓名</Text>
            <Text style={styles.status}>合作社</Text>
          </View>
          <Image style={styles.QRCode} source={require('../app/resource/imgs/avatar.jpg')} />
        </View>
        <TouchableOpacity style={styles.isAccreditation} onPress={() => this.rzDetail()}>
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
          <Icon style={styles.RightPart} name="arrow-back" />
        </TouchableOpacity>
        <View style={styles.myBusiness}>
          {
            items.map((item, index) => (
              <View style={styles.flexBox} key={index}>
                <Text style={styles.flexOneTextLeft}>{item.title}</Text>
                <Text style={styles.flexOneTextRight}>{item.label}</Text>
                {
                  item.isIcn &&
                  <Icon style={styles.flexOneTextRight} name="arrow-back" />
                }
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  _renderType() {
    const Tab1 = () => this._rendContent1();
    const Tab2 = () => this._rendContent2();
    return (
      <View style={styles.type}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="供应" />
          <Tab2 tabLabel="采购" />
        </ScrollableTabView>
      </View>
    );
  }
  _rendContent1() {
    const { push } = this.props;
    return (
      <View style={styles.goodsItems}>
        <TouchableOpacity style={styles.goodsItem} onPress={() => { push({ key: 'GoodDetail' }); }}>
          <Image
            style={styles.goodsImg}
            source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.goodsName}>哈哈 野生90-100</Text>
            <Text style={styles.goodsPlace}>河北石家庄嘎子村</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.chooseBtn}>基地直供</Text>
              <View />
            </View>
            <View style={styles.goodsPriceInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.price}>12.00</Text>
                <Text style={styles.yuan}>元/斤</Text>
              </View>
              <View style={styles.howLongBox}>
                <Text style={styles.howLong}>2天前</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  _rendContent2() {
    const { push } = this.props;
    return (
      <View style={styles.buyGoodsItems}>
        <View style={styles.buyGoodsItem}>
          <Text style={styles.buyGoodsName}>八月瓜</Text>
          <View style={styles.flexRow}>
            <Text style={styles.buyGoodsVariety}>品种: 八月瓜</Text>
            <Text style={styles.flexRight}>100斤</Text>
          </View>
          <Text style={styles.buyGoodsPlace}>
            所在地: 河北省邢台市
          </Text>
          <View style={styles.flexRow}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.goBuyBtnBox} onPress={() => { push({ key: 'PurchaseDetail' }); }}>
              <Text style={styles.goBuyBtn}>去报价</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  _renderHidden() {
    return (
      <View style={styles.hiddenBox}>
        <View style={styles.ycBox} />
        <View style={styles.hiddenHeader}>
          <Text style={{ flex: 1, textAlign: 'center' }}>认证详情</Text>
          <Icon name="arrow-back" />
        </View>
        <View style={styles.detailItems}>
          <View style={styles.DetailItem}>
            <View>
              <Text>ww</Text>
              <Text>买家保障</Text>
            </View>
            <View>
              <Text>您尚未缴纳诚信保证金并承诺提供买家保障服务</Text>
              <Text>了解详情</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { isHidden } = this.state;
    return (
      <Container>
        <Header back={pop} title="名字" />
        <Content>
          {
            isHidden &&
            this._renderHidden()
          }
          {this._renderBody()}
          {this._renderType()}
        </Content>
      </Container>
    );
  }
}

MyInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyInfo);
