import React from 'react';
import { View, Slider, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, CheckBox, Text, Input, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import { Mcolor } from '../../utils';
import { DeepClone } from '../../api';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...DeepClone(this.resetData),
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
  _renderContent() {
    const { items } = this.state;
    return (
      <View style={styles.itemContent}>
        {
          items.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.itemList}>
                  <Text style={[styles.utilsText, styles.f1]}>{item.title}</Text>
                  <CheckBox
                    onPress={() => this.changeItem(index)}
                    checked={item.cur} color={Mcolor}
                  />
                </View>}
              onPress={() => this.changeItem(index)}
            />
          ))
        }
      </View>
    );
  }
  _renderDistance() {
    const { distance } = this.state;
    return (
      <View style={styles.distanceContent}>
        <Text style={styles.distanceTitle} >
          设置看货距离({parseInt(distance, 10)})
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={500}
          minimumTrackTintColor={Mcolor}
          onValueChange={c => this.setState({ distance: c })}
        />
        <View style={styles.distanceLabel}>
          <Text style={styles.labelText} >
            0
          </Text>
          <Text style={styles.labelText} >
            100
          </Text>
          <Text style={styles.labelText} >
            200
          </Text>
          <Text style={styles.labelText} >
            300
          </Text>
          <Text style={styles.labelText} >
            400
          </Text>
          <Text style={styles.utilsText} >
            500
          </Text>
        </View>
      </View>
    );
  }
  _renderCondition() {
    const { minPrice, maxPrice, count } = this.state;
    const { pop } = this.props;
    return (
      <View style={styles.condition}>
        <View style={styles.itemList}>
          <Text style={styles.utilsText}>价格区间</Text>
          <Input
            style={styles.input}
            placeholderTextColor="#999"
            placeholder="输入最低价"
            keyboardType="numeric"
            clearButtonMode="while-editing"
            value={minPrice}
            onChangeText={value => this.onChangeText(value, 0)}
          />
          <Text style={styles.utilsText}>至</Text>
          <Input
            style={styles.input}
            placeholderTextColor="#999"
            keyboardType="numeric"
            placeholder="输入最低价"
            clearButtonMode="while-editing"
            value={maxPrice}
            onChangeText={value => this.onChangeText(value, 1)}
          />
        </View>
        <View style={styles.itemList}>
          <Text style={styles.utilsText}>起订量</Text>
          <Input
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#999"
            placeholder="输入起订量"
            clearButtonMode="while-editing"
            value={count}
            onChangeText={value => this.onChangeText(value, 2)}
          />
          <Text style={styles.utilsText}>以下起订</Text>
        </View>
        <Button full rounded style={styles.saveBtn} onPress={() => { this.selectDistrict(pop); }}>
          <Text>填好了</Text>
        </Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="货品筛选"
          showRight
          rightText="重置"
          rightPress={this.resetState}
        />
        <Content>
          {this._renderContent()}
          {this._renderDistance()}
          {this._renderCondition()}
        </Content>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
