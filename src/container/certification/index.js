import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import certificationBase from './base';
import styles from './styles';

class Certification extends certificationBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  _renderIndividual() {
    const { push } = this.props;
    return (
      <View>
        <View style={styles.individual}>
          <View style={styles.individualTop}>
            <Image style={styles.individualImg} source={require('../app/resource/imgs/avatar.jpg')} />
            <View style={styles.individualText}>
              <Text style={{ color: '#65C12E', fontSize: 18, marginBottom: 6 }}>个人认证</Text>
              <Text style={{ color: '#65C12E', fontSize: 14 }}>只需上传有效期内身份证(反正面及手持照),即可获得以下权益!</Text>
            </View>
          </View>
        </View>
        <View style={styles.individualBottom}>
          <View style={styles.half}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/sm.png')} />
            <Text style={styles.getText}>获得实名认证标志</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/qz.png')} />
            <Text style={styles.getText}>排名靠前赢得关注</Text>
          </View>
          <View style={styles.half}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/fb.png')} />
            <Text style={styles.getText}>发布信息免费畅通</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>获得采购对接机会</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.individualBtn} onPress={() => { push({ key: 'IndividualAuthentication' }); }}>
          <View style={styles.btnBox}>
            <Text style={styles.individualBtnText}>点击马上认证</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  _renderCollective() {
    const { push } = this.props;
    return (
      <View style={{ flex: 1, marginTop: 10, backgroundColor: '#fff' }}>
        <View style={styles.individual}>
          <View style={styles.individualTop}>
            <Image style={styles.individualImg} source={require('../app/resource/imgs/avatar.jpg')} />
            <View style={styles.individualText}>
              <Text style={{ color: '#65C12E', fontSize: 18, marginBottom: 6 }}>企业认证</Text>
              <Text style={{ color: '#65C12E', fontSize: 14 }}>只需上传有效期内身份证(反正面及手持照),即可获得以下权益!</Text>
            </View>
          </View>
        </View>
        <View style={styles.individualBottom}>
          <View style={styles.half}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/sm.png')} />
            <Text style={styles.getText}>个人认证所有权益</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/qz.png')} />
            <Text style={styles.getText}>彰显实力获得信赖</Text>
          </View>
          <View style={styles.half}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/fb.png')} />
            <Text style={styles.getText}>线上活动优先参与</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>渠道资源优先对接</Text>
          </View>
          <View style={styles.half}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>享受深度撮合服务</Text>
          </View>
          <View style={[styles.half, styles.rightPart]}>
            <Image style={styles.getImg} source={require('../app/resource/imgs/gwc.png')} />
            <Text style={styles.getText}>线上交易更多保障</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.individualBtn} onPress={() => { push({ key: 'CollectiveAuthentication' }); }}>
          <View style={styles.btnBox}>
            <Text style={styles.individualBtnText}>点击马上认证</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
