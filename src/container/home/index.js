import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';

class HomeScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (obj) => {
    this.props.push(obj);
  }
  render() {
    return (
      <Container>
        <Header back={this.props.push} />
        <Content padder>
          <Button
            onPress={() =>
              this.goRoute({ key: 'CgDemand' })}
          >
            <Text>CgDemand</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'MainSearch', params: { type: '2' } })}
          >
            <Text>mainSearch</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'Payroll' })}
          >
            <Text>mainSearch</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'WhyChoose' })}
          >
            <Text>mainSearch</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'ReportPage' })}
          >
            <Text>ReportPage</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'AddAccount' })}
          >
            <Text>AddAccount</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'ChooseAccountType' })}
          >
            <Text>ChooseAccountType</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'PurchaseHome' })}
          >
            <Text>PurchaseHome</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'MySupply' })}
          >
            <Text>MySupply</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'HuinongConsultDetail' })}
          >
            <Text>HuinongConsultDetail</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(HomeScreen);
