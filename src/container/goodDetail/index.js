import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';
import { DeepClone } from '../../../api';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...DeepClone(this.resetData),
    };
  }
  componentDidMount() {
  }
  _renderTop() {
    return (
      <View style={styles.topView}>
        <Image source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} style={styles.mainImg} />
        <View style={styles.topOne}>
          <Text style={styles.topText}>6小时前</Text>
        </View>
        <View style={styles.topTwo}>
          <Text style={styles.topText}>1111人查看</Text>
        </View>
      </View>
    );
  }
  _renderNameAP() {
    return (
      <View style={styles.nameAPView}>
        <View style={styles.nameAOne}>
          <Text style={styles.topText}>赣南脐橙双11秒杀价按时大大打算多</Text>
        </View>
        <View style={styles.nameAOne}>
          <Text style={styles.topText}>赣南脐橙双11秒杀价按时大大打算多</Text>
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
          title="供应详情"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content>
          {this._renderTop()}
        </Content>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(MainScreen);
