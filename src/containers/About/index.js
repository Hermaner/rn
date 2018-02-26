import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';
import styles from './styles';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderContent() {
    return (
      <View style={styles.content}>
        <Image source={require('../../assets/img/aver.png')} style={styles.logo} />
        <Text style={styles.text}>身边最好的服务平台</Text>
        <Text style={styles.text}>孙猴上门V1.0.0</Text>
        <Text style={styles.text}>上海悟帮实业有限公司</Text>
        <Text style={styles.text}>版权信息@sunhousm.com</Text>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="关于我们"
        />
        {this._renderContent()}
      </Container>
    );
  }
}

About.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(About);
