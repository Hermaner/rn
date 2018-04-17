import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Footer } from 'native-base';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { TFeedback, Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import { deviceW } from '../../utils';
import styles from './styles';

@observer
class StrengthBusiness extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { headImgUrl, bodyImgUrls, footImgUrl } = this.state;
    return (
      <View>
        {
          headImgUrl !== '' && headImgUrl !== null &&
          <AutoHeightImage
            width={deviceW}
            imageURL={headImgUrl}
          />
        }
        <View style={styles.swiperBox}>
          <Swiper
            style={styles.wrapper}
            height={200}
            loop
            autoplay
            key={bodyImgUrls.length}
            paginationStyle={{ justifyContent: 'center', bottom: 0 }}
          >
            {
              bodyImgUrls.map((item, i) => (
                <View key={i} style={styles.slide}>
                  {
                    item &&
                    <CachedImage style={styles.swiperImage} source={{ uri: `${item}?imageView2/1/h/200` }} />
                  }
                </View>
              ))
            }
          </Swiper>
        </View>
        {
          footImgUrl !== '' && footImgUrl !== null &&
          <AutoHeightImage
            width={deviceW}
            imageURL={footImgUrl}
          />
        }
      </View>
    );
  }
  _renderFooter() {
    const { push } = this.props;
    return (
      <Footer style={styles.footerBackground}>
        <View style={styles.footer}>
          <TFeedback
            content={
              <View style={[styles.flexOne, styles.leftBtn]}>
                <Text style={styles.btnText}>联系客服</Text>
              </View>}
            onPress={() => { this.tellPhone(); }}
          />
          <TFeedback
            content={
              <View style={[styles.flexOne, styles.rightBtn]}>
                <Text style={styles.btnText}>我要报名</Text>
              </View>}
            onPress={() => { push({ key: global.memberId ? 'SignUp' : 'User', params: { type: '1' } }); }}
          />
        </View>
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="实力商家" />
        <Content>
          {this._renderBody()}
        </Content>
        {this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

StrengthBusiness.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(StrengthBusiness);
