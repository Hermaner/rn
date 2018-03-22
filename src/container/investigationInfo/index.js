import React from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading } from '../../components';
import reportPageBase from './base';
import { deviceW } from '../../utils';
import styles from './styles';

class ReportPage extends reportPageBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
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
    const { userInfo, list } = this.state;
    return (
      <View style={styles.bodyBox}>
        <View style={styles.titleFirstBox}>
          <Text style={styles.titleFirst}>现场考察</Text>
        </View>
        {
          list.map((item, index) => (
            <View key={index} style={styles.rowBox}>
              <View style={styles.borderBox} />
              <View style={styles.topTextBox}>
                <Text style={styles.typeName}>{item.title}</Text>
              </View>
              <View style={styles.bottomTextBox}>
                <Text style={styles.bottomText}>{item.label}</Text>
              </View>
              <View style={styles.bottomBorder} />
              {
                item.imgUrl &&
                item.imgUrl !== '' &&
                <View style={{ flex: 1, marginTop: 25, alignItems: 'center', justifyContent: 'center' }}>
                  <AutoHeightImage
                    width={deviceW - 20}
                    imageURL={item.imgUrl}
                  />
                </View>
              }
              {
                item.describe &&
                item.describe !== '' &&
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 14, color: '#666' }}>{item.describe}</Text>
                </View>
              }
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="考察详情" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ReportPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportPage);
