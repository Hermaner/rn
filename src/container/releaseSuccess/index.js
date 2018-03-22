import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute, resetHome } from '../../actions';
import { TFeedback, TOpacity } from '../../components';
import Base from './base';
import styles from './styles';

class PurchaseDetail extends Base {
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
    return (
      <View style={styles.pagebody}>
        <View>
          <View style={[styles.flexRow, styles.flexOne]}>
            <Text style={styles.successText}>发布成功</Text>
          </View>
          <Icon style={styles.successIcn} name="checkmark-circle" />
          <Text style={{ fontSize: 16, color: '#fff', textAlign: 'center' }}>已将您的货品信息展示给买家！</Text>
          <Text style={{ fontSize: 13, color: '#fff', textAlign: 'center', marginTop: 6 }}>实时更新货品价格，获得更多曝光机会</Text>
        </View>
      </View>
    );
  }
  _renderGoRelease() {
    const { push } = this.props;
    return (
      <View style={styles.goRelease}>
        <View style={[styles.flexRow, styles.flexOne, styles.flexJu]}>
          <Text style={{ color: '#333', fontSize: 14, textAlign: 'center' }}>您还未进行实名认证，当前还能发布</Text>
          <Text style={{ color: '#333', fontSize: 14, textAlign: 'center' }}>0</Text>
          <Text style={{ color: '#333', fontSize: 14, textAlign: 'center' }}>条</Text>
        </View>
        <View style={styles.flexRowBox}>
          <TFeedback
            content={
              <View style={styles.goBtnBox}>
                <Text style={styles.goBtnText}>去认证</Text>
              </View>}
            onPress={() => { push({ key: 'IndividualAuthentication' }); }}
          />
        </View>
      </View>
    );
  }
  _renderList() {
    const { push } = this.props;
    const { items } = this.state;
    return (
      <View style={styles.buyGoodsItems}>
        <Text style={styles.titleText}>相关采购推荐</Text>
        {
          items.map((item, index) => (
            <View style={styles.buyGoodsItem} key={index}>
              <Text style={styles.buyGoodsName}>{item.categoryName}</Text>
              <View style={styles.flexRow}>
                <Text style={styles.buyGoodsVariety}>品种: {item.brandName}</Text>
                <Text style={styles.flexRight}>{item.demand}{item.unit}</Text>
              </View>
              <Text style={styles.buyGoodsPlace}>
                所在地: {item.receiveProvinceName}{item.receiveCityName}
              </Text>
              <View style={[styles.flexRow, styles.margin]}>
                <View style={{ flex: 1 }}>
                  {/* <View style={styles.flexRow}>
                    <Text style={styles.label}>{item.member.identityName}</Text>
                    <View style={{ flex: 1 }} />
                  </View> */}
                  <View style={styles.flexRow}>
                    <Text style={styles.promptText}>距截止</Text>
                    <Text style={styles.promptDay}>{item.keepEnd}</Text>
                    <Text style={styles.promptText}>天</Text>
                  </View>
                </View>
                <TOpacity
                  style={styles.goBuyBtnBox}
                  content={
                    <View>
                      <Text style={styles.goBuyBtn}>去报价</Text>
                    </View>
                  }
                  onPress={() => { push({ key: 'PurchaseDetail', params: { item: items[index], purchaseId: items[index].purchaseId } }); }}
                />
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { push, reset } = this.props;
    const { isVerifField } = this.state;
    return (
      <Container>
        <Content>
          {this._renderBody()}
          {!isVerifField && this._renderGoRelease()}
          {this._renderList()}
        </Content>
        <View style={styles.btnList}>
          <TOpacity
            style={styles.leftBtn}
            content={
              <View>
                <Icon style={[styles.homeIcn, styles.textCenter]} name="home" />
                <Text style={[styles.leftBtnText, styles.textCenter]}>返回首页</Text>
              </View>
            }
            onPress={reset}
          />
          <TOpacity
            style={styles.centerBtn}
            content={
              <View>
                <Text style={[styles.centerBtnText, styles.textCenter]}>我的供应</Text>
              </View>
            }
            onPress={() => push({ key: 'MySupply' })}
          />
          <TOpacity
            style={styles.rightBtn}
            content={
              <View>
                <Text style={[styles.rightBtnText, styles.textCenter]}>再发一条</Text>
              </View>
            }
            onPress={() => push({ key: 'MainSearch', params: { type: '3' } })}
          />
        </View>
      </Container>
    );
  }
}

PurchaseDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
  reset: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute, reset: resetHome })(PurchaseDetail);
