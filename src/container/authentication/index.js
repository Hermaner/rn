import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Icon, Text, Input, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import authenticationBase from './base';
import styles from './styles';

class Authentication extends authenticationBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { pop, push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Text style={styles.text}>您的账号绑定的是尾号为3456的手机号码</Text>
          <Text style={styles.text}>请先输入验证码证明身份</Text>
        </View>
        <View style={styles.rowBox}>
          <Input
            placeholderTextColor="#999"
            style={styles.inputs}
            placeholder="点击输入验证码"
          />
          <View style={styles.getBox}>
            <Text style={styles.get}>获取验证码</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="验证身份" />
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>下一步</Text>
          </TouchableOpacity>
          <View style={styles.footerText}>
            <View style={styles.flexOne}>
              <Text style={styles.footerTopLeft}>收不到短信？试试</Text>
              <TouchableOpacity>
                <Text style={styles.footerTopRight}>语音验证</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.footerBottom}>如有疑问，请联系客服：</Text>
              <TouchableOpacity>
                <Text style={styles.footerBottomRight}>400-008-8688</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

Authentication.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Authentication);
