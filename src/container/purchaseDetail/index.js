import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, TOpacity, Loading } from '../../components';
import purchaseDetailBase from './base';
import styles from './styles';

class PurchaseDetail extends purchaseDetailBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
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
    const { item, tipShow, hasBjShow } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          tipShow &&
          <View style={styles.endTime}>
            <Text style={{ color: '#333', fontSize: 14 }}>报价结束时间：</Text>
            <Text style={{ color: '#FC801B', fontSize: 18 }}>{item.purchaseTime}天</Text>
            <TFeedback
              content={
                <Icon style={styles.closeIcon} name="ios-close-outline" />}
              onPress={() => this.setState({ tipShow: false })}
            />
          </View>
        }
        {
          hasBjShow &&
          <View style={styles.endTime}>
            <Text style={{ color: '#333', fontSize: 14 }}>您已报价</Text>
            <TFeedback
              content={
                <Icon style={styles.closeIcon} name="ios-close-outline" />}
              onPress={() => this.setState({ hasBjShow: false })}
            />
          </View>
        }
        <View style={styles.userImg}>
          <Image style={styles.img} source={item.member.imgUrl ? { uri: item.member.imgUrl } : require('../app/resource/imgs/avatar.jpg')} />
          <View style={styles.userInfo}>
            <Text style={styles.purchaseCount1}>
              {decodeURI(item.nickName)}
            </Text>
            <Text style={styles.purchaseCount}>
              {item.receiveProvinceName}{item.receiveCityName}
            </Text>
          </View>
        </View>
        <View style={styles.needGoodsDetail}>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>采购货品</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>
                {item.categoryName}{item.brandName}
              </Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>货品规格</Text>
            </View>
            <View style={styles.boderTwo}>
              {
                item.purchaseItems.length > 0 ?
                  item.purchaseItems.map((list, index) => (
                    <Text key={index} style={[styles.flexTwo, styles.text6]}>
                      {list.specTypeName}{list.specName}
                    </Text>
                  ))
                :
                  <Text style={[styles.flexTwo, styles.text6]}>
                    暂无规格
                  </Text>
              }
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>期望价格</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text7]}>{!item.wantEndPrice ? '面议' : `${item.wantStarPrice}-${item.wantEndPrice}元`}</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>需求量</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text7]}>{item.demand}{item.unit}</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>期望货源地</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>{item.wantCityName ? `${item.wantProvinceName}${item.wantCityName}` : '全国'}</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>所在地</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>
                {item.receiveProvinceName}{item.receiveCityName}
              </Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>补充说明</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>
                {item.memo || '暂无信息'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { item } = this.state;
    return (
      <Container>
        <Header back={pop} title="采购详情" />
        <Content>
          {item && this._renderBody()}
        </Content>
        <View style={styles.btnList}>
          <TOpacity
            style={[styles.btnListOne, styles.leftBtn]}
            content={
              <View>
                <Text style={styles.footerBtnText}>立即报价</Text>
              </View>
            }
            onPress={this.goCbjPage}
          />
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

PurchaseDetail.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(PurchaseDetail);
