import React from 'react';
import { View, NativeAppEventEmitter, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AMapLocation from 'react-native-smart-amap-location';
import { CachedImage } from 'react-native-img-cache';
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance';
import { pushRoute } from '../../actions';
import { Iconfont, TOpacity, IconItem, CaseItem } from '../../components';
import base from './base';
import styles from './styles';

class Home extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.addAppEventListener(
        NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult),
    );
    AMapLocation.init(null);
    AMapLocation.setOptions({
      pausesLocationUpdatesAutomatically: false,
      allowsBackgroundLocationUpdates: true,
    });
    // AMapLocation.startUpdatingLocation();
    AMapLocation.getReGeocode();
    this.getInit();
  }
  _onLocationResult = (result) => {
    if (result.coordinate) {
      global.longitude = result.coordinate.longitude;
      global.latitude = result.coordinate.latitude;
    }
  }
  renderNav() {
    const { push } = this.props;
    const { bigTypes, types } = this.state;
    return (
      <View style={styles.navIconView}>
        <View style={styles.bigIconView}>
          {
            bigTypes.map((item, index) => (
              <TOpacity
                style={{ flex: 1 }}
                key={index}
                content={
                  <IconItem item={item} big />
                }
                onPress={() => { push({ key: 'ChatIndex' }); }}
              />
            ))
          }
        </View>
        <View style={styles.dv}>
          <View style={styles.dl} />
        </View>
        <View style={styles.normalIconView}>
          {
            types.map((item, index) => (
              <TOpacity
                style={{ flex: 1 }}
                key={index}
                content={
                  <IconItem item={item} />
                }
                onPress={() => push(item.page)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderSwiper() {
    const { banners } = this.state;
    return (
      <View>
        <Swiper
          height={200}
          paginationStyle={{ justifyContent: 'center', bottom: 10 }}
        >
          {
            banners.map((item, i) => (
              <View key={i}>
                <CachedImage source={item.img} style={styles.swiperImage} />
              </View>
            ))
          }
        </Swiper>
      </View>
    );
  }
  renderCases() {
    const { cases } = this.state;
    console.log(cases)
    return (
      <View style={styles.caseView}>
        <View style={styles.caseTitleView}>
          <Text style={styles.caseTitleText}>
            师傅案例
          </Text>
          <View style={styles.caseMore}>
            <Text style={styles.caseMoreText}>
              师傅案例
            </Text>
          </View>
        </View>
        {
          cases.map((item, index) => (
            <CaseItem key={index} item={item} />
          ))
        }
      </View>
    );
  }
  render() {
    const {
      refresh,
    } = this.state;
    return (
      <Container>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="加载中..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {this.renderSwiper()}
          {this.renderNav()}
          {this.renderCases()}
        </ScrollView>
      </Container>
    );
  }
}

Home.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(AppEventListenerEnhance(Home));
