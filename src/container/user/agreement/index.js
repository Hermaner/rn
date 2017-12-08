import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../../actions';
import { Header } from '../../../components';
import styles from './styles';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <Container>
        <Header back={this.props.pop} title="用户协议" />
        <Content padder contentContainerStyle={{ flex: 1 }}>
          <Text style={styles.text}>
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意登陆即表示同意登陆即表示同意登陆即表示同意
            登陆即表示同意
          </Text>
        </Content>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(MainScreen);
