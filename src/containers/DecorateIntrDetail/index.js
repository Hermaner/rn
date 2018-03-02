import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, TitleItem } from '../../components';
import base from './base';
import styles from './styles';

class DecorateIntrDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  _renderIntr() {
    const { introInfo } = this.state;
    return (
      <View style={styles.intrView}>
        <TitleItem
          text="公司简介"
        />
        <View style={styles.listView}>
          <Text style={styles.label}>{introInfo.introContent}</Text>
        </View>
        <TitleItem
          text="详细信息"
        />
        <View style={styles.listView}>
          <Text style={styles.title}>公司规模</Text>
          <Text style={styles.label}>{introInfo.scale}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>装后服务</Text>
          <Text style={styles.label}>{introInfo.services}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>初期设计/量房</Text>
          <Text style={styles.label}>{introInfo.initialDesign}
          </Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>初期预算/洽谈方式</Text>
          <Text style={styles.label}>{introInfo.initialBudget}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>深化设计</Text>
          <Text style={styles.label}>{introInfo.deepenDesign}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>深化预算</Text>
          <Text style={styles.label}>{introInfo.deepenBudget}
          </Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>材料质量</Text>
          <Text style={styles.label}>{introInfo.quality}
          </Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>合同规范性</Text>
          <Text style={styles.label}>{introInfo.contract}
          </Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>特色服务</Text>
          <Text style={styles.label}>{introInfo.feature}
          </Text>
        </View>
        <TitleItem
          text="公司服务"
        />
        <View style={styles.listView}>
          <Text style={styles.title}>服务区域</Text>
          <Text style={styles.label}>{introInfo.serviceArea}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>服务专长</Text>
          <Text style={styles.label}>{introInfo.serviceExpertise}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>承接价位</Text>
          <Text style={styles.label}>{introInfo.acceptPrice}</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.title}>专长风格</Text>
          <Text style={styles.label}>{introInfo.specialtyStyle}</Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="公司简介" />
        <Content>
          {this._renderIntr()}
        </Content>
      </Container>
    );
  }
}

DecorateIntrDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DecorateIntrDetail);
