import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import { deviceW } from '../../utils';

@observer
class StrengthBusiness extends Base {
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
  _renderBody() {
    const { imgList } = this.state;
    return (
      <View>
        {
          imgList.length > 0 &&
          imgList.map((item, index) => (
            <AutoHeightImage
              key={index}
              width={deviceW}
              imageURL={item}
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
        <Header back={pop} title="图片详情" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

StrengthBusiness.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(StrengthBusiness);
