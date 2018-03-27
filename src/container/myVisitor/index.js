import React from 'react';
import { View, Text, ScrollView, RefreshControl, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import Echarts from 'native-echarts';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback, ModalCall, Loading } from '../../components';
import myVisitorBase from './base';
import { deviceW } from '../../utils';
import styles from './styles';

class MyVisitor extends myVisitorBase {
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
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _randerBody() {
    const { option, visitorList, visitorCount } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.visitData}>
          <View style={[styles.flexRow, { borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 10, paddingBottom: 10 }]}>
            <View style={styles.leftBorder}>
              <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>近7天看我店铺的人数</Text>
            </View>
            <Text style={{ flex: 1, textAlign: 'right', fontSize: 16, color: '#17B4EF', fontWeight: 'bold' }}>{visitorCount}</Text>
          </View>
          {
            visitorList &&
            <Echarts option={option} height={250} width={deviceW} />
          }
        </View>
      </View>
    );
  }
  _randerVisitor() {
    return (
      <View>
        <View style={styles.visitorType}>
          <Text style={styles.flexOneleft}>访问时间</Text>
          <Text style={[styles.flexOneCenter, styles.flexTextColor]}>访客姓名</Text>
          <Text style={styles.flexOneRight}>浏览的供应</Text>
        </View>
        {this._randerList()}
      </View>
    );
  }
  _randerList() {
    const { visitorList } = this.state;
    const { push } = this.props;
    return (
      <View>
        {
          visitorList.map((item, index) => (
            <View style={styles.visitorInfo} key={index}>
              <View style={styles.rowBoxList}>
                <View style={styles.rowItem}>
                  <TFeedback
                    content={
                      <View style={styles.rowBox}>
                        <Text style={styles.flexOneleft} numberOfLines={1}>
                          {item.postDate.substring(5, 16)}
                        </Text>
                        {
                          item.member &&
                          <Text style={styles.flexOneCenter} numberOfLines={1}>
                            {item.member.nickName}
                          </Text>
                        }
                        {
                          item.supply &&
                          <Text style={styles.flexOneRight} numberOfLines={1}>
                            {item.supply.brandName}{item.supply.categoryName}
                          </Text>
                        }
                      </View>}
                    onPress={() => { this.clickHidden(index); }}
                  />
                  {
                    item.isClick === 1 &&
                    <View style={styles.isHidden}>
                      <TFeedback
                        content={
                          <View style={styles.userBox}>
                            <View style={styles.leftPart}>
                              <View style={styles.flexRow}>
                                <CachedImage
                                  style={styles.userImg}
                                  source={{ uri: `${item.member.imgUrl}?imageView2/1/w/40` }}
                                />
                                <View>
                                  <View style={styles.flexRow}>
                                    <Text style={styles.userName}>{item.member.nickName}</Text>
                                  </View>
                                  <Text style={styles.time}>
                                    注册时间:
                                    {item.member.postDate.substring(0, 10)} {item.member.identityName}
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.userAdress}>
                                {item.member.provinceName}{item.member.cityName}
                              </Text>
                            </View>
                            <Icon style={styles.rightIcn} name="md-arrow-dropright" />
                          </View>}
                        onPress={() => { push({ key: 'MyInfo', params: { memberId: item.member.memberId } }); }}
                      />
                      <View style={[styles.btnList, styles.btnLeft]}>
                        {/* <TFeedback
                          content={
                            <View style={styles.btn}>
                              <Text style={[styles.btnText, styles.btnLeftText]}>他浏览过什么</Text>
                            </View>}
                          onPress={() => { push({ key: 'VisitDetail', params: { data: item } }); }}
                        /> */}
                        <TFeedback
                          content={
                            <View style={[styles.btn, styles.btnCenter]}>
                              <Text style={styles.btnText}>打电话</Text>
                            </View>}
                          onPress={() => this.ModalCall.show(item.member.phone, item.member.memberId)}
                        />
                        <TFeedback
                          content={
                            <View style={[styles.btn, styles.btnRight]}>
                              <Text style={styles.btnText}>聊生意</Text>
                            </View>}
                          onPress={() => this.chatPeople(item)} // TalkBusiness
                        />
                      </View>
                    </View>
                  }
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { refresh } = this.state;
    return (
      <Container>
        <Header back={pop} title="我的访客" />
        <Content style={{ backgroundColor: '#fff' }}>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={this._onRefreshVisitor}
                tintColor="#ff0000"
                title="加载中..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffffff"
              />
            }
            onScroll={this._onScroll}
            scrollEventThrottle={50}
          >
            {this._randerBody()}
            {this._randerVisitor()}
          </ScrollView>
        </Content>
        <ModalCall ref={(o) => { this.ModalCall = o; }} />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyVisitor.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyVisitor);
