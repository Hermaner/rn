import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Icon, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import cashBase from './base';
import styles from './styles';

class Cash extends cashBase {
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
    const { push, pop } = this.props;
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>收款账户</Text>
            <Text style={styles.normalThree}>{name}</Text>
            <TouchableOpacity style={styles.rowBoxRight} onPress={pop}>
              <Text style={styles.rightText}>修改账号</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.second}>
            <Text style={styles.normalThree}>提现金额(元)</Text>
            <View style={styles.money}>
              <Text style={{ fontSize: 26, color: '#333', fontWeight: 'bold' }}>￥</Text>
              <Input style={styles.inputs} keyboardType="numeric" />
            </View>
            <Text style={{ color: '#CE495B', fontSize: 12, marginTop: 4 }}>余额不足1元，无法提现!</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>提现</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.normalNine}>手续费：每天可提现2次，提现不收取任何手续费。</Text>
              <Text style={styles.normalNine}>到账时间：3个工作日内。</Text>
              <TouchableOpacity onPress={() => { push({ key: 'CashRule' }); }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ color: '#64C42C', fontSize: 14 }}>查看提现详细规则</Text>
                <Icon style={{ color: '#64C42C', fontSize: 20 }} name="md-arrow-dropright" />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="取现" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

Cash.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Cash);
