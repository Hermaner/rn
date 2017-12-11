import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _readerHeader() {
    const { pop } = this.props;
    const { searchVal } = this.state;
    return (
      <Header style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pop} style={styles.Headerleft}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Input
            style={styles.HeaderInput}
            placeholderTextColor="#999"
            placeholder="输入货品名称"
            autoFocus
            clearButtonMode="while-editing"
            value={searchVal}
            onChangeText={value => this.onSearchChange(value)}
            onSubmitEditing={this.login}
          />
        </View>
      </Header>
    );
  }
  render() {
    return (
      <Container>
        {this._readerHeader()}
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
