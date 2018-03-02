import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header } from '../../components';
import base from './base';
import styles from './styles';

class MasterCategory extends base {
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
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderContent() {
    return (
      <View>
        <Text style={styles.title}>1.提问：为客户提供服务的工作人员，都是孙猴上门的员工吗？</Text>
        <Text style={styles.label}>回答：孙猴上门是一个一站式的生活服务平台，为客户提供生
          活中所需要的各种服务；为客户提供服务的都是孙猴上门严格筛选，通过我们平台专业
          培训，有专业技能，专业素养的师傅。除此之外孙侯上门还有一只我们自己的专业师傅团队（应急团队），确保客户下的每一个订单，都有专业的师傅为客户服务。</Text>
        <Text style={styles.title}>2.提问：师傅上门后，如我取消订单，要收取上门服务费吗？</Text>
        <Text style={styles.label}>回答：公司统一规定，客户在选择我们的各项服务时，如服务项目
          在100元以下，我们收取30元的上门费；如服务项目在100元以上，我们上门费用免除。如师傅上门后，您想取消订单，仅收取30元上门服务费。
   </Text>
        <Text style={styles.title}>3.提问：下单后，孙侯上门的师傅多久可以上门？
   </Text>
        <Text style={styles.label}>回答：下单成功后，孙侯上门的师傅会跟客户联系，根据客户的时间，
          安排帮上门服务的时间，具体以师傅和客户沟通确定的时间为准。</Text>
        <Text style={styles.title}>4.提问：如服务项目完成后，对服务质量不满意，该怎么办？
   </Text>
        <Text style={styles.label}>回答：孙侯上门所有的服务项目都有7-15天的质保期，而且需要客户的确认和评价，订单才完成，如客户</Text>
        <Text style={styles.label}>对服务质量不满意，可以先拍下照片，在第一时间联系我们
          的师傅，跟师傅协商上门解决问题；如师傅解决不了，客户可以联系我们的客服人员，我们会在第一时间为您安排星级师傅上门完成您的服务项目，并对服务质量不好的师傅进行处罚。
   </Text>
        <Text style={styles.title}>5.提问：服务过程中，如需配件，必须购买上门师傅提供的吗？
   </Text>
        <Text style={styles.label}>回答：客户可以自行选择，可以自备配件，或者根据上门师傅的要求
          ，自行购买。孙猴上门的师傅不会强制要求客户购买师傅的配件。</Text>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="常见问题"
        />
        <Content style={styles.content}>
          {this._renderContent()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MasterCategory.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MasterCategory);
