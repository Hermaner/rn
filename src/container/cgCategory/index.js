import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';

class CgCategory extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _renderContent() {
    const { leftLists } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.maskerContentView}>
        {
          leftLists.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => { push({ key: 'User' }); }}>
              <View style={styles.contetnTabView}>
                <Text
                  style={styles.mainText}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="注册登陆" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderContent()}
        </Content>
      </Container>
    );
  }
}

CgCategory.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CgCategory);
