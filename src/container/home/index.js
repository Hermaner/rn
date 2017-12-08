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
  _renderSwiper() {
    const { swiperData } = this.state;
    return (
      <Swiper
        showsButtons
        showsPagination
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
        height={180}
        autoplay
        paginationStyle={{ bottom: 10 }}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
        activeDotStyle={{ backgroundColor: '#fff', width: 6, height: 6 }}
      >
        { swiperData.length > 0 &&
          swiperData.map((item, i) => (
            <TouchableHighlight underlayColor="#222" key={i} style={{ flex: 1 }} onPress={() => this.props.pushRoute('ModalDetail')}>
              <Image source={{ uri: item.imgUrl }} style={styles.image} />
            </TouchableHighlight>
          ))
        }
      </Swiper>
    );
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
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(HomeScreen);
