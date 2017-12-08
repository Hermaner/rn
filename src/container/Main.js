import React from 'react';
import TabsScreen from './TabsScreen';

class Main extends React.Component {
  componentDidMount() {
  }
  render() {
    return <TabsScreen />;
  }
}
Main.navigationOptions = {
  header: null,
};

export default Main;
