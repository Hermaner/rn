import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, ImageLook, TOpacity, TitleItem, MasterEval } from '../../components';
import base from './base';
import styles from './styles';

class DecorateDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderTop() {
    const { info } = this.state;
    return (
      <View style={styles.topView}>
        <View style={styles.topImgView}>
          <CachedImage source={info.imgUrl ? { uri: info.imgUrl } : require('../../assets/img/aver.png')} style={styles.topImg} />
        </View>
        <View style={styles.topRight}>
          <View style={styles.topName}>
            <View style={styles.topNameView}>
              <Text style={styles.topNameText}>
                {info.bmMarketName}
              </Text>
            </View>
            <Icon style={styles.topNameLevel} name="ios-shirt-outline" />
          </View>
          <Text style={styles.topLabelText}>
            销量1999 好评率{info.praiseRate || 100}%
          </Text>
          <View style={styles.topBzView}>
            <Icon style={styles.topBzIcon} name="md-ribbon" />
            <View style={styles.topBzBorder}>
              <Text style={styles.topBzText}>
                已缴纳保证金3000元
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderTec() {
    const { info, bz } = this.state;
    return (
      <View style={styles.tec}>
        <View style={styles.star}>
          <StarRating
            disabled
            starSize={24}
            emptyStarColor="#EE4000"
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starColor="#EE4000"
            maxStars={5}
            rating={info.starLevel || 5}
          />
          <Text style={styles.starText}>{info.starLevel || 5}分</Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>营业时间：</Text>
          <Text style={styles.tecValue}>{info.businessHours}</Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>相关评分：</Text>
          <Text style={styles.tecValue}>环境9.7分服务8.9分质量9.8分</Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>所在地址：</Text>
          <Text style={styles.tecValue}>
            {info.provinceName}{info.cityName}{info.districtName}{info.address}
          </Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>服务保障：</Text>
          <View style={styles.bzView}>
            {
              bz.map((item, index) => (
                <View key={index} style={styles.bzList}>
                  <Icon ref={(component) => { this._stepDownText = component; }} name="ios-checkmark-circle" style={styles.bzIcon} />
                  <Text style={styles.bzText}>
                    {item.label}
                  </Text>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  _renderIntr() {
    const { info, credentialss } = this.state;
    return (
      <View style={styles.intrView}>
        <TitleItem
          text="公司简介"
        />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
            {info.detail ? info.detail : ''}
          </Text>
        </View>
        <TitleItem
          text="公司图片"
        />
        {
          info.bmMarketImages.length > 0 &&
          <Swiper
            height={200}
            paginationStyle={{ justifyContent: 'center', bottom: 10 }}
          >
            {
              info.bmMarketImages.map((item, i) => (
                <View key={i}>
                  <CachedImage source={{ uri: item.imgUrl }} style={styles.swiperImage} />
                </View>
              ))
            }
          </Swiper>
        }
        {
          info.credentialss.length > 0 &&
          <View>
            <TitleItem
              text="企业证书"
              rightContent={
                <TOpacity
                  content={
                    <View style={styles.moreView}>
                      <Text style={styles.moreText}>查看更多</Text>
                      <Icon name="md-arrow-dropright" style={styles.arr} />
                    </View>
                  }
                  onPress={() => this.props.push({ key: 'DecorateImageDetail', params: { items: credentialss } })}
                />
              }
            />
            <ImageLook images={info.credentialss} />
          </View>
        }
        <TitleItem text="平台保障" />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
          正品保障</Text><Text style={styles.intrText}>
          通过平台成交15天内，平台承诺为消费者提供交易保障服务</Text><Text style={styles.intrText}>
          先行赔付</Text><Text style={styles.intrText}>
          产品质量问题，平台先行为客户赔付</Text><Text style={styles.intrText}>
          价格最优</Text><Text style={styles.intrText}>
          平台价格保障，用户举报有奖</Text><Text style={styles.intrText}>
          安心购买</Text><Text style={styles.intrText}>
          精准送装</Text>
        </View>
      </View>
    );
  }
  _renderEval() {
    const { masterId, info: { orderEvaluate } } = this.state;
    return (
      <View>
        <TitleItem
          text="评价"
          rightContent={
            <TOpacity
              content={
                <View style={styles.moreView}>
                  <Text style={styles.moreText}>更多评价</Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={() => this.props.push({ key: 'EvalList', params: { masterId } })}
            />
          }
        />
        <MasterEval item={orderEvaluate} />
      </View>
    );
  }
  _renderFooter() {
    const { footIcons, isColl } = this.state;
    return (
      <Footer style={styles.footer}>
        <View style={styles.footIcons}>
          {
            footIcons.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.footIconView}>
                    <Icon
                      name={item.icon}
                      style={[styles.footIcon, index === 2 && isColl && styles.footIconCur]}
                    />
                    <Text
                      style={[styles.footIconText, index === 2 && isColl && styles.footIconTextCur]}
                    >
                      {index === 2 && isColl ? '已收藏' : item.label}
                    </Text>
                  </View>
                }
                onPress={() => { this.footAction(index); }}
              />
            ))
          }
        </View>
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>预约服务</Text>
            </View>
          }
          onPress={this.createService}
        />
      </Footer>
    );
  }
  render() {
    const { info } = this.state;
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="装修公司详情" />
        {
          info &&
          <Content>
            {this._renderTop()}
            {this._renderTec()}
            {this._renderIntr()}
            {info.orderEvaluate && this._renderEval()}
          </Content>
        }
        {info && this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DecorateDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DecorateDetail);
