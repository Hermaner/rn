import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Icon, Text, Switch } from 'native-base';
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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.deleteInit();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderTop() {
    const { pop } = this.props;
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
          {/* <TOpacity
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
          /> */}
        </View>
      </View>
    );
  }
  _renderUser() {
    const { defaultImg, info } = this.state;
    return (
      <View style={styles.userAllView}>
        {
          info &&
          <View style={styles.userView}>
            <View style={styles.userTop}>
              <View style={styles.userImgView}>
                <CachedImage
                  source={
                    info.imgUrl ? { uri: `${info.imgUrl}?imageView2/1/w/80` } : defaultImg}
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
                <Text style={styles.topBoldText}>{info.wallet.withdrawals}</Text>
                <Text style={styles.topText}>已提现(元)</Text>
              </View>
              <View style={styles.tiBtn}>
                <View style={styles.tiPage}>
                  <Text style={styles.topBoldText}>{info.wallet.balance}</Text>
                  <Text style={styles.topText}>余额(元)</Text>
                </View>
                <TOpacity
                  style={[styles.txBtn, info.isWithdrawals && styles.txBtnGray]}
                  content={
                    <Text style={styles.txText}>{info.isWithdrawals ? '提现中' : '提现'}</Text>
                  }
                  onPress={() => !info.isWithdrawals && this.goIconPage('MyTixian')}
                />
              </View>
            </View>
          </View>
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
            onPress={() => { this.props.push({ key: 'MgMasterOrders', params: { initialPage: 0 } }); }}
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
  _renderStart() {
    const { isStart } = this.state;
    return (
      <View style={styles.start}>
        <Text style={styles.startText}>上工设置</Text>
        <Switch
          value={isStart}
          onValueChange={val => this.changeStart(val)}
        />
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
          {this._renderStart()}
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
