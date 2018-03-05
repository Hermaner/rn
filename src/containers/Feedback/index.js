import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

class Feedback extends base {
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
  _renderContent() {
    return (
      <View style={styles.content}>
        <Image source={require('../../assets/img/aver.png')} style={styles.logo} />
        <Text style={styles.text}>身边最好的服务平台</Text>
      </View>
    );
  }
  _renderArea() {
    const { content } = this.state;
    return (
      <View style={styles.area}>
        <Input
          multiline
          autoFocus
          style={styles.listMemo}
          placeholderTextColor="#999"
          placeholder="留下你的宝贵意见"
          clearButtonMode="while-editing"
          value={content}
          onChangeText={value => this.setState({ content: value })}
        />
        <TOpacity
          style={styles.btnView}
          content={
            <Text style={styles.btnText}>提交意见</Text>
          }
          onPress={this.CreateFeedbackService}
        />
        <Text style={styles.text}>孙猴上门V1.0.0</Text>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="问题反馈"
        />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderContent()}
          {this._renderArea()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

Feedback.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Feedback);
