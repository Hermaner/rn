import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Switch } from 'native-base';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import { popRoute, pushRoute } from '../../actions';
import { Loading, BHeader } from '../../components';
import styles from './styles';

class MySetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
    console.log(111)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  getInit = () => {
    this.setState({
      isStart: global.reqNotification && global.reqNotification !== 'denied',
    });
  }
  changeStart = () => {
    this._openSettings();
  }
  permiss = () => {
    const types = Permissions.getTypes();
    if (types.join('').indexOf('notification') > -1) {
      Permissions.request('notification').then((response) => {
        this.setState({
          isStart: response && response !== 'denied',
        });
        global.reqNotification = response;
      });
    }
  }
  _openSettings = () => Permissions.openSettings().then(() => {
    this.permiss();
  })
  render() {
    const { pop } = this.props;
    const { isStart } = this.state;
    return (
      <Container>
        <BHeader
          back={pop}
          title="通知设置"
        />
        <Content>
          <View style={styles.list}>
            <Text style={styles.name}>通知设置</Text>
            <View style={styles.right}>
              <Switch
                value={isStart}
                onValueChange={val => this.changeStart(val)}
              />
            </View>
          </View>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MySetting.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySetting);
