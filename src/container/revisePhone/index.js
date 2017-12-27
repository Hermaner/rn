import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import revisePhoneBase from './base';
import styles from './styles';

class RevisePhone extends revisePhoneBase {
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
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <Text style={{ marginRight: 15, color: '#333' }}>+86</Text>
          <Input
            onChangeText={text => this.savePhone(text)}
            placeholderTextColor="#999"
            style={styles.inputs} placeholder="请输入手机号码"
          />
        </View>
        <View style={styles.rowBox}>
          <Input
            placeholderTextColor="#999"
            style={styles.inputs}
            placeholder="请输入收到的验证码"
          />
          <View style={styles.getBox}>
            <Text style={styles.get}>获取验证码</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="修改手机号码" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>立即绑定</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

RevisePhone.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(RevisePhone);
