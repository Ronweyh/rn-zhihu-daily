import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class NewsDetail extends Component {
  static navigationOptions = {
    title: '新闻详情'
  }

  render() {
    return (
      <View style={{width: '100%', flex: 1}}>
        <Text>
          detail.js
        </Text>
      </View>
    )
  }
}

export default NewsDetail