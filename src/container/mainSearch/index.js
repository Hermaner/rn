import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
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
    const { phone, code, sec } = this.state;
    const { push } = this.props;
    return (
      <Container>
        {this._readerHeader()}
        <View style={styles.mainView}>
          <View style={styles.leftNav}>
            <Content>
              <View>
                <Text>asdasd</Text>
              </View>
            </Content>
          </View>
          <View style={styles.rightContent}>
            <Content>
              <View>
                <Text>asdasd</Text>
              </View>
            </Content>
          </View>
        </View>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
