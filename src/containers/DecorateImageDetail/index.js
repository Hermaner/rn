import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';
import { deviceW } from '../../utils';

class DecorateImageDetail extends base {
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
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderContent() {
    const { items } = this.state;
    return (
      <View style={styles.listContent}>
        {
          items.map((list, index) => (
            <AutoHeightImage
              width={deviceW - 20}
              key={index}
              style={{ marginTop: 10 }}
              imageURL={list.imgUrl}
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
        <Header back={pop} title="证书详情" />
        <Content>
          {this._renderContent()}
        </Content>
      </Container>
    );
  }
}

DecorateImageDetail.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(DecorateImageDetail);
