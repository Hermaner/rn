import React from 'react';
import { View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { CachedImage } from 'react-native-img-cache';
import { observer } from 'mobx-react/native';
import { TFeedback, Loading, UserSocket, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

@observer
class My extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderTop() {
    return (
      <View style={styles.topView}>
        <View style={styles.topIconView}>
          <TOpacity
            content={
              <Icon name="ios-settings-outline" style={styles.topIcon} />
            }
            onPress={() => this.goPage('MySetting')}
          />
          <TOpacity
            content={
              <Icon name="ios-chatboxes-outline" style={styles.topIcon} />
            }
            onPress={() => this.goPage('MyMessage')}
          />
        </View>
      </View>
    );
  }
  _renderUser() {
    const { defaultImg, balance, couponCount } = this.state;
    const { userData, userData: { memberId } } = UserSocket;
    return (
      <View style={styles.userAllView}>
        <View style={styles.userView}>
          <View style={styles.userTop}>
            <View style={styles.userImgView}>
              <CachedImage
                source={
                  userData.imgUrl ? { uri: userData.imgUrl } : defaultImg}
                style={styles.userImg}
              />
            </View>
            {
              memberId ?
                <TFeedback
                  content={
                    <View style={styles.userNameView}>
                      <Text style={styles.nameText}>{UserSocket.userData.nickName}</Text>
                      <Text style={styles.nameText}>{UserSocket.userData.phone}</Text>
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
                  onPress={() => this.goPage('User')}
                />
            }
            {
              memberId && <Icon name="md-arrow-dropright" style={styles.arr} />
            }
          </View>
          <View style={styles.topPage}>
            <TFeedback
              content={
                <View style={styles.topPageList}>
                  <Text style={styles.topBoldText}>{balance || 0}</Text>
                  <Text style={styles.topText}>账户</Text>
                </View>
              }
              onPress={() => { this.goPage('MyAccount'); }}
            />
            <TFeedback
              content={
                <View style={styles.topPageList}>
                  <Text style={styles.topBoldText}>{couponCount || 0 }</Text>
                  <Text style={styles.topText}>优惠券</Text>
                </View>
              }
              onPress={() => { this.goPage('MyCoupons'); }}
            />
            <TFeedback
              content={
                <View style={styles.topPageList}>
                  <Text style={styles.topBoldText}>0</Text>
                  <Text style={styles.topText}>关注</Text>
                </View>
              }
              onPress={() => { }}
            />
          </View>
        </View>
        <TFeedback
          content={
            <View style={styles.memberView}>
              <Icon name="logo-vimeo" style={styles.glod} />
              <Text style={styles.memberText}>普通会员</Text>
              <Text style={styles.memberRightText}>查看会员特权</Text>
              <Icon name="md-arrow-dropright" style={styles.memberArr} />
            </View>
          }
          onPress={() => { this.goPage('MyCard'); }}
        />
      </View>
    );
  }
  _renderRoleStatus() {
    const { applyData } = this.state;
    return (
      <View>
        {
          applyData.map((item, index) => (
            <TOpacity
              key={index}
              style={{ marginTop: 8 }}
              content={
                <View style={styles.applyView}>
                  <Text style={styles.applyName}>{item.name}</Text>
                  <Text style={styles.applyStatus}>{item.status === 1 ? '待审核' : item.status === 2 ? '审核中' : item.status === 3 ? '审核失败' : item.status === 4 ? '审核通过' : ''}</Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={() => this.goRoleStatus(item)}
            />
          ))
        }
      </View>
    );
  }
  _renderRole1() {
    const { push } = this.props;
    return (
      <View style={styles.roleView}>
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={[styles.roleList, styles.roleBorder]}>
              <Text style={styles.roleText}>服务订单</Text>
              <View style={styles.roleColor}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => { push({ key: 'MgMasterOrders', params: { initialPage: 0 } }); }}
        />
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={styles.roleList}>
              <Text style={styles.roleText}>师傅管理</Text>
              <View style={styles.roleColor2}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'MgMaster' })}
        />
      </View>
    );
  }
  _renderRole2() {
    const { push } = this.props;
    return (
      <View style={styles.roleView}>
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={[styles.roleList, styles.roleBorder]}>
              <Text style={styles.roleText}>服务订单</Text>
              <View style={styles.roleColor2}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: '' })}
        />
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={styles.roleList}>
              <Text style={styles.roleText}>建材管理</Text>
              <View style={styles.roleColor2}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'MgBmMarket' })}
        />
      </View>
    );
  }
  _renderRole3() {
    const { push } = this.props;
    return (
      <View style={styles.roleView}>
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={[styles.roleList, styles.roleBorder]}>
              <Text style={styles.roleText}>服务订单</Text>
              <View style={styles.roleColor2}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: '' })}
        />
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={styles.roleList}>
              <Text style={styles.roleText}>装修管理</Text>
              <View style={styles.roleColor2}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'MgDecorate' })}
        />
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
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => this.goPage('Orders', { initialPage: 5 })}
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
                    <Text style={styles.orderText}>{item.label}</Text>
                  </View>
                }
                onPress={() => this.goPage('Orders', { initialPage: index })}
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
            <TFeedback
              key={index}
              content={
                <View key={index} style={styles.iconsItem}>
                  <View style={[styles.iconsTop, { backgroundColor: item.color }]}>
                    <Icon name="md-alarm" style={styles.iconsIcon} />
                  </View>
                  <Text style={styles.roleText}>{item.label}</Text>
                </View>
              }
              onPress={() => { this.goPage(item.page); }}
            />
          ))
        }
        <TFeedback
          content={
            <View style={styles.iconsItem}>
              <View style={[styles.iconsTop, { backgroundColor: '#f2a050' }]}>
                <Icon name="md-alarm" style={styles.iconsIcon} />
              </View>
              <Text style={styles.roleText}>客服热线</Text>
            </View>
          }
          onPress={() => Communications.phonecall('4009201913', false)}
        />
      </View>
    );
  }
  render() {
    const { userData: { memberId, masterId, bmMarketId, decorationId } } = UserSocket;
    return (
      <Container>
        <Content>
          {this._renderTop()}
          {this._renderUser()}
          {memberId && this._renderRoleStatus()}
          {masterId && this._renderRole1()}
          {bmMarketId && this._renderRole2()}
          {decorationId && this._renderRole3()}
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
