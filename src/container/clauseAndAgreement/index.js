import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
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
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <Text style={styles.title}>惠农网服务与条款</Text>
        <View style={styles.textBox}>
          <Text style={styles.content}>
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守。
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.content}>
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守。
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.smallTitle}>一、接受条款</Text>
          <Text style={styles.content}>
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守。
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.smallTitle}>二、接受条款</Text>
          <Text style={styles.content}>
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守
            湖北惠农科技有限公司（一下简称惠农网）依据一下条件和条款为您提供所享有的服务，请仔细阅读并遵守。
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="系统设置" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

ClauseAndAgreement.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ClauseAndAgreement);
