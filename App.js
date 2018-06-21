import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import List from './pages/list/List'
import NewsDetail from './pages/newsDetail/NewsDetail'

const RootStack = createStackNavigator(
  {
    Home: List,
    NewsDetail: NewsDetail
  },
  {
    initialRouteName: 'Home'
  }
)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
