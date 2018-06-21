import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

class NewsList extends Component {
  static navigationOptions = {
    title: '今日热闻'
  }

  constructor(props) {
    super(props)
    this.state = {
      listData: {},
      bannerData: []
    }
  }

  // 获取banner
  getBannerData() {
    fetch(`https://news-at.zhihu.com/api/4/stories/latest`)
      .then(resp => resp.json())
      .then(data => {
        let topRank = data.top_stories
        this.setState({
          bannerData: topRank
        })
      })
  }
  renderSlide = () => {
    let len = this.state.bannerData.length
    if (len) {
      return (
        <Swiper
          style={styles.wrapper}
          autoplay={true}>
          {
            this.state.bannerData.map(item => {
              return (
                <View style={styles.slide} key={`${item.id}`}>
                  <Image style={styles.slideImage} source={{uri: item.image}}></Image>
                  <Text style={styles.text}>
                    {item.title}
                  </Text>
                </View>
              )
            })
          }
        </Swiper>
      )
    }
    if (!len) {
      return ''
    }
  }
  renderBanner() {
    
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
    this.getBannerData()
  }

  render() {
    return (
      <View>
        <View style={styles.swiperWrapper}>
          {this.renderSlide()}
        </View>
        <FlatList
          style={styles.list}
          data={this.state.listData.stories}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderList}>
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperWrapper: {
    height: 200
  },
  slide: {
    // flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slideImage: {
    height: 200,
    width: '100%'
  },
  text: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
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