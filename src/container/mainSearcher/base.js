import React from 'react';
import { DeviceEventEmitter, AsyncStorage, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetCategoryByNameService, GetHotSearchService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      leftLists: [{
        id: '1',
        label: '水果',
        cur: true,
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }],
      searchList: [],
      leftIndex: 0,
      name: '',
      pageSize: '15',
      currentPage: 1,
      historys: [],
      hotList: [],
      hidden: false,
    };
  }
  onSearchChange = (value) => {
    this.setState({
      searchVal: value,
    });
    if (value.length > 0) {
      this.setState({
        hidden: true,
      });
    } else {
      this.setState({
        hidden: false,
      });
    }
    GetCategoryByNameService({
      name: value,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          searchList: result.slice(0, 10),
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  getData = () => {
    this.setState({
      historys: global.searchHistorys || [],
    });
    this.sleek.toggle();
    GetHotSearchService({
    }).then((res) => {
      this.sleek.toggle();
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          hotList: result.pageData,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  changeLeftTab = (index) => {
    const { leftLists, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    leftLists[index].cur = true;
    leftLists[leftIndex].cur = false;
    this.setState({
      leftLists,
      leftIndex: index,
    });
  }
  cleanUpHistory = () => {
    Alert.alert(
      '温馨提示', '确认清除历史记录',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            AsyncStorage.removeItem('searchHistorys');
            global.searchHistorys = null;
            this.getData();
          } },
      ],
    );
  }
  hotChoose = (searchVal) => {
    this.setState({
      searchVal,
    }, this.login);
  }
  login = () => {
    const { searchVal } = this.state;

    const historys = global.searchHistorys || [];
    let status = 1;
    historys.forEach((item) => {
      if (item.label === searchVal) {
        status = 0;
      }
    });
    if (searchVal && status) {
      historys.push({
        label: searchVal,
        categoryId: '',
      });
      global.searchHistorys = historys;
      AsyncStorage.setItem('searchHistorys', JSON.stringify(historys));
    }

    const data = {
      name: searchVal,
      categoryId: '',
      firstName: '',
    };
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'getMainListName':
        emit = 'getMainListName';
        break;
      case 'getReleaseMainListName':
        emit = 'getReleaseMainListName';
        break;
      default:
    }
    if (type === 'home') {
      this.props.push({ key: 'MainList', params: { name: searchVal, categoryId: '', firstName: '' } });
    } else if (type === 'goods') {
      this.props.push({ key: 'ReleaseMainList', params: { name: searchVal, categoryId: '', firstName: '' } });
    } else {
      DeviceEventEmitter.emit(emit, data);
      this.props.pop();
    }
  }
  searchSubmit = (categoryId, firstName) => {
    const historys = global.searchHistorys || [];
    let status = 1;
    historys.forEach((item) => {
      if (item.label === firstName) {
        status = 0;
      }
    });
    if (firstName && status) {
      historys.push({
        label: firstName,
        categoryId,
      });
      global.searchHistorys = historys;
      AsyncStorage.setItem('searchHistorys', JSON.stringify(historys));
    }

    const data = categoryId === '' ? { categoryId, firstName: '', name: firstName } : { name: firstName, categoryId, firstName };
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'getMainListName':
        emit = 'getMainListName';
        break;
      case 'getReleaseMainListName':
        emit = 'getReleaseMainListName';
        break;
      default:
    }
    if (type === 'home') {
      if (categoryId === '') {
        this.props.push({ key: 'MainList', params: { name: firstName, categoryId, firstName: '' } });
      } else {
        this.props.push({ key: 'MainList', params: { name: firstName, categoryId, firstName } });
      }
    } else if (type === 'goods') {
      if (categoryId === '') {
        this.props.push({ key: 'ReleaseMainList', params: { name: firstName, categoryId, firstName: '' } });
      } else {
        this.props.push({ key: 'ReleaseMainList', params: { name: firstName, categoryId, firstName } });
      }
    } else {
      DeviceEventEmitter.emit(emit, data);
      this.props.pop();
    }
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
