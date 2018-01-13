import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Text, Input, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class SetPassword extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.getInit();
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { confirmPassword, password } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={[styles.rowBox, styles.borderB]}>
          <Input
            style={styles.password}
            placeholderTextColor="#999"
            placeholder="输入密码"
            type="password"
            clearButtonMode="while-editing"
            value={password}
            onChangeText={value => this.setState({ password: value })}
          />
          <Icon style={styles.eye} name="eye" />
        </View>
        <View style={styles.rowBox}>
          <Input
            style={styles.password}
            placeholderTextColor="#999"
            placeholder="确认密码"
            clearButtonMode="while-editing"
            value={confirmPassword}
            onChangeText={value => this.setState({ confirmPassword: value })}
          />
          <Icon style={styles.eye} name="eye" />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="设置密码" />
        <Content>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.btn}>
                <View style={styles.btnBox}>
                  <Text style={styles.btnText}>确认</Text>
                </View>
              </View>}
            onPress={() => this.reviseUserInfo()}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SetPassword.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SetPassword);
