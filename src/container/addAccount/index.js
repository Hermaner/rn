import React from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { Container, Content, Picker, Item, Icon, Text, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import addAccountBase from './base';
import styles from './styles';

class AddAccount extends addAccountBase {
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
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>银行名称</Text>
            <View style={styles.rowBoxRight}>
              <Picker
                style={{ flex: 1 }}
                mode="dropdown"
                placeholder="点这儿选择银行"
                selectedValue={this.state.selected1}
                onValueChange={value => this.chooseBank(value)}
              >
                <Item label="Wallet" value="key0" />
                <Item label="ATM Card" value="key1" />
                <Item label="Debit Card" value="key2" />
                <Item label="Credit Card" value="key3" />
                <Item label="Net Banking" value="key4" />
              </Picker>
              <Icon style={{ flex: 1, textAlign: 'right' }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>开户地所在地</Text>
            <View style={styles.rowBoxRight}>
              <Picker
                style={{ flex: 1 }}
                mode="dropdown"
                placeholder="点这儿选择所在地"
                selectedValue={this.state.selected2}
                onValueChange={value => this.choosePlace(value)}
              >
                <Item label="Wallet" value="aa" />
                <Item label="ATM Card" value="bb" />
                <Item label="Debit Card" value="cc" />
                <Item label="Credit Card" value="dd" />
                <Item label="Net Banking" value="ff" />
              </Picker>
              <Icon style={{ flex: 1, textAlign: 'right' }} name="arrow-back" />
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>账户名</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={{ marginLeft: 15, fontSize: 16, paddingTop: 15, paddingBottom: 15 }}
                placeholder="请输入公司账户名称"
              />
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>账号</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={{ marginLeft: 15, fontSize: 16, paddingTop: 15, paddingBottom: 15 }}
                placeholder="请输入公司账号"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>手机号码</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={{ marginLeft: 15, fontSize: 16, paddingTop: 15, paddingBottom: 15 }}
                placeholder="请输入手机号码"
              />
              <Text style={{ color: '#FE9D2D', flex: 1, textAlign: 'right' }}>获取验证码</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>验证码</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={{ marginLeft: 15, fontSize: 16, paddingTop: 15, paddingBottom: 15 }}
                placeholder="请输入验证码"
              />
            </View>
          </View>
        </View>
        <View style={styles.chooseAccount}>
          <View style={{ width: 50 }}>
            <CheckBox checked={false} />
          </View>
          <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>设为默认收款账号</Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="添加对公账号" />
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

AddAccount.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AddAccount);
