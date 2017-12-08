
import React from 'react';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  BackHandler,
  DeviceEventEmitter,
} from 'react-native';
import Svg, {
    LinearGradient,
    Rect,
    Defs,
    Stop,
    G,
    Use,
} from 'react-native-svg';
import { connect } from 'react-redux';
import { Mred, px2dp } from '../util';
import { popRoute, pushRoute } from '../actions';

const topV = px2dp(150);
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;
const rectW = 240;
const rectH = 240;
const leftV = (deviceW - rectW) / 2;
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },

  rectangleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectH,
    width: rectW,
    position: 'absolute',
    top: topV,
    left: leftV,
    backgroundColor: 'transparent',
  },
  leftTopLine: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: Mred,
    left: 0,
    top: 0,
  },
  topLeftLine: {
    position: 'absolute',
    width: 12,
    height: 3,
    backgroundColor: Mred,
    left: 0,
    top: 0,
  },
  topRightLine: {
    position: 'absolute',
    width: 12,
    height: 3,
    backgroundColor: Mred,
    right: 0,
    top: 0,
  },
  rightTopLine: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: Mred,
    right: 0,
    top: 0,
  },
  bottomLeftLine: {
    position: 'absolute',
    width: 12,
    height: 3,
    backgroundColor: Mred,
    left: 0,
    bottom: 0,
  },
  leftBottomLine: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: Mred,
    left: 0,
    bottom: 0,
  },
  rightBottomLine: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: Mred,
    right: 0,
    bottom: 0,
  },
  bottomRightLine: {
    position: 'absolute',
    width: 12,
    height: 3,
    backgroundColor: Mred,
    right: 0,
    bottom: 0,
  },
  backIcon: {
    position: 'absolute',
    width: px2dp(40),
    height: px2dp(40),
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: px2dp(20),
    left: 20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Page extends React.Component {
  static propTypes = {
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.object,
  };
  constructor(props) {
    super(props);
    const { type } = this.props.navigation.state.params;
    this.state = {
      type,
      hasScan: false,
      trY: new Animated.Value(0),
    };
    this._onPressCancel = this._onPressCancel.bind(this);
    this._onBarCodeRead = this._onBarCodeRead.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
  }
  componentDidMount() {
    this.startAnimation();
    let count = 2;
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (count === 1) {
        return false;
      }
      count = 1;
      this.props.popRoute();
      return true;
    });
  }
  startAnimation() {
    this.state.trY.setValue(0);
    Animated.timing(this.state.trY, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.startAnimation());
  }
  _onPressCancel() {
    this.props.popRoute();
  }
  _onBarCodeRead(data) {
    const { type, hasScan } = this.state;
    if (hasScan) {
      return;
    }
    this.setState({
      hasScan: true,
    }, () => {
      let backType = '';
      switch (type) {
        case 'goods':
          backType = 'goods';
          break;
        case 'orderSearch':
          backType = 'orderSearch';
          break;
        case 'cartIndex':
          backType = 'cartIndex';
          break;
        case 'checkProductGoods':
          backType = 'checkProductGoods';
          break;
        case 'mixpay':
          backType = 'mixpay';
          break;
        case 'getCouponCode':
          backType = 'getCouponCode';
          break;
        case 'refundOrder':
          backType = 'refundOrder';
          break;
        case 'orderDetail':
          this.props.pushRoute({ key: 'OrderDetail', params: { title: '订单详情', orderNumber: data } });
          break;
        default:
      }
      if (type !== 'orderDetail') {
        DeviceEventEmitter.emit(backType, data.data);
        this.props.popRoute();
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          onBarCodeRead={this._onBarCodeRead}
          style={styles.camera}
          barcodeScannerEnabled
          defaultTouchToFocus
          mirrorImage={false}
        >
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}>
              <Animated.View
                style={{
                  transform: [{
                    translateY: this.state.trY.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, rectH - 10],
                    }),
                  }],
                }}
              >
                <Svg style={{ width: rectW - 10, height: 4, borderRadius: 20, overflow: 'hidden', left: 5 }}>
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2={rectW - 10} y2="0">
                      <Stop offset="0" stopColor={Mred} stopOpacity="0" />
                      <Stop offset="0.5" stopColor={Mred} stopOpacity="1" />
                      <Stop offset="1" stopColor={Mred} stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    x="0"
                    y="0"
                    width={rectW - 10}
                    height="2"
                    fill="url(#grad)"
                  />
                </Svg>
              </Animated.View>
              <View style={styles.leftTopLine} />
              <View style={styles.topLeftLine} />
              <View style={styles.rightTopLine} />
              <View style={styles.topRightLine} />
              <View style={styles.leftBottomLine} />
              <View style={styles.bottomLeftLine} />
              <View style={styles.rightBottomLine} />
              <View style={styles.bottomRightLine} />
            </View>
          </View>
        </Camera>
        <Svg style={{ width: deviceW, height: deviceH, position: 'absolute', left: 0, top: 0 }}>
          <Defs>
            <G id="shapeuse">
              <G>
                <Rect x="0" y="0" width={deviceW} height={topV} fill="rgba(0, 0, 0, .8)" />
                <Rect x="0" y={topV} width={leftV} height={rectH} fill="rgba(0, 0, 0, .8)" />
                <Rect x={leftV + rectW} y={topV} width={leftV} height={rectH} fill="rgba(0, 0, 0, .8)" />
                <Rect x="0" y={topV + rectH} width={deviceW} height={deviceH - rectH - topV} fill="rgba(0, 0, 0, .8)" />
              </G>
            </G>
          </Defs>
          <Use href="#shapeuse" x="0" y="0" />
        </Svg>
        <TouchableOpacity style={styles.backIcon} onPress={this.props.popRoute}>
          <Icon name="arrow-left" size={px2dp(30)} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}
Page.navigationOptions = {
  header: null,
};
export default connect(state => ({
  ...state.proReducers, ...state.commonReducer, ...state.OrderDetailReducers,
}), { popRoute, pushRoute })(Page);
