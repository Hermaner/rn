import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header } from '../../components';
import base from './base';
import styles from './styles';

class InputChange extends base {
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
  _renderInput() {
    const { label, value } = this.state;
    return (
      <View style={styles.listView}>
        <Text style={styles.listLabel}>{label}</Text>
        <TFeedback
          content={
            <View style={styles.listRight}>
              <Input
                style={styles.input}
                placeholderTextColor="#999"
                placeholder={`请输入${label}`}
                clearButtonMode="while-editing"
                value={value}
                onChangeText={v => this.setState({ value: v })}
                onSubmitEditing={this.login}
              />
            </View>
          }
          onPress={this.showPopDate}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="输入信息"
          showRight
          rightText="完成"
          rightPress={this.save}
        />
        <Content style={styles.content}>
          {this._renderInput()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

InputChange.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(InputChange);
