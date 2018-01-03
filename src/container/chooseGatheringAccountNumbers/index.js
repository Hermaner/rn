import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Picker, Item, Icon, Text, CheckBox, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import chooseGatheringAccountNumbersBase from './base';
import styles from './styles';

class ChooseGatheringAccountNumbers extends chooseGatheringAccountNumbersBase {
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
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <TouchableOpacity style={styles.flexRow} onPress={() => { push({ key: 'Cash', params: { name: '支付宝账号(**虫)' } }); }}>
          <Image style={styles.typeImg} source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }} />
          <View>
            <Text style={styles.accoutTitle}>支付宝账号(**虫)</Text>
            <Text style={styles.accoutLabel}>今日还可提现：2000</Text>
          </View>
          <View style={styles.icnBox}>
            <Icon style={{ textAlign: 'right', color: '#666', fontSize: 20 }} name="play" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="取现" />
        <Content>
          {this._renderBody()}
        </Content>
        <TouchableOpacity style={styles.button} onPress={() => { push({ key: 'AccountNumberType' }); }}>
          <Text style={styles.buttonText}>添加新的收款账号</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

ChooseGatheringAccountNumbers.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChooseGatheringAccountNumbers);
