import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback, Loading, TOpacity, Iconfont } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

class My extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.initData();
  }
  _renderBody() {
    const { push } = this.props;
    const { list, userInfo, memberId, firstList } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerBackground} />
        <View style={styles.accountMoney}>
          <TFeedback
            content={
              <Icon style={[styles.textBackground, { fontSize: 26, color: '#fff', marginRight: 15 }]} name="text" />}
            onPress={() => { push({ key: 'NotificationSystem' }); }}
          />
          <TFeedback
            content={
              <View style={styles.rightBtn1}>
                <Icon style={[styles.textBackground, { fontSize: 26, color: '#fff' }]} name="settings" />
              </View>}
            onPress={() => { push({ key: 'SystemSet' }); }}
          />
        </View>
        <View style={styles.firstBox}>
          {
            memberId ?
              <TouchableOpacity onPress={() => { push({ key: 'SelfSet' }); }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.headerImgBox}>
                    <Image style={styles.userImg} source={{ uri: userInfo.imgUrl }} />
                  </View>
                  <View style={{ marginLeft: 10, paddingTop: 10 }}>
                    <Text style={{ backgroundColor: 'transparent', color: '#333', fontSize: 14 }}>{userInfo.nickName}</Text>
                    <Text style={[styles.textBackground, styles.textSmall]}>
                      {userInfo.identityName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              :
              <TOpacity
                style={{ flex: 1 }}
                content={
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.headerImgBox}>
                      <View style={styles.imgBox}>
                        <Image style={styles.userImg} source={require('../../assets/img/tx1.png')} />
                      </View>
                    </View>
                    <View style={{ marginLeft: 90, paddingTop: 10 }}>
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
                      <Text style={styles.firstBottomCount}>{item.count}</Text>
                      <Text style={styles.firstBottomLabel}>{item.title}</Text>
                    </View>}
                  onPress={() => {
                    push({
                      key: item.push, params: { info: userInfo, name: userInfo.nickName } });
                  }}
                />
              ))
            }
          </View>
        </View>
        {
          list.map((item, index) => (
            <View style={styles.detailInfo} key={index}>
              <Text style={styles.myIdentity}>{item[0]}</Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                  item[1].map((item2, index2) => (
                    <TFeedback
                      key={index2}
                      content={
                        <View
                          style={[item2.isLast ? styles.myWidth : styles.flexOne, styles.infoBox]}
                        >
                          <Iconfont
                            style={{ fontSize: 32, color: item2.icnColor, textAlign: 'center', marginBottom: 4 }}
                            name={item2.icn}
                          />
                          <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>{item2.title}</Text>
                        </View>}
                      onPress={() => {
                        push({
                          key: memberId ? item2.push : 'User', params: { info: userInfo, name: userInfo.nickName, memberId } });
                      }}
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
  render() {
    return (
      <Container>
        <Content>
          {this._renderBody()}
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
