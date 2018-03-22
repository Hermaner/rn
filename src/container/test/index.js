import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Swiper from 'react-native-swiper';
import { Container, Content, Header, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import base from './base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
const BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = BUTTONS.length - 1;
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
  goRoute = (key) => {
    this.props.push(key);
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
              <CachedImage source={{ uri: `${item.imgUrl}?imageView2/1/w/60` }} style={styles.image} />
            </TouchableHighlight>
          ))
        }
      </Swiper>
    );
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() =>
                this.goRoute('AppIndex')}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button
              onPress={() =>
              this.props.push('ImageCrop')
            }
            >
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>
            This is Content Section
          </Text>
          <Badge>
            <Text>2</Text>
          </Badge>
          <Badge style={{ backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }}>1866</Text>
          </Badge>
          <Button active badge vertical>
            <Badge ><Text>51</Text></Badge>
            <Icon active name="navigate" />
            <Text>Navigate</Text>
          </Button>
          <Button rounded bordered transparent small iconRight info>
            <Text>Click Me! </Text>
            <Icon name="arrow-back" />
          </Button>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   Your text here
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
          <ListItem onPress={() => alert(1)}>
            <CheckBox checked color="#ff0000" />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Discussion with Client</Text>
            </Body>
          </ListItem>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: 'Testing ActionSheet',
                },
                buttonIndex => this.setState({ clicked: BUTTONS[buttonIndex] }),
              )}
            >
              <Text>Actionsheet</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(HomeScreen);
