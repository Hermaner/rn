import React from 'react';
import { StyleSheet } from 'react-native';
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
      condition: '',
      ip: '',
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button
              onPress={() =>
              this.props.push({ key: 'ImageCrop' })
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
