import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Container, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import Communications from 'react-native-communications';
import { CachedImage } from 'react-native-img-cache';
import { observer } from 'mobx-react/native';
import { TFeedback, Loading, UserSocket, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

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
    const { defaultImg } = this.state;
    const {
      userData: { memberId, nickName, phone, imgUrl },
      applyInfo: { balance, couponCount },
    } = UserSocket;
    return (
      <View style={styles.userAllView}>
        <View style={styles.userView}>
          <View style={styles.userTop}>
            <View style={styles.userImgView}>
              <CachedImage
                source={
                  imgUrl ? { uri: imgUrl } : defaultImg}
                style={styles.userImg}
              />
            </View>
            {
              memberId ?
                <TFeedback
                  content={
                    <View style={styles.userNameView}>
                      <Text style={styles.nameText}>{nickName}</Text>
                      <Text style={styles.nameText}>{phone}</Text>
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
    const {
      applyInfo: { applyData },
    } = UserSocket;
    return (
      <View>
        {
          applyData && applyData.length > 0 &&
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
    const {
      applyInfo: { demandCount, waitePayCount, waiteServiceCount, waiteEvaluateCount },
    } = UserSocket;
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
                        index === 0 && demandCount > 0 &&
                        <View style={styles.orderItemBadge}>
                          <Text style={styles.orderItemNum}>{demandCount}</Text>
                        </View>
                      }
                      {
                        index === 1 && waitePayCount > 0 &&
                        <View style={styles.orderItemBadge}>
                          <Text style={styles.orderItemNum}>{waitePayCount}</Text>
                        </View>
                      }
                      {
                        index === 2 && waiteServiceCount > 0 &&
                        <View style={styles.orderItemBadge}>
                          <Text style={styles.orderItemNum}>{waiteServiceCount}</Text>
                        </View>
                      }
                      {
                        index === 3 && waiteEvaluateCount > 0 &&
                        <View style={styles.orderItemBadge}>
                          <Text style={styles.orderItemNum}>{waiteEvaluateCount}</Text>
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
  _renderModal() {
    const { isModalShow, shares } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="bottom"
        entry="bottom"
        animationDuration={250}
        onClosed={this.closeModal}
        isOpen={isModalShow}
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={styles.shareLists}>
            {
              shares.map((item, index) => (
                <TOpacity
                  key={index}
                  style={styles.shareList}
                  content={
                    <View key={index} style={styles.shareList}>
                      <View style={[styles.shareTop, { backgroundColor: item.color }]}>
                        <Icon name={item.icon} style={styles.shareIcon} />
                      </View>
                      <Text style={styles.shareText}>{item.label}</Text>
                    </View>
                  }
                  onPress={this.closeModal}
                />
              ))
            }
          </View>
          <TOpacity
            style={styles.shareBtn}
            content={
              <Text style={styles.shareBtnText}>取消</Text>
            }
            onPress={this.closeModal}
          />
        </View>
      </Modal>
    );
  }
  render() {
    const { userData: { memberId, masterId, bmMarketId, decorationId } } = UserSocket;
    const { refresh } = this.state;
    return (
      <Container>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefresh}
              tintColor={'#444'}
              title="加载中..."
              titleColor="#666"
              colors={[Mcolor, Mcolor, Mcolor]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {this._renderTop()}
          {this._renderUser()}
          {memberId && this._renderRoleStatus()}
          {masterId && this._renderRole1()}
          {bmMarketId && this._renderRole2()}
          {decorationId && this._renderRole3()}
          {this._renderOrder()}
          {this._renderIcons()}
        </ScrollView>
        {this._renderModal()}
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
