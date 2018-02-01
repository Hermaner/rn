import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import addPersonalAccountBase from './base';
import styles from './styles';

class AddPersonalAccount extends addPersonalAccountBase {
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
    const { name, number } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>账户名</Text>
            <View style={styles.rowBoxRight}>
              <Input
                onChangeText={text => this.saveName(text)}
                value={name}
                style={{ marginLeft: 15, fontSize: 16, paddingTop: 15, paddingBottom: 15 }}
                placeholderTextColor="#999"
                placeholder="请输入账户名"
              />
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>卡号</Text>
            <View style={styles.rowBoxRight}>
              <Input
                onChangeText={text => this.saveNumber(text)}
                placeholderTextColor="#999"
                value={number}
                style={{ marginLeft: 15, fontSize: 16, paddingTop: 15, paddingBottom: 15 }}
                keyboardType="numeric"
                placeholder="请输入卡号"
              />
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
        <Header back={pop} title="添加个人账号" />
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={styles.button} onPress={() => { this.submitBtn(); }}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

AddPersonalAccount.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AddPersonalAccount);
