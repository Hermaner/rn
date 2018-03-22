import React from 'react';
import { View, BackHandler, Animated } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header, MyModalView, TFeedback, Loading } from '../../components';
import base from './base';
import styles from './styles';
import Child1 from './child1';
import Child2 from './child2';

class OtherInfo extends base {
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
  _renderBody() {
    const { items } = this.state;
    const { info } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <View style={styles.topPart}>
          <CachedImage style={styles.userImg} source={{ uri: `${info.logo}?imageView2/1/w/60` }} />
          <View style={{ flex: 1, marginTop: 5 }}>
            <Text style={styles.name}>{info.contact}</Text>
            <Text style={styles.status}>{info.identityName}</Text>
          </View>
          <CachedImage style={styles.userImg} source={{ uri: `${info.imgUrl}?imageView2/1/w/60` }} />
        </View>
        <TFeedback
          content={
            <View style={styles.isAccreditation}>
              <View style={styles.leftPart}>
                {
                  info.authenticate &&
                  info.authenticate.split(',').map((item, index) => (
                    <View style={styles.accreditationBox} key={index}>
                      <Icon style={{ fontSize: 24, color: '#8ECD24' }} name="checkmark" />
                      <Text style={styles.accreditationText}>{item}</Text>
                    </View>
                  ))
                }
              </View>
              <Icon style={[styles.RightPart, { fontSize: 20, color: '#666' }]} name="md-arrow-dropright" />
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
                  <Icon style={styles.flexOneTextRight} name="md-arrow-dropright" />
                }
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  _renderType() {
    return (
      <View style={styles.type}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Child1 tabLabel="供应" keyIndex="1" />
          <Child2 tabLabel="采购" keyIndex="2" />
        </ScrollableTabView>
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
    const { name } = this.props.navigation.state.params;
    return (
      <Container>
        <Header back={pop} title={name} />
        <Content>
          {this._renderBody()}
          {this._renderType()}
          {this._renderModalView()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OtherInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OtherInfo);
