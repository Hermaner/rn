import React from 'react';
import { TouchableOpacity, View, BackHandler, ScrollView, RefreshControl } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
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
  _renderBody() {
    const { push } = this.props;
    const { list, firstList, soldInfoList, myFootCounts } = this.state;
    firstList[0].count = UserSocket.userData.followCounts || 0;
    firstList[1].count = myFootCounts || 0;
    firstList[2].count = UserSocket.userData.visitorCounts || 0;
    soldInfoList[1].count = UserSocket.countData.update;
    soldInfoList[2].count = UserSocket.countData.send;
    soldInfoList[3].count = UserSocket.countData.refund;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerBackground} />
        <View style={styles.accountMoney}>
          <TFeedback
            content={
              <Icon style={[styles.textBackground, { fontSize: 26, color: '#fff', marginRight: 15 }]} name="text" />}
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
            UserSocket.userData.memberId ?
              <TouchableOpacity onPress={() => { push({ key: 'MemberInfo' }); }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                  <View style={styles.headerImgBox}>
                    <CachedImage
                      style={styles.userImg}
                      source={{ uri: UserSocket.userData.imgUrl }}
                    />
                  </View>
                  <View style={{ marginLeft: 10, paddingTop: 10 }}>
                    <View>
                      <Text style={{ backgroundColor: 'transparent', color: '#333', fontSize: 16, textAlign: 'left' }}>
                        {decodeURI(UserSocket.userData.nickName)}
                      </Text>
                      {
                        UserSocket.userData.personVerifStatus === '1' &&
                        <Text style={{ backgroundColor: 'transparent', color: '#999', fontSize: 14, marginTop: 4 }}>
                          (真实姓名：{decodeURI(UserSocket.userData.personVerifs[0].realName)})
                        </Text>
                      }
                    </View>
                    <Text style={[styles.textBackground, styles.textSmall]}>
                      {UserSocket.userData.identityName}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Icon style={{ fontSize: 20, color: '#666' }} name="md-arrow-dropright" />
                  </View>
                </View>
              </TouchableOpacity>
              :
              <TOpacity
                style={{ flex: 1 }}
                content={
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                    <View style={styles.headerImgBox}>
                      <View style={styles.imgBox}>
                        <CachedImage style={styles.userImg} source={require('../../assets/img/tx1.png')} />
                      </View>
                    </View>
                    <View style={{ marginLeft: 10, paddingTop: 10 }}>
                      <Text style={styles.userText}>立即登录</Text>
                    </View>
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
                    <View style={{ flex: 1 }}>
                      {
                        index === 1 ?
                          <Text style={[styles.firstBottomCount]}>{UserSocket.userData.memberId ? item.count : '0'}</Text>
                        :
                          <Text style={[styles.firstBottomCount]}>{item.count}</Text>
                      }
                      <Text style={styles.firstBottomLabel}>{item.title}</Text>
                    </View>}
                  onPress={() => {
                    push({
                      key: UserSocket.userData.memberId ? item.push : 'User', params: { info: UserSocket.userData, name: decodeURI(UserSocket.userData.nickName) } });
                  }}
                />
              ))
            }
          </View>
        </View>
        <View>
          <View style={styles.soldList}>
            <Text style={{ fontSize: 16, color: '#666' }}>卖出的货品</Text>
            <TFeedback
              content={
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 12, color: '#666', marginRight: 10 }}>全部信息</Text>
                  <Icon style={{ fontSize: 20, color: '#666' }} name="md-arrow-dropright" />
                </View>}
              onPress={() => { push({ key: UserSocket.userData.memberId ? 'MySoldGoods' : 'User', params: { initialPage: 0 } }); }}
            />
          </View>
          <View style={styles.soldListRow}>
            {
              soldInfoList.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <View style={[styles.soldListRowOne]}>
                      <View>
                        <Iconfont
                          style={{ fontSize: 28, color: '#666', textAlign: 'center', marginBottom: 4 }}
                          name="icon-waimai"
                        />
                        {
                          item.count &&
                          item.count !== '' && item.count !== '0' && UserSocket.userData.memberId &&
                          <View style={styles.displayCountBox}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>{item.count}</Text>
                          </View>
                        }
                      </View>
                      <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>{item.title}</Text>
                    </View>}
                  onPress={() => { push({ key: UserSocket.userData.memberId ? 'MySoldGoods' : 'User', params: { initialPage: index } }); }}
                />
              ))
            }
          </View>
        </View>
        {
          list.map((item, index) => (
            <View style={styles.detailInfo} key={index}>
              {
                index === 0 &&
                <View style={styles.mmDot}>
                  <Text style={styles.mmDotText}>买</Text>
                  <Text style={styles.mmDotText}>家</Text>
                </View>
              }
              {
                index === 1 &&
                <View style={styles.mmDot}>
                  <Text style={styles.mmDotText}>卖</Text>
                  <Text style={styles.mmDotText}>家</Text>
                </View>
              }
              <View style={styles.myBox}>
                {
                  item[1].map((item2, index2) => (
                    <TFeedback
                      key={index2}
                      content={
                        <View
                          style={[item2.isLast ? styles.myWidth : styles.flexOne]}
                        >
                          {
                            !item2.isLast ?
                              <View style={styles.infoBox}>
                                <View style={styles.aa}>
                                  <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>{item2.title}</Text>
                                  <View
                                    style={[styles.icnBox, { backgroundColor: item2.icnColor }]}
                                  >
                                    <Iconfont
                                      style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}
                                      name={item2.icn}
                                    />
                                  </View>
                                  {
                                    item2.isHaveBuy && UserSocket.userData.memberId &&
                                    <View style={styles.prompt} />
                                  }
                                </View>
                              </View>
                            :
                              <View style={styles.infoBox2}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                  <View />
                                  <View
                                    style={[styles.icnBoxl, { backgroundColor: item2.icnColor }]}
                                  >
                                    <Iconfont
                                      style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}
                                      name={item2.icn}
                                    />
                                  </View>
                                </View>
                                <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>{item2.title}</Text>
                              </View>
                          }
                        </View>}
                      onPress={() => { this.choseOne(index, index2); }}
                    />
                  ))
                }
              </View>
            </View>
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
                      <View style={[styles.shareTop, { backgroundColor: item.color }]}>
                        <Icon name={item.icon} style={styles.shareIcon} />
                      </View>
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
        {/* <Content>
          {this._renderBody()}
        </Content>
        {this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} /> */}
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
          {this._renderBody()}
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
