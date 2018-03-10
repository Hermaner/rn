import React from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text, Icon } from 'native-base';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from 'react-native-baidumap-sdk';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { Iconfont, TOpacity, IconItem, CaseItem, HomeSearch } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class Home extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  async componentDidMount() {
    this.getInit();
    await Location.init();
    await Location.setOptions({ gps: true });
    this.listener = Location.addLocationListener(location => this.GetLocation(location));
    Location.start();
  }

  async componentWillUnmount() {
    this.deleteInit();
    Location.stop();
    this.listener.remove();
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
            <CaseItem
              key={index}
              item={item}
              onPress={() => this.props.push({ key: 'MasterDetail', params: { masterId: item.masterId } })}
            />
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
              tintColor={'#444'}
              title="加载中..."
              titleColor="#666"
              colors={[Mcolor, Mcolor, Mcolor]}
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
export default connect(null, { push: pushRoute })(Home);
