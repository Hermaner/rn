import React from 'react';
import { View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

class MgMaster extends Base {
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
    this.deleteInit();
  }
  _renderTop() {
    const { push, pop } = this.props;
    return (
      <View style={styles.topView}>
        <View style={styles.topIconView}>
          <View style={styles.topIconLeft}>
            <TOpacity
              content={
                <Icon name="arrow-back" style={styles.topIcon} />
              }
              onPress={pop}
            />
          </View>
          <TOpacity
            content={
              <Icon name="ios-settings-outline" style={styles.topIcon} />
            }
            onPress={() => push({ key: 'MySetting' })}
          />
          <TOpacity
            content={
              <Icon name="ios-chatboxes-outline" style={styles.topIcon} />
            }
            onPress={() => push({ key: 'MyMessage' })}
          />
        </View>
      </View>
    );
  }
  _renderUser() {
    const { defaultImg, info, totalMoney, outMoney, inMoney } = this.state;
    console.log(info);
    return (
      <View style={styles.userAllView}>
        <View style={styles.userView}>
          <View style={styles.userTop}>
            <View style={styles.userImgView}>
              <CachedImage
                source={
                  info.imgUrl ? { uri: info.imgUrl } : defaultImg}
                style={styles.userImg}
              />
            </View>
            <TFeedback
              content={
                <View style={styles.userNameView}>
                  <Text style={styles.nameText}>{info.realName}</Text>
                  <Text style={styles.nameText}>{info.masterNumber}</Text>
                </View>
              }
              onPress={() => this.props.push({ key: 'MasterDetail', params: { masterId: global.masterId } })}
            />
            <Icon name="md-arrow-dropright" style={styles.rightArr} />
          </View>
          <View style={styles.topPage}>
            <View style={styles.topPageList}>
              <Text style={styles.topBoldText}>{totalMoney}</Text>
              <Text style={styles.topText}>总金额(元)</Text>
            </View>
            <View style={styles.topPageList}>
              <Text style={styles.topBoldText}>{outMoney}</Text>
              <Text style={styles.topText}>已提现(元)</Text>
            </View>
            <TFeedback
              content={
                <View style={styles.topPageList}>
                  <Text style={styles.topBoldText}>{inMoney}</Text>
                  <Text style={styles.topText}>余额(元)</Text>
                </View>
              }
              onPress={() => { this.goPage('MyColl'); }}
            />
          </View>
        </View>
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
              <Text style={styles.roleText}>我的项目</Text>
              <View style={styles.roleColor}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'MgMasterItems' })}
        />
        <TOpacity
          style={styles.roleTOp}
          content={
            <View style={styles.roleList}>
              <Text style={styles.roleText}>发布项目</Text>
              <View style={styles.roleColor2}>
                <Icon name="md-alarm" style={styles.topRoleIcon} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'MgMasterPublish' })}
        />
      </View>
    );
  }
  _renderOrder() {
    const { orderItems } = this.state;
    return (
      <View style={styles.order}>
        <View style={styles.orderTop}>
          <Text style={styles.orderTitle}>服务订单</Text>
          <TFeedback
            content={
              <View style={styles.orderTopRight}>
                <Text style={styles.orderTopText}>全部订单</Text>
                <Icon name="md-alarm" style={styles.rightArr} />
              </View>
            }
            onPress={() => { this.props.push({ key: 'MgMasterOrders', params: { initialPage: '0' } }); }}
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
                onPress={() => { this.props.push({ key: 'MgMasterOrders', params: { initialPage: index } }); }}
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
              onPress={() => { this.goIconPage(item.page); }}
            />
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
          {this._renderRole1()}
          {this._renderOrder()}
          {this._renderIcons()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMaster.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMaster);
