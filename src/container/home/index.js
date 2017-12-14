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
              this.goRoute({ key: 'User' })}
          >
            <Text>user</Text>
          </Button>
          <Button
            onPress={() =>
              this.goRoute({ key: 'MainSearch' })}
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
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(HomeScreen);
