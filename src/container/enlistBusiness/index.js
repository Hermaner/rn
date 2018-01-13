import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import accountNumberTypeBase from './base';
import styles from './styles';

class EnlistBusiness extends accountNumberTypeBase {
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
    const { items } = this.state;
    return (
      <View style={styles.pagebody}>
        <Text>sssss</Text>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="报名实力商家" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

EnlistBusiness.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(EnlistBusiness);
