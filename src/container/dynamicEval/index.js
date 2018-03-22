import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import { TOpacity, Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

@observer
class DynamicEval extends Base {
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
    const { push } = this.props;
    const { userInfo, memberId } = this.state;
    return (
      <View>
        <View style={styles.topBox}>
          <CachedImage source={{ uri: `${userInfo.imgUrl}?imageView2/1/w/80` }} style={styles.storeImg} />
          <Text style={styles.name}>
            {userInfo.personVerifStatus === '1' ? userInfo.personVerifs[0].realName : userInfo.nickName}
          </Text>
          <Text style={styles.label}>值得信赖的生意伙伴</Text>
          <TOpacity
            style={{ marginTop: 10 }}
            content={
              <View style={styles.goShopBox}>
                <Text style={styles.goShopText}>进入店铺</Text>
              </View>
            }
            onPress={() => { push({ key: 'StoreDetail', params: { memberId } }); }}
          />
        </View>
      </View>
    );
  }
  _renderGoods() {
    const { commentInfo } = this.state;
    return (
      <View style={styles.bigBox}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>货品靠谱</Text>
          <View style={styles.scoreBox}>
            {
              commentInfo.goods &&
              commentInfo.goods !== '' && commentInfo.goods !== null &&
              <Text style={styles.scoreTopText}>{commentInfo.goods.score || '--'}</Text>
            }
            <Text style={styles.scoreBottomText}>分</Text>
          </View>
          <View style={styles.commentBox}>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>好评</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.goods.goodsPraise || '--'}</Text>
              }
            </View>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>中评</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.goods.goodsOrdinary || '--'}</Text>
              }
            </View>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>差评</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.goods.goodsBad || '--'}</Text>
              }
            </View>
          </View>
          <View style={styles.typeBox}>
            <View style={{ flex: 1 }}>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.typeScore}>{commentInfo.goods.oneGoodsScore || '--'}</Text>
              }
              <Text style={styles.typeName}>货品质量</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.goods.oneGoodsName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.typeScore}>{commentInfo.goods.twoGoodsScore || '--'}</Text>
              }
              <Text style={styles.typeName}>货源量</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.goods.twoGoodsName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.typeScore}>{commentInfo.goods.threeGoodsScore}</Text>
              }
              <Text style={styles.typeName}>重量/数量</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.goods.threeGoodsName}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text style={styles.typeScore}>{commentInfo.goods.fourGoodsScore}</Text>
              }
              <Text style={styles.typeName}>货品价格</Text>
              {
                commentInfo.goods &&
                commentInfo.goods !== '' && commentInfo.goods !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.goods.fourGoodsName}</Text>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderSell() {
    const { commentInfo } = this.state;
    return (
      <View style={styles.bigBox}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>卖家服务</Text>
          <View style={styles.scoreBox}>
            {
              commentInfo.sell &&
              commentInfo.sell !== '' && commentInfo.sell !== null &&
              <Text style={styles.scoreTopText}>{commentInfo.sell.score || '--'}</Text>
            }
            <Text style={styles.scoreBottomText}>分</Text>
          </View>
          <View style={styles.commentBox}>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>好评</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.sell.sellPraise || '--'}</Text>
              }
            </View>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>中评</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.sell.sellOrdinary || '--'}</Text>
              }
            </View>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>差评</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.sell.sellBad || '--'}</Text>
              }
            </View>
          </View>
          <View style={styles.typeBox}>
            <View style={{ flex: 1 }}>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.typeScore}>{commentInfo.sell.oneSellScore || '--'}</Text>
              }
              <Text style={styles.typeName}>沟通态度</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.sell.oneSellName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.typeScore}>{commentInfo.sell.twoSellScore || '--'}</Text>
              }
              <Text style={styles.typeName}>行业知识</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.sell.twoSellName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.typeScore}>{commentInfo.sell.threeSellScore || '--'}</Text>
              }
              <Text style={styles.typeName}>聊天回复</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.sell.threeSellName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text style={styles.typeScore}>{commentInfo.sell.fourSellScore || '--'}</Text>
              }
              <Text style={styles.typeName}>电话接通</Text>
              {
                commentInfo.sell &&
                commentInfo.sell !== '' && commentInfo.sell !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.sell.fourSellName || '--'}</Text>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderLogistics() {
    const { commentInfo } = this.state;
    return (
      <View style={styles.bigBox}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>物流服务到位</Text>
          <View style={styles.scoreBox}>
            {
              commentInfo.logistics &&
              commentInfo.logistics !== '' && commentInfo.logistics !== null &&
              <Text style={styles.scoreTopText}>{commentInfo.logistics.score || '--'}</Text>
            }
            <Text style={styles.scoreBottomText}>分</Text>
          </View>
          <View style={styles.commentBox}>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>好评</Text>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.logistics.logisticsPraise || '--'}</Text>
              }
            </View>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>中评</Text>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.logistics.logisticsOrdinary || '--'}</Text>
              }
            </View>
            <View style={styles.commentRow}>
              <Text style={styles.commentTopText}>差评</Text>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text style={styles.commentBottomText}>{commentInfo.logistics.logisticsBad || '--'}</Text>
              }
            </View>
          </View>
          <View style={styles.typeBox}>
            <View style={{ flex: 1 }}>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text style={styles.typeScore}>{commentInfo.logistics.oneLogisticsScore || '--'}</Text>
              }
              <Text style={styles.typeName}>包装</Text>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.logistics.oneLogisticsName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text style={styles.typeScore}>{commentInfo.logistics.twoLogisticsScore || '--'}</Text>
              }
              <Text style={styles.typeName}>发货速度</Text>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.logistics.twoLogisticsName || '--'}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text style={styles.typeScore}>{commentInfo.logistics.threeLogisticsScore || '--'}</Text>
              }
              <Text style={styles.typeName}>物流速度</Text>
              {
                commentInfo.logistics &&
                commentInfo.logistics !== '' && commentInfo.logistics !== null &&
                <Text numberOfLines={1} style={styles.typeComment}>{commentInfo.logistics.twoLogisticsName || '--'}</Text>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="动态评价详情" />
        <Content>
          {this._renderBody()}
          {this._renderGoods()}
          {this._renderSell()}
          {this._renderLogistics()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DynamicEval.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DynamicEval);
