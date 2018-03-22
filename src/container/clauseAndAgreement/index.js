import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading } from '../../components';
import clauseAndAgreementBase from './base';
import styles from './styles';

class ClauseAndAgreement extends clauseAndAgreementBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { info } = this.state;
    return (
      <View style={styles.pagebody}>
        <Text style={styles.title}>{info.title}</Text>
        <View style={styles.textBox}>
          <Text style={styles.content}>
            {info.content}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="服务与条款" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ClauseAndAgreement.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ClauseAndAgreement);
