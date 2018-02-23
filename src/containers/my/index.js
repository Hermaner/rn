import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, TOpacity, Iconfont } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

class My extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    // this.initData();
  }
  _renderTop() {
    return (
      <View style={styles.topView}>
        <View style={styles.topIconView}>
          <Icon name="md-alarm" style={styles.topIcon} />
          <Icon name="md-alarm" style={styles.topIcon} />
        </View>
      </View>
    );
  }
  _renderUser() {
    const { defaultImg } = this.state;
    return (
      <View style={styles.userAllView}>
        <View style={styles.userView}>
          <View style={styles.userTop}>
            <View style={styles.userImgView}>
              <CachedImage source={defaultImg} style={styles.userImg} />
            </View>
            {
              global.memberId ?
                <TFeedback
                  content={
                    <View style={styles.userNameView}>
                      <Text style={styles.nameText}>翰承</Text>
                      <Text style={styles.nameText}>15666666666</Text>
                    </View>
                  }
                  onPress={() => { this.goPage('MemberInfo'); }}
                />
                :
                <TFeedback
                  content={
                    <View style={styles.userNameView}>
                      <Text style={styles.nameText}>请先登录</Text>
                    </View>
                  }
                  onPress={() => { this.goPage('User'); }}
                />
            }
            <Icon name="md-arrow-dropright" style={styles.rightArr} />
          </View>
          <View style={styles.topPage}>
            <View style={styles.topPageList}>
              <Text style={styles.topBoldText}>0</Text>
              <Text style={styles.topText}>账户</Text>
            </View>
            <View style={styles.topPageList}>
              <Text style={styles.topBoldText}>1</Text>
              <Text style={styles.topText}>优惠券</Text>
            </View>
            <View style={styles.topPageList}>
              <Text style={styles.topBoldText}>0</Text>
              <Text style={styles.topText}>收藏</Text>
            </View>
          </View>
        </View>
        <View style={styles.memberView}>
          <Text style={styles.memberText}>普通会员</Text>
          <Text style={styles.memberRightText}>查看会员特权</Text>
          <Icon name="md-arrow-dropright" style={styles.memberArr} />
        </View>
      </View>
    );
  }
  _renderRole1() {
    return (
      <View style={styles.roleView}>
        <View style={[styles.roleList, styles.roleBorder]}>
          <Text style={styles.roleText}>服务订单</Text>
          <View style={styles.roleColor}>
            <Icon name="md-alarm" style={styles.topRoleIcon} />
          </View>
        </View>
        <View style={styles.roleList}>
          <Text style={styles.roleText}>师傅管理</Text>
          <View style={styles.roleColor2}>
            <Icon name="md-alarm" style={styles.topRoleIcon} />
          </View>
        </View>
      </View>
    );
  }
  _renderRole2() {
    return (
      <View style={styles.roleView}>
        <View style={[styles.roleList, styles.roleBorder]}>
          <Text style={styles.roleText}>服务订单</Text>
          <View style={styles.roleColor}>
            <Icon name="md-alarm" style={styles.topRoleIcon} />
          </View>
        </View>
        <View style={styles.roleList}>
          <Text style={styles.roleText}>建材管理</Text>
          <View style={styles.roleColor2}>
            <Icon name="md-alarm" style={styles.topRoleIcon} />
          </View>
        </View>
      </View>
    );
  }
  _renderRole3() {
    return (
      <View style={styles.roleView}>
        <View style={[styles.roleList, styles.roleBorder]}>
          <Text style={styles.roleText}>服务订单</Text>
          <View style={styles.roleColor}>
            <Icon name="md-alarm" style={styles.topRoleIcon} />
          </View>
        </View>
        <View style={styles.roleList}>
          <Text style={styles.roleText}>装修管理</Text>
          <View style={styles.roleColor2}>
            <Icon name="md-alarm" style={styles.topRoleIcon} />
          </View>
        </View>
      </View>
    );
  }
  _renderOrder() {
    const { orderItems } = this.state;
    return (
      <View style={styles.order}>
        <View style={styles.orderTop}>
          <Text style={styles.orderTitle}>我的订单</Text>
          <TFeedback
            content={
              <View style={styles.orderTopRight}>
                <Text style={styles.orderTopText}>全部订单</Text>
                <Icon name="md-alarm" style={styles.rightArr} />
              </View>
            }
            onPress={() => { this.goPage('Orders'); }}
          />
        </View>
        <View style={styles.orderPage}>
          {
            orderItems.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.orderItem}>
                    <View style={styles.orderItemTop}>
                      <Icon name={item.icon} style={styles.orderItemIcon} />
                      {
                        item.count > 0 &&
                        <View style={styles.orderItemBadge}>
                          <Text style={styles.orderItemNum}>{item.count}</Text>
                        </View>
                      }
                    </View>
                    <Text style={styles.roleText}>{item.label}</Text>
                  </View>
                }
                onPress={() => { this.goPage('Orders'); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  _renderIcons() {
    const { icons } = this.state;
    return (
      <View style={styles.iconsPage}>
        {
          icons.map((item, index) => (
            <View key={index} style={styles.iconsItem}>
              <View style={[styles.iconsTop, { backgroundColor: item.color }]}>
                <Icon name="md-alarm" style={styles.iconsIcon} />
              </View>
              <Text style={styles.roleText}>{item.label}</Text>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <Container>
        <Content>
          {this._renderTop()}
          {this._renderUser()}
          {global.masterId && this._renderRole1()}
          {global.bmMarketId && this._renderRole2()}
          {global.decorationId && this._renderRole3()}
          {this._renderOrder()}
          {this._renderIcons()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

My.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(My);
