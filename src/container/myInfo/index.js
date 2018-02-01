import React from 'react';
import { View, Image, Animated, ScrollView, RefreshControl } from 'react-native';
import { Container, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, MyModalView, TFeedback, Loading, LoadMore, LoadNoMore } from '../../components';
import base from './base';
import styles from './styles';
import Child1 from './child1';
import Child2 from './child2';

class MyInfo extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
      modalVisible: false,
      CHeight: new Animated.Value(300),
      loadingSleek: false,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { items } = this.state;
    const { info } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <View style={styles.topPart}>
          <Image style={styles.userImg} source={require('../app/resource/imgs/2.png')} />
          <View style={{ flex: 1, marginTop: 5 }}>
            <Text style={styles.name}>{info.nickName}</Text>
            <Text style={styles.status}>{info.identityName}</Text>
          </View>
          <Image style={styles.userImg} source={{ uri: info.imgUrl }} />
        </View>
        <TFeedback
          content={
            <View style={styles.isAccreditation}>
              <View style={styles.leftPart}>
                {
                  info.memberVerifs &&
                  info.memberVerifs.map((item, index) => (
                    <View style={styles.accreditationBox} key={index}>
                      <Icon style={{ fontSize: 24, color: '#8ECD24' }} name="checkmark" />
                      <Text style={styles.accreditationText}>{item.verifFieldName}</Text>
                    </View>
                  ))
                }
              </View>
              <Icon style={[styles.RightPart, { fontSize: 20, color: '#666' }]} name="play" />
            </View>}
          onPress={() => this.rzDetail()}
        />
        <View style={styles.myBusiness}>
          {
            items.map((item, index) => (
              <View style={styles.flexBox} key={index}>
                <Text style={styles.flexOneTextLeft}>{item.title}</Text>
                <Text style={styles.flexOneTextRight}>{item.label}</Text>
                {
                  item.isIcn &&
                  <Icon style={styles.flexOneTextRight} name="play" />
                }
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  _renderType() {
    const { memberId } = this.props.navigation.state.params;
    const { isTabOne, supplys, purchase } = this.state;
    return (
      <View style={styles.type}>
        <View style={[styles.flexRow, styles.flexOne, { borderBottomWidth: 1, borderBottomColor: '#eee' }]}>
          <TFeedback
            content={
              <View style={[styles.flexOne, isTabOne === 1 ? styles.textBorder : '', { paddingBottom: 10 }]}>
                <Text style={[styles.tabText, isTabOne === 1 ? styles.tabTextChoose : '']}>供应</Text>
              </View>}
            onPress={() => this.tabChangeOne()}
          />
          <TFeedback
            content={
              <View style={[styles.flexOne, isTabOne !== 1 ? styles.textBorder : '', { paddingBottom: 10 }]}>
                <Text style={[styles.tabText, isTabOne !== 1 ? styles.tabTextChoose : '']}>采购</Text>
              </View>}
            onPress={() => this.tabChangeTwo()}
          />
        </View>
        <View>
          {
            isTabOne === 1 ?
              <Child1 tabLabel="供应" keyIndex="1" memberId={memberId} data={supplys} />
            :
              <Child2 tabLabel="采购" keyIndex="2" memberId={memberId} data={purchase} />
          }
        </View>
      </View>
    );
  }
  _renderModalView() {
    const { info } = this.props.navigation.state.params;
    const { list } = this.state;
    list[1].isHave = info.entVerifStatus !== '1';
    list[2].isHave = info.personVerifStatus !== '1';
    const content = (
      <View style={styles.maskerContent}>
        {
          list.map((item, index) => (
            item.isHave &&
            <View style={styles.row} key={index}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.circle} />
                <View>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <View style={styles.flexRow}>
                    <Text style={styles.listLabel}>{item.label}</Text>
                    <TFeedback
                      content={
                        <Text style={styles.listLabelRight}>{item.labelTitle}</Text>}
                      onPress={() => this.listPush(index)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
    return (
      <MyModalView
        ref={(o) => { this.ModalView = o; }}
        title={'认证详情'}
        content={content}
        onConfirm={() => console.log(111)}
      />
    );
  }
  render() {
    const { pop } = this.props;
    const { loading, refresh, isTabOne, nomore } = this.state;
    const { name } = this.props.navigation.state.params;
    return (
      <Container>
        <Header back={pop} title={name} />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={isTabOne === 1 ? this._onRefreshSupply : this._onRefreshPurchase}
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
          {this._renderBody()}
          {this._renderType()}
          {this._renderModalView()}
          {loading && <LoadMore />}
          {nomore && <LoadNoMore />}
        </ScrollView>
      </Container>
    );
  }
}

MyInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyInfo);
