import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback, Loading, TOpacity } from '../../components';
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
    this.getInit();
  }
  _renderBody() {
    const { push } = this.props;
    const { list, backGround1, userInfo, memberId } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerImgBox}>
          <Image style={styles.headerImg} source={backGround1} />
        </View>
        <View style={{ height: 150, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.accountMoney}>
            <TFeedback
              content={
                <Text style={styles.textBackground}>消息</Text>}
              onPress={() => { push({ key: 'NotificationSystem' }); }}
            />
            <TFeedback
              content={
                <View style={styles.rightBtn}>
                  <Text style={styles.textBackground}>设置</Text>
                </View>}
              onPress={() => { push({ key: 'SystemSet' }); }}
            />
          </View>
          {
            memberId ?
              <TouchableOpacity onPress={() => { push({ key: 'SelfSet' }); }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.userImg} source={{ uri: userInfo.imgUrl }} />
                  <View>
                    <Text style={{ marginBottom: 25, backgroundColor: 'transparent', color: '#fff', fontSize: 16 }}>{userInfo.nickName}</Text>
                    <Text style={[styles.textBackground, styles.textSmall]}>
                      {userInfo.identityName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              :
              <TOpacity
                content={
                  <View style={styles.userView}>
                    <Text style={styles.userText}>立即登录</Text>
                  </View>
                }
                onPress={() => push({ key: 'User' })}
              />
          }
        </View>
        {
          list.map((item, index) => (
            <View style={styles.detailInfo} key={index}>
              <Text style={styles.myIdentity}>{item[0]}</Text>
              {
                item[1].map((item2, index2) => (
                  <TFeedback
                    key={index2}
                    content={
                      <View key={index2}>
                        <View style={styles.infoBox}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={{ marginRight: 20, fontSize: 20, color: item2.icnColor }} name="arrow-back" />
                            <Text style={{ color: '#666', fontSize: 14 }}>{item2.title}</Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={{ color: '#999', fontSize: 14 }}>{item2.label}</Text>
                            <Icon style={{ marginLeft: 10, fontSize: 20, color: '#666' }} name="md-arrow-dropright" />
                          </View>
                        </View>
                      </View>}
                    onPress={() => {
                      push({
                        key: item2.push, params: { info: userInfo, name: userInfo.nickName } });
                    }}
                  />
                ))
              }
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
