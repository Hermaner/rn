import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input } from 'native-base';
import { connect } from 'react-redux';
import SelectInput from 'react-native-select-input-ios';
import { popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class cgyPrice extends base {
  constructor(props) {
    super(props);
    const { wholesalePrice, wholesaleCount, unit } = this.props.navigation.state.params;
    this.state = {
      ...this.state,
      wholesalePrice,
      wholesaleCount,
      optionType: unit || '斤',
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderOne() {
    const { wholesalePrice, optionType } = this.state;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitleText}>批发价</Text>
        <Input
          style={styles.demandVal}
          clearButtonMode="while-editing"
          value={wholesalePrice}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              wholesalePrice: value,
            });
          }}
        />
        <TFeedback
          content={<View style={styles.listRight}>
            <Text style={styles.listRightText}>元/{optionType}</Text>
            <Icon name="md-arrow-dropright" style={styles.demandIcon} />
          </View>}
          onPress={() => { this.SelectInput.focus(); }}
        />
      </View>
    );
  }
  _renderTwo() {
    const { wholesaleCount, optionType } = this.state;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitleText}>起批量</Text>
        <Input
          style={styles.demandVal}
          clearButtonMode="while-editing"
          value={wholesaleCount}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              wholesaleCount: value,
            });
          }}
        />
        <View style={styles.listRight}>
          <Text style={styles.listRightText}>{optionType}</Text>
        </View>
      </View>
    );
  }
  _renderSelect() {
    const { optionType, options } = this.state;
    return (
      <SelectInput
        value={optionType}
        options={options}
        ref={(c) => { this.SelectInput = c; }}
        submitKeyText="确认"
        cancelKeyText="取消"
        onCancelEditing={() => console.log('onCancel')}
        onSubmitEditing={(value) => {
          this.setState({
            optionType: value,
          });
        }}
        style={styles.selectType}
      />
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10 }}>
        <Button onPress={this.saveData} full light style={styles.btn}><Text style={{ color: '#fff' }}>填好了</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="货品价格" />
        <Content>
          {this._renderOne()}
          {this._renderTwo()}
          {this._renderSelect()}
          {this._renderButton()}
        </Content>
      </Container>
    );
  }
}

cgyPrice.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(cgyPrice);
