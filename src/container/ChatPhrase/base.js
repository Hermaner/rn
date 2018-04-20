import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetPhraseService, CreateMemberPhraseService, DeleteMemberPhraseService, UpdateMemberPhraseService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      unIndex: 0,
      refresh: false,
    };
  }
  getInit = () => {
    this.GetPhraseService();
    this.emitPhrase = DeviceEventEmitter.addListener('emitPhrase', (data) => {
      if (data.id) {
        this.UpdateMemberPhraseService(data.value, data.id);
      } else {
        this.CreateMemberPhraseService(data.value);
      }
    });
  }
  deleteInit = () => {
    this.emitPhrase.remove();
    this.state = null;
  }
  GetPhraseService = () => {
    GetPhraseService().then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const { systemPhrases, memberPhrases } = res.data;
        const items = memberPhrases.concat(systemPhrases);
        this.setState({
          unIndex: memberPhrases.length,
          items,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  CreateMemberPhraseService = (title) => {
    this.sleek.toggle();
    CreateMemberPhraseService({
      title,
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('添加成功');
        this.GetPhraseService();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  UpdateMemberPhraseService = (title, id) => {
    UpdateMemberPhraseService({
      title,
      id,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        Toast.show('修改成功');
        this.GetPhraseService();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  add = () => {
    this.props.push({ key: 'ChatPhraseChange', params: { label: '输入短语', value: '' } });
  }
  edit = (index) => {
    const { items } = this.state;
    this.props.push({ key: 'ChatPhraseChange', params: { label: '输入短语', id: items[index].id, value: items[index].title } });
  }
  del = (index) => {
    const { items, unIndex } = this.state;
    if (index > unIndex - 1) {
      Toast.show('系统消息不能删除');
      return;
    }
    this.sleek.toggle();
    DeleteMemberPhraseService({
      id: items[index].id,
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.GetPhraseService();
        Toast.show('删除成功');
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  select = (text) => {
    DeviceEventEmitter.emit('phraseEmit', text);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default Base;
