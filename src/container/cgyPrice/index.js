import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, TFeedback, Select } from '../../components';
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
      optionType: unit || '点击选择单位',
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
          onPress={() => { this.chooseType(); }}
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
    const { optionType, options, selectShow } = this.state;
    return (
      <Select
        selectShow={selectShow}
        value={optionType}
        items={options}
        title="请选择采购时长"
        closeModal={this.closeModal}
        onValueChange={value => this.selectModel(value)}
      />
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10 }}>
        <TFeedback
          content={
            <View style={styles.btn}>
              <Text style={{ color: '#fff' }}>选好了</Text>
            </View>
          }
          onPress={this.saveData}
        />
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
          {this._renderButton()}
        </Content>
        {this._renderSelect()}
      </Container>
    );
  }
}

cgyPrice.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(cgyPrice);
