import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

class MyAccount extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderTop() {
    const { amount } = this.state;
    return (
      <View style={styles.top}>
        <Text style={styles.account}>{amount}</Text>
        <Text style={styles.topLabel}>余额(元)</Text>
        <TOpacity
          style={styles.btn}
          content={
            <Text style={styles.btnText}>提现</Text>
          }
          onPress={() => this.props.push({ key: 'MyTixian', params: { amount } })}
        />
      </View>
    );
  }
  _renderList() {
    return (
      <View>
        <View style={styles.list}>
          <Text style={styles.name}>提现记录</Text>
          <View style={styles.right}>
            <Text style={styles.label}>0.00元</Text>
            <Icon name="md-arrow-dropright" style={styles.arr} />
          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.name}>收入明细</Text>
          <View style={styles.right}>
            <Text style={styles.label} />
            <Icon name="md-arrow-dropright" style={styles.arr} />
          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.name}>账户设置</Text>
          <View style={styles.right}>
            <Text style={styles.label} />
            <Icon name="md-arrow-dropright" style={styles.arr} />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="我的账户"
        />
        <Content>
          {this._renderTop()}
          {this._renderList()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyAccount.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyAccount);
