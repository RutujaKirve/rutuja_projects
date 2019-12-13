/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
let newIds = [];
export default class Pushlist extends React.Component {
  constructor() {
    super();
    this.state = {
      newIds: [],
      isLoading: true,
      imageURL:
        'data:image/png;base64,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',
    };
  }
  Load_New_Image = () => {
    this.setState({
      imageURL:
        'https://secure.gravatar.com/avatar/dbbab0050db2dbd84d4e2c844196ee0c?s=60&d=mm&r=g',
    });
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('Title', 'GetApi page'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#087C00'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
      headerLeft: (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri:
                'https://secure.gravatar.com/avatar/dbbab0050db2dbd84d4e2c844196ee0c?s=60&d=mm&r=g',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 15,
            }}
          />
        </View>
      ),

      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('getlist')}>
          <View style={styles.MainContainer}>
            <Image
              source={{
                uri:
                  'data:image/png;base64,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',
              }}
              style={styles.imageStyle}
            />
          </View>
        </TouchableOpacity>
      ),
    };
  };
  flat_separator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };
  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies,
            dataa: responseJson.title,
            description: responseJson.description,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  SetArray = async title => {
    const array = [title];
    await AsyncStorage.getItem('savedIds', (err, result) => {
      const id = [1];
      if (result !== null) {
        console.log('Data Found', result);
        newIds = JSON.parse(result).concat(array);
        AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
      } else {
        console.log('Data Not Found');
        AsyncStorage.setItem('savedIds', JSON.stringify(array));
      }
    });
    //this.props.navigation.navigate('getlist');
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={{padding: 10, justifyContent: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text>{item.releaseYear}</Text>
              <Text>{this.state.data}</Text>
              <Text style={{color: 'red'}}>{this.state.description}</Text>
              <TouchableOpacity onPress={() => this.SetArray(item.title)}>
                <View style={styles.MainContainer}>
                  <Image
                    source={{
                      uri:
                        'data:image/png;base64,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',
                    }}
                    style={styles.imageStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={this.flat_separator}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  toolbar: {
    backgroundColor: '#2196F3',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  imageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'center',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
