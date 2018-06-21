import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from 'react-native'

class NewsList extends Component {
  static navigationOptions = {
    title: '今日热闻'
  }

  constructor(props) {
    super(props)
    this.state = {
      listData: {}
    }
  }

  renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('NewsDetail')}>
        <View style={styles.listView}>
          <Text
            style={styles.listText}>
            {item.title}
          </Text>
          <Image
            style={styles.listImg}
            source={{uri: item.images[0]}}>
          </Image>
        </View>
      </TouchableOpacity>
    )
  }

  keyExtractor = (item, index) => `${item.id}`

  componentDidMount() {
    fetch('http://news-at.zhihu.com/api/3/news/before/20180620')
      .then(response => response.json())
      .then(data => {
        this.setState({
          listData: data
        })
      })
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.listData.stories}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderList}>
      </FlatList>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    // paddingTop: 30,
    // flex: 1,
    width: '100%',
    padding: 24,
    paddingTop: 0,
    backgroundColor: '#fff'
  },
  listView: {
    width: '100%',
    height: 84,
    flexDirection: 'row',
    paddingTop: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: '#e5e5e5'
  },
  listText: {
    flex: 1,
  },
  listImg: {
    width: 80,
    height: 60,
    marginLeft: 10
  }
})

export default NewsList