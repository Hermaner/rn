import React from 'react';
import { BackHandler, View, Text } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import styles from './styles';

class ReviseSuccess extends React.Component {
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
  _renderBody() {
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.icnBox}>
          <Icon style={styles.successIcn} name="checkmark-circle" />
          <Text style={styles.textCenter}>恭喜您！</Text>
          <Text style={styles.textCenter}>信息完善成功</Text>
        </View>
        <Text style={styles.title}>您还可以</Text>
        <View>
          <TFeedback
            content={
              <View style={styles.btnBox}>
                <Text style={styles.btnText}>返回首页</Text>
              </View>}
            onPress={() => { push({ key: 'User' }); }}
          />
          <TFeedback
            content={
              <View style={styles.btnBox}>
                <Text style={styles.btnText}>采购大厅</Text>
              </View>}
            onPress={() => { push({ key: 'User' }); }}
          />
          <TFeedback
            content={
              <View style={styles.btnBox}>
                <Text style={styles.btnText}>发供应</Text>
              </View>}
            onPress={() => { push({ key: 'User' }); }}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="修改成功" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

ReviseSuccess.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReviseSuccess);
