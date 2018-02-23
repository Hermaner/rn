import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, ImageLook, TOpacity, TitleItem, MasterEval } from '../../components';
import base from './base';
import styles from './styles';

class MasterDetail extends base {
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
                {info.realName}
              </Text>
              <Text style={styles.topLabelText}>
                编号:{info.masterNumber}
              </Text>
            </View>
            <Icon style={styles.topNameLevel} name="ios-shirt-outline" />
          </View>
          <Text style={styles.topLabelText}>
            已接{info.itemLogCount || 0}单 好评率{info.praiseRate || 100}% 投诉{info.complains.length}次
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
          <Text style={styles.tecLabel}>浏览次数：</Text>
          <Text style={styles.tecValue}>{info.browsingVolume || 1}</Text>
        </View>
        <View style={styles.tecView}>
          <Text style={styles.tecLabel}>擅长行业：</Text>
          <Text style={styles.tecValue}>{info.masterTypes.join(',')}</Text>
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
    const { info } = this.state;
    return (
      <View style={styles.intrView}>
        {
          info.masterAuths && info.masterAuths.length > 0 &&
          <View>
            <TitleItem text="认证图片" />
            <ImageLook images={info.masterAuths} />
          </View>
        }
        <TitleItem text="师傅介绍" />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
            {info.detail}
          </Text>
        </View>
        <TitleItem text="平台保障" />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
            1、全国覆盖</Text><Text style={styles.intrText}>
            十万专业师傅，遍布全国</Text><Text style={styles.intrText}>
            2、技能专业</Text><Text style={styles.intrText}>
            实名认证，专业技能培训考核后，持证上岗</Text><Text style={styles.intrText}>
            3、价格透明</Text><Text style={styles.intrText}>
            去除中间商环节，信息透明用户自主选择</Text><Text style={styles.intrText}>
            4、平台质保</Text><Text style={styles.intrText}>
            严格把控服务质量，客户验收好评后订单方可完成
          </Text>
        </View>
      </View>
    );
  }
  _renderRecord() {
    const { info: { masterOrderItemLogs } } = this.state;
    return (
      <View>
        <TitleItem text="近期服务记录" />
        <View style={styles.recordList}>
          <Text style={styles.f1}>服务地址</Text>
          <Text style={styles.f70}>服务类型</Text>
          <Text style={styles.f1}>服务时间</Text>
        </View>
        {
          masterOrderItemLogs.map((item, index) => (
            <View key={index} style={styles.recordList}>
              <Text style={styles.f1}>{item.address}</Text>
              <Text style={styles.f70}>{item.servicesTypeName}</Text>
              <Text style={styles.f1}>{item.postDate}</Text>
            </View>
          ))
        }
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
        <Header back={pop} title="师傅详情" />
        {
          info &&
          <Content>
            {this._renderTop()}
            {this._renderTec()}
            {this._renderIntr()}
            {info.orderEvaluate && this._renderEval()}
            {this._renderRecord()}
          </Content>
        }
        {info && this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MasterDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MasterDetail);
