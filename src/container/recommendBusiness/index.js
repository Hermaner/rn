import React from 'react';
import { View, NativeAppEventEmitter, ScrollView, RefreshControl } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AMapLocation from 'react-native-smart-amap-location';
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance';
import { pushRoute, popRoute } from '../../actions';
import { LoadMore, LoadNoMore, Header } from '../../components';
import base from './base';
import styles from './styles';

import Child2 from './child2';

class RecommendBusiness extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
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
  renderForYou() {
    const { business } = this.state;
    return (
      <View style={styles.forYou}>
        <View>
          <Child2 type="1" data={business} />
        </View>
      </View>
    );
  }
  render() {
    const {
      refresh,
      loading,
      nomore,
    } = this.state;
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="推荐商家" />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefreshBusines}
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
          {this.renderForYou()}
          {loading && <LoadMore />}
          {nomore && <LoadNoMore />}
        </ScrollView>
      </Container>
    );
  }
}

RecommendBusiness.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute, pop: popRoute })(AppEventListenerEnhance(RecommendBusiness));
