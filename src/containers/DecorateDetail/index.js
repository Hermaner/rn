import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, ImageLook, TOpacity, TitleItem, MasterEval } from '../../components';
import base from './base';
import styles from './styles';
import { deviceW } from '../../utils';

class DecorateDetail extends base {
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
                {info.decorationName}
              </Text>
            </View>
            <Icon style={styles.topNameLevel} name="ios-shirt-outline" />
          </View>
          <Text style={styles.topLabelText}>
            案例1999 好评率{info.praiseRate || 100}%
          </Text>
          {
            info.depositAmount ?
              <View style={styles.topBzView}>
                <Icon style={styles.topBzIcon} name="md-ribbon" />
                <View style={styles.topBzBorder}>
                  <Text style={styles.topBzText}>
                    已缴纳保证金{info.depositAmount}元
                  </Text>
                </View>
              </View>
              :
              <View style={styles.topBzView}>
                <Icon style={styles.topNoBzIcon} name="md-ribbon" />
                <View style={styles.topNoBzBorder}>
                  <Text style={styles.topBzText}>
                    未缴纳保障金，请谨慎交易
                  </Text>
                </View>
              </View>
          }
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
          <Text style={styles.tecLabel}>浏览次数：</Text>
          <Text style={styles.tecValue}>{info.browsingVolume || 1}</Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>相关评分：</Text>
          <Text style={styles.tecValue}>设计9.7分服务8.9分施工9.8分</Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>公司地址：</Text>
          <Text style={styles.tecValue}>{info.address}</Text>
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
    const { info, decorationId, credentialss } = this.state;
    return (
      <View style={styles.intrView}>
        {
          info.caseInfo &&
          <View>
            <TitleItem
              text="设计方案"
              rightContent={
                <TOpacity
                  content={
                    <View style={styles.moreView}>
                      <Text style={styles.moreText}>全部</Text>
                      <Text style={styles.moreTextColor}>{info.caseCount || 0}</Text>
                      <Text style={styles.moreText}>个</Text>
                      <Icon name="md-arrow-dropright" style={styles.arr} />
                    </View>
                  }
                  onPress={() => this.props.push({ key: 'DecorateCaseList', params: { decorationId } })}
                />
              }
            />
            <TFeedback
              content={
                <View style={styles.caseView}>
                  <View style={styles.caseList}>
                    <CachedImage source={{ uri: info.caseInfo.imgUrl }} style={styles.caseImg} />
                    <View style={styles.caseGray}>
                      <Text style={styles.caseName}>
                        {info.caseInfo.title}
                      </Text>
                      <Text style={styles.caseLabel}>
                        {info.caseInfo.style}/{info.caseInfo.acreage}/{info.caseInfo.price}
                      </Text>
                    </View>
                  </View>
                </View>
              }
              onPress={() => { this.props.push({ key: 'DecorateCaseDetail', params: { item: info.caseInfo } }); }}
            />
          </View>
        }
        <TitleItem
          text="公司简介"
          rightContent={
            <TOpacity
              content={
                <View style={styles.moreView}>
                  <Text style={styles.moreText}>查看更多</Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={() => this.props.push({ key: 'DecorateIntrDetail', params: { introInfo: info.introInfo } })}
            />
          }
        />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
            {info.introInfo ? info.introInfo.introContent : ''}
          </Text>
        </View>
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
            <ImageLook
              width={(deviceW / 3) - 13}
              images={info.credentialss.map(item => item.imgUrl)}
            />
          </View>
        }
        <TitleItem text="平台保障" />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
          1、免费申请上门量房服务</Text><Text style={styles.intrText}>
          2、三家优选公司上门量房</Text><Text style={styles.intrText}>
          3、出设计方案及报价</Text><Text style={styles.intrText}>
          4、客户选择合作公司，签署施工合同及三方协议</Text><Text style={styles.intrText}>
          5、提供资金托管服务</Text><Text style={styles.intrText}>
          6、装修公司提供全程的施工服务（开工—竣工）</Text><Text style={styles.intrText}>
          7、提供全程监理服务</Text><Text style={styles.intrText}>
          8、项目完成后提供上门验收服务</Text><Text style={styles.intrText}>
          9、项目竣工后，20%的装修款在平台上托管30天
          </Text>
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
