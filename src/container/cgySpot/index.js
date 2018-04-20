import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, CheckBox, Icon } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class cgySpot extends base {
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
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderOne() {
    const { items } = this.state;
    return (
      <View style={styles.btnView}>
        {
            items.map((item, index) => (
              <TFeedback
                key={index}
                content={<View key={index} style={[styles.tabList, item.cur && styles.tabListCur]}>
                  <CheckBox style={styles.checkView} color={Mcolor} checked={item.cur} />
                  <View style={styles.tabCon}>
                    <Text
                      style={[styles.tabTitle, item.cur && styles.tabTitleCur]}
                    >
                      {item.title}</Text>
                    <Text
                      style={[styles.tabLabel, item.cur && styles.tabLabelCur]}
                    >{item.label}</Text>
                  </View>
                </View>}
                onPress={() => this.tabBtn(index)}
              />
            ))
        }
      </View>
    );
  }
  _renderTwo() {
    const { tabIndex, startDate, endDate } = this.state;
    return (
      <View style={styles.twoView}>
        {
          tabIndex === 1 &&
          <TFeedback
            content={<View style={styles.twoViewList}>
              <Text style={styles.twoTitle}>供货时间</Text>
              <View style={styles.twoRight}>
                <Text style={styles.twoLabel}>{startDate || '点击选择供货时间'}</Text>
                <Icon name="md-arrow-dropdown" style={styles.twoIcon} />
              </View>
            </View>}
            onPress={() => this.pickDate(0)}
          />
        }
        <TFeedback
          content={<View style={styles.twoViewList}>
            <Text style={styles.twoTitle}>下架时间</Text>
            <View style={styles.twoRight}>
              <Text style={styles.twoLabel}>{endDate || '点击选择下架时间'}</Text>
              <Icon name="md-arrow-dropdown" style={styles.twoIcon} />
            </View>
          </View>}
          onPress={() => this.pickDate(1)}
        />
        <Button onPress={this.saveData} full light style={styles.twoBtn}><Text style={{ fontSize: 15, color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { isDateShow } = this.state;
    return (
      <Container>
        <Header back={pop} title="是否现货" />
        <Content>
          {this._renderOne()}
          {this._renderTwo()}
          <DateTimePicker
            titleIOS="选择时间"
            confirmTextIOS="确定"
            cancelTextIOS="取消"
            is24Hour
            isVisible={isDateShow}
            onConfirm={this.dateConfirm}
            onCancel={this.dateCancel}
          />
        </Content>
      </Container>
    );
  }
}

cgySpot.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(cgySpot);
