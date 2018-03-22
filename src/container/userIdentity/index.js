import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import { TOpacity, Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

@observer
class UserIdentity extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { type } = this.state;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {
          type.map((item, index) => (
            <TOpacity
              style={{ flex: 1 }}
              key={index}
              content={
                <View style={styles.rowBox}>
                  <Text style={{ fontSize: 14, color: '#666' }}>{item.identityName}</Text>
                </View>
              }
              onPress={() => this.clickOne(item.identityId, item.identityName)}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="用户身份" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

UserIdentity.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(UserIdentity);
