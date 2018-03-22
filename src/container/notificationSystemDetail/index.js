import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header } from '../../components';
import notificationSystemDetailBase from './base';
import styles from './styles';

class NotificationSystemDetail extends notificationSystemDetailBase {
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
  _randerBody() {
    const { item } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text style={styles.content}>
            {item.message}
          </Text>
          <Text style={styles.time}>{item.postDate}</Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="系统通知" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._randerBody()}
        </Content>
      </Container>
    );
  }
}

NotificationSystemDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(NotificationSystemDetail);
