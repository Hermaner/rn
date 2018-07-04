import React from 'react';
import { TouchableOpacity, View, BackHandler, ScrollView, RefreshControl, Image } from 'react-native';
import { Container, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { observer } from 'mobx-react/native';
import { TFeedback, Loading, TOpacity, Iconfont, UserSocket } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

@observer
class My extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.getDelete();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderTop() {
    const {
      memberId,
      imgUrl,
      nickName,
      personVerifStatus,
      personVerifs,
      identityName,
      followCounts,
      visitorCounts,
    } = UserSocket.userData;
    const { push } = this.props;
    const { firstList, myFootCounts } = this.state;
    firstList[0].count = followCounts || 0;
    firstList[1].count = myFootCounts || 0;
    firstList[2].count = visitorCounts || 0;
    return (
      <View style={styles.topView}>
        <Image source={require('../../assets/img/topbg.png')} style={styles.headerBackground} />
        <View style={styles.accountMoney}>
          <TFeedback
            content={
              <Icon style={[styles.textBackground, { fontSize: 26, color: '#fff', marginRight: 5 }]} name="text" />}
            onPress={() => { push({ key: UserSocket.userData.memberId ? 'NotificationSystem' : 'User' }); }}
          />
          <TFeedback
            content={
              <View style={styles.rightBtn1}>
                <Icon style={[styles.textBackground, { fontSize: 26, color: '#fff' }]} name="settings" />
              </View>}
            onPress={() => { push({ key: UserSocket.userData.memberId ? 'MySetting' : 'User' }); }}
          />
        </View>
        <View style={styles.firstBox}>
          {
            memberId ?
              <TouchableOpacity onPress={() => { push({ key: 'MemberInfo' }); }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                  <View style={styles.headerImgBox}>
                    <CachedImage
                      style={styles.userImg}
                      source={{ uri: imgUrl }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ backgroundColor: 'transparent', color: '#fff', fontSize: 14 }}>
                        {decodeURI(nickName)}
                      </Text>
                      {
                        personVerifStatus === '1' && personVerifs &&
                        <Text style={{ backgroundColor: 'transparent', color: '#fff', fontSize: 12 }}>
                          ({decodeURI(personVerifs[0].realName)})
                        </Text>
                      }
                    </View>
                    {
                      identityName &&
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.idView}>
                          <Iconfont
                            style={{ fontSize: 14, color: '#fff' }}
                            name="icon-yaoqinghaoyou"
                          />
                          <Text style={[styles.textBackground, styles.textSmall]}>
                            {identityName}
                          </Text>
                        </View>
                      </View>
                    }
                  </View>
                </View>
              </TouchableOpacity>
              :
              <TOpacity
                content={
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                    <View style={styles.headerImgBox}>
                      <CachedImage style={styles.userImg} source={require('../../assets/img/tx1.png')} />
                    </View>
                    <Text style={styles.userText}>立即登录</Text>
                  </View>
                }
                onPress={() => push({ key: 'User' })}
              />
          }
          <View style={styles.firstBottom}>
            {
              firstList.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <View style={styles.topMlist}>
                      <Iconfont
                        style={styles.topMlistIcon}
                        name={item.icon}
                      />
                      <Text style={styles.topMlistText}>{item.title}</Text>
                      <Text style={[styles.topMlistCount]}>{item.count}</Text>
                    </View>}
                  onPress={() => {
                    push({
                      key: UserSocket.userData.memberId ? item.push : 'User', params: { info: UserSocket.userData, name: decodeURI(nickName) } });
                  }}
                />
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  renderSale() {
    const { push } = this.props;
    const { soldInfoList } = this.state;
    const { update, send, refund } = UserSocket.countData;
    soldInfoList[1].count = update ? parseInt(update, 10) : 0;
    soldInfoList[2].count = update ? parseInt(send, 10) : 0;
    soldInfoList[3].count = update ? parseInt(refund, 10) : 0;
    return (
      <View style={styles.saleView}>
        <View style={styles.soldListRow}>
          <View style={[styles.soldListRowOne, styles.saleTitle]}>
            <Iconfont
              style={styles.saleIcon}
              name="icon-daifahuo"
            />
            <Text style={styles.saleText}>卖出的货品</Text>
          </View>
          {
            soldInfoList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.soldListRowOne]}>
                    <View>
                      <Iconfont
                        style={{ fontSize: 28, color: '#333', marginBottom: 4 }}
                        name={item.icon}
                      />
                      {
                        item.count > 0 && global.memberId &&
                        <View style={styles.displayCountBox}>
                          <Text style={{ fontSize: 10, color: '#fff' }}>{item.count}</Text>
                        </View>
                      }
                    </View>
                    <Text style={{ color: '#333', fontSize: 12 }}>{item.title}</Text>
                  </View>}
                onPress={() => { push({ key: UserSocket.userData.memberId ? 'MySoldGoods' : 'User', params: { initialPage: index } }); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderRole() {
    const { roles } = this.state;
    return (
      <View style={styles.rolesView}>
        <View style={styles.rolesViewList}>
          <View style={styles.rolesTitleView}>
            <Iconfont
              style={styles.roleIcon}
              name="icon-maijiaxiu"
            />
            <Text style={styles.roleText}>我的买家</Text>
          </View>
          {
            roles[0].map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.rolesList}>
                    <Image source={item.imgUrl} style={styles.rolesImage} />
                    <Text style={styles.roleText}>{item.title}</Text>
                    {
                      item.cur && global.memberId &&
                      <View style={styles.prompt} />
                    }
                  </View>}
                onPress={() => { this.goPage(item.push); }}
              />
            ))
          }
        </View>
        <View style={styles.rolesViewList}>
          <View style={styles.rolesTitleView}>
            <Iconfont
              style={[styles.roleIcon, { color: '#1295EB' }]}
              name="icon-maijiazhongxin"
            />
            <Text style={styles.roleText}>我的卖家</Text>
          </View>
          {
            roles[1].map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.rolesList}>
                    <Image source={item.imgUrl} style={styles.rolesImage} />
                    <Text style={styles.roleText}>{item.title}</Text>
                  </View>}
                onPress={() => { this.goPage(item.push); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  _renderList() {
    const { list } = this.state;
    return (
      <View style={styles.lister}>
        {
          list.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.list}>
                  <Iconfont
                    style={styles.listIcon}
                    name={item.icn}
                  />
                  <Text style={styles.listText}>{item.title}</Text>
                </View>}
              onPress={() => { this.goListPage(item.push); }}
            />
          ))
        }
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
                      <Iconfont
                        name={item.icon}
                        style={[styles.shareIcon, { color: item.color }]}
                      />
                      <Text style={styles.shareText}>{item.label}</Text>
                    </View>
                  }
                  onPress={() => this.otherShare(index)}
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
    const { refresh } = this.state;
    return (
      <Container>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefresh}
              tintColor="#666"
              title="加载中..."
              titleColor="#333"
              colors={['#666', '#666', '#666']}
              progressBackgroundColor="#ffffff"
            />
          }
          scrollEventThrottle={50}
        >
          {this._renderTop()}
          {this.renderSale()}
          {this.renderRole()}
          {this._renderList()}
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
