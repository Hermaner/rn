import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import styles from './styles';
import myBase from './base';

class OrderRevise extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <View style={styles.flexRow}>
          <Text>优惠金额：</Text>
          <Input
            style={styles.inputText}
            value={this.state.userName}
            onChangeText={text => this.saveUserName(text)}
            placeholder="请输入优惠金额"
          />
        </View>
        <View>
          <Text>确定</Text>
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
          title="订单修改"
        />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderRevise.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderRevise);
