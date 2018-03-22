import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import certificationBase from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class Certification extends certificationBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
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
  _renderIndividual() {
    const { zheng, havePerson } = this.state;
    return (
      <View>
        <View style={styles.individual}>
          <View style={styles.individualTop}>
            <CachedImage style={styles.individualImg} source={zheng} />
            <View style={styles.individualText}>
              <Text style={{ color: Mcolor, fontSize: 15, marginBottom: 6 }}>个人认证</Text>
              <Text style={{ color: '#666', fontSize: 12 }}>只需上传有效期内身份证(正反面及手持照),即可获得以下权益!</Text>
            </View>
          </View>
        </View>
        <View style={styles.individualBottom}>
          <View style={styles.half}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/sm.png')} />
            <Text style={styles.getText}>获得实名认证标志</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/qz.png')} />
            <Text style={styles.getText}>排名靠前赢得关注</Text>
          </View>
          <View style={styles.half}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/fb.png')} />
            <Text style={styles.getText}>发布信息免费畅通</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>获得采购对接机会</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.individualBtn} onPress={() => this.goPersonPage()}>
          {

          }
          <View style={[styles.btnBox, havePerson === '0' ? '' : styles.btnBoxBackGround]}>
            <Text style={styles.individualBtnText}>{havePerson === '0' ? '点击马上认证' : havePerson === '1' ? '已完成个人认证' : '正在认证中'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  _renderCollective() {
    const { qiye, haveEnt } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 10, backgroundColor: '#fff' }}>
        <View style={styles.individual}>
          <View style={styles.individualTop}>
            <CachedImage style={styles.individualImg} source={qiye} />
            <View style={styles.individualText}>
              <Text style={{ color: Mcolor, fontSize: 15, marginBottom: 6 }}>企业认证</Text>
              <Text style={{ color: '#666', fontSize: 12 }}>只需上传企业营业执照(除个体工商户),即可获得以下权益!</Text>
            </View>
          </View>
        </View>
        <View style={styles.individualBottom}>
          <View style={styles.half}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/sm.png')} />
            <Text style={styles.getText}>个人认证所有权益</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/qz.png')} />
            <Text style={styles.getText}>彰显实力获得信赖</Text>
          </View>
          <View style={styles.half}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/fb.png')} />
            <Text style={styles.getText}>线上活动优先参与</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>渠道资源优先对接</Text>
          </View>
          <View style={styles.half}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>享受深度撮合服务</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <CachedImage style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>线上交易更多保障</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.individualBtn} onPress={() => { this.goEntPage(); }}>
          <View style={[styles.btnBox, haveEnt === '0' ? '' : styles.btnBoxBackGround]}>
            <Text style={styles.individualBtnText}>{haveEnt === '0' ? '点击马上认证' : haveEnt === '1' ? '已完成企业认证' : '正在认证中'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>实名认证常见问题</Text>
          <Icon style={{ marginLeft: 4, color: '#666', fontSize: 20 }} name="md-arrow-dropright" />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="实名认证" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderIndividual()}
          {this._renderCollective()}
        </Content>
      </Container>
    );
  }
}

Certification.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Certification);
