import React from 'react';
import { MapView, Location } from 'react-native-baidumap-sdk';
import { View, Image, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import { Container, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MapViewPage extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  async componentDidMount() {
    this.getInit();
    await Location.stop();
    await Location.init();
    Location.setOptions({ gps: true });
    this.listener = Location.addLocationListener((location) => {
      this.mapView.setStatus({ center: location }, 1000);
      this.setState({
        latitude: location.latitude,
        longitude: location.longitude,
        centerLat: location.latitude,
        centerLng: location.longitude,
      });
    },
    );
    Location.start();
  }

  componentWillUnmount() {
    Location.stop();
    this.listener.remove();
  }
  renderCenter = () => (
    <Animatable.View
      iterationCount="infinite"
      style={styles.centerView}
      animation={{
        0: { scale: 1 }, 0.5: { scale: 0.7 }, 1: { scale: 1 },
      }}
    />
  )
  renderMarker = () => (
    <Image style={styles.logo} source={{ uri: 'https://avatars0.githubusercontent.com/u/1709072?s=100&v=4' }} />
  )
  _renderBack() {
    const { pop } = this.props;
    return (
      <TOpacity
        style={styles.back}
        content={
          <Icon name="arrow-back" style={styles.backIcon} />
        }
        onPress={pop}
      />
    );
  }
  _renderToCenter() {
    return (
      <TOpacity
        style={styles.toCenter}
        content={
          <Icon name="ios-locate-outline" style={styles.toCenterIcon} />
        }
        onPress={this.toCenter}
      />
    );
  }
  renderCluster = (item) => {
    const { extra } = item;
    if (!extra) {
      return null;
    }
    const { key, imgUrl, realName, detail, firstImage, masterId } = extra;
    return (
      <MapView.Marker
        ref={ref => (this.marker = ref)}
        key={key}
        title={key}
        coordinate={item.coordinate}
        view={() => (<Image style={styles.logo} source={{ uri: imgUrl || firstImage }} />)}
      >
        <MapView.Callout onPress={this.onPress}>
          <TOpacity
            content={
              <View style={styles.callout}>
                <View style={styles.imageView}>
                  <Image source={{ uri: imgUrl || firstImage }} style={styles.image} />
                </View>
                <View style={styles.calloutRight}>
                  <Text style={styles.name}>{realName}</Text>
                  <Text numberOfLines={2} style={styles.detail}>{detail}</Text>
                </View>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => { this.props.push({ key: 'MasterDetail', params: { masterId } }); }}
          />
        </MapView.Callout>
      </MapView.Marker>
    );
  }
  render() {
    const { items, centerLat, latitude, longitude, centerLng } = this.state;
    const markers = items.map((item, i) => ({
      coordinate: {
        latitude: item.latitude,
        longitude: item.longitude,
      },
      extra: {
        key: `Marker${i}`,
        masterId: item.masterId,
        imgUrl: item.imgUrl,
        realName: item.realName,
        detail: item.detail,
        firstImage: item.firstImage,
      },
    }));
    return (
      <Container>
        <MapView
          ref={ref => (this.mapView = ref)}
          style={StyleSheet.absoluteFill}
          zoomLevel={16}
          onStatusChange={this.onStatusChange}
        >
          <MapView.Marker
            ref={ref => (this.mymarker = ref)}
            title="我的位置"
            view={this.renderCenter}
            coordinate={{ latitude, longitude }}
          />
          <MapView.Cluster
            onPress={this.onClusterPress}
            ref={(ref) => { this.cluster = ref; }}
            markers={markers}
            renderMarker={this.renderCluster}
          />
          {/* <MapView.Marker
            ref={ref => (this.marker = ref)}
            title="This is a custom view"
            view={this.renderMarker}
            coordinate={{ latitude: 39.914884, longitude: 116.403883 }}
          >
            <MapView.Callout onPress={this.onPress}>
              <View style={styles.callout}>
                <Image source={image} style={styles.image} />
                <Text style={styles.text}>{'Hello\nReact Native'}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker> */}
        </MapView>
        {this._renderBack()}
        {this._renderToCenter()}
      </Container>
    );
  }
}
MapViewPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MapViewPage);
