import React from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'react-native-amap3d'
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { Iconfont, TOpacity, IconItem, CaseItem, HomeSearch } from '../../components';
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
    this.getInit();
  }
  componentWillUnmount() {
    this.deleteInit();
  }
  _onLocationResult = (result) => {
    if (result.coordinate) {
      console.log(result)
      const { longitude, latitude } = result.coordinate;
      this.AmapGeocode(`${longitude},${latitude}`);
      global.longitude = longitude;
      global.latitude = latitude;
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
                onPress={() => { push({ key: item.page }); }}
              />
            ))
          }
        </View>
        <View style={styles.dv}>
          <Image source={require('../../assets/img/dashed.png')} style={styles.dvImg} />
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
                onPress={() => { push({ key: item.page, params: {} }); }}
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
          height={100}
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
    return (
      <View style={styles.caseView}>
        <View style={styles.caseTitleView}>
          <Text style={styles.caseTitleText}>
            师傅案例
          </Text>
          <TOpacity
            style={styles.caseMore}
            content={
              <Text style={styles.caseMoreText}>
                更多案例
              </Text>
            }
            onPress={() => { this.props.push({ key: 'MasterCaseList' }); }}
          />
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
      districtName,
    } = this.state;
    return (
      <Container>
        <HomeSearch label={districtName || '定位中'} />
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
          {/* <MapView
            locationEnabled
            onLocation={this.GetLocation}
          /> */}
        </ScrollView>
      </Container>
    );
  }
}

Home.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Home);
