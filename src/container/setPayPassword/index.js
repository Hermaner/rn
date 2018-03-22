import React from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TOpacity } from '../../components';
import setPayPasswordBase from './base';
import styles from './styles';

class SetPayPassword extends setPayPasswordBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={styles.flexRow}>
              <Text style={styles.leftText}>重置支付密码</Text>
              <View style={styles.rightTextBox}>
                <Text numberOfLines={1} style={styles.rightText}>密码忘记可以重置</Text>
                <Icon style={styles.myIcn} name="md-arrow-dropright" />
              </View>
            </View>
          }
          onPress={() => push({ key: 'ValidatePhone' })}
        />
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={styles.flexRow}>
              <Text style={styles.leftText}>修改支付密码</Text>
              <View style={styles.rightTextBox}>
                <Text numberOfLines={1} style={styles.rightText} />
                <Icon style={styles.myIcn} name="md-arrow-dropright" />
              </View>
            </View>
          }
          onPress={() => push({ key: 'SetPayPasswordUsOldPassword' })}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="密码设置" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

SetPayPassword.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SetPayPassword);
