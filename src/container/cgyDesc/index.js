import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';

class cgyDesc extends base {
  constructor(props) {
    super(props);
    const { memo } = this.props.navigation.state.params;
    this.state = {
      ...this.state,
      memo,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderArea() {
    const { memo } = this.state;
    return (
      <View style={styles.memoView}>
        <Input
          style={styles.memoInput}
          multiline
          placeholderTextColor="#aaa"
          placeholder="详细的货品描述"
          onChangeText={text => this.setState({ memo: text })}
          value={memo}
        />
        <View style={{ padding: 10 }}>
          <Button onPress={this.saveData} full light style={styles.btn}><Text style={{ color: '#fff' }}>填好了</Text></Button>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="货品描述" />
        <Content>
          {this._renderArea()}
        </Content>
      </Container>
    );
  }
}

cgyDesc.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(cgyDesc);
