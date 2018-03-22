import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, TFeedback, Select } from '../../components';
import base from './base';
import styles from './styles';

class cgDemand extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderOne() {
    const { demand, optionType } = this.state;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitleText}>需求量</Text><Text style={styles.mustText}>(必填)</Text>
        <Input
          style={styles.demandVal}
          clearButtonMode="while-editing"
          value={demand}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              demand: value,
            });
          }}
          onSubmitEditing={this.login}
        />
        <TFeedback
          content={<View style={styles.listRight}>
            <Text style={styles.listRightText}>{optionType}</Text>
            <Icon name="md-arrow-dropright" style={styles.demandIcon} />
          </View>}
          onPress={() => { this.chooseType(); }}
        />
      </View>
    );
  }
  _renderTwo() {
    const { frequency } = this.state;
    return (
      <View style={styles.frlist}>
        <View style={styles.frtop}>
          <Text style={styles.listTitleText}>采购频率</Text><Text style={styles.unmustText}>(选填)</Text>
        </View>
        <View style={styles.frBtnView}>
          {
            frequency.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.frBtn, item.cur && styles.tabCur]}>
                    <Text style={[styles.mainText, item.cur && styles.tabCurText]}>
                      {item.label}
                    </Text>
                  </View>}
                onPress={() => { this.tabFrBtn(index); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  _renderThree() {
    const { optionType, wantStarPrice, wantEndPrice } = this.state;
    return (
      <View style={styles.list}>
        <Text style={styles.listTitleText}>期望价格</Text><Text style={styles.unmustText}>(选填)</Text>
        <Input
          style={styles.listPrice}
          clearButtonMode="while-editing"
          value={wantStarPrice}
          keyboardType="numeric"
          onChangeText={(value) => {
            this.setState({
              wantStarPrice: value,
            });
          }}
        />
        <Text style={styles.listLine}>-</Text>
        <Input
          style={styles.listPrice}
          keyboardType="numeric"
          clearButtonMode="while-editing"
          value={wantEndPrice}
          onChangeText={(value) => {
            this.setState({
              wantEndPrice: value,
            });
          }}
        />
        <View style={styles.listRight}>
          <Text style={styles.listRightText}>元/{optionType}</Text>
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
        title="请选择单位"
        closeModal={this.closeModal}
        onValueChange={value => this.selectModel(value)}
      />
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10 }}>
        <Button onPress={this.saveData} full light style={styles.btn}><Text style={{ fontSize: 15, color: '#fff' }}>提交</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="需求量" />
        <Content>
          {this._renderOne()}
          {this._renderTwo()}
          {this._renderThree()}
          {this._renderButton()}
        </Content>
        {this._renderSelect()}
      </Container>
    );
  }
}

cgDemand.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(cgDemand);
