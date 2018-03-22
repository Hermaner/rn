import React from 'react';
import { View, Platform, BackHandler, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header } from '../../components';
import styles from './styles';

class ChatImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.navigation.state.params,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  render() {
    const { pop } = this.props;
    const { params: { path, text } } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="1/1"
        />
        <View style={styles.view}>
          <Image
            style={{ flex: 1, resizeMode: 'contain' }}
            source={{ uri: path ? (Platform.OS === 'android' ? `file://${path}` : path) : text }}
          />
        </View>
      </Container>
    );
  }
}

ChatImage.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChatImage);
