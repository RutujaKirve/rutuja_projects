/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import PostApi from './src/Scrrens/Image';
import Pushimage from './src/Scrrens/Pushimage';
import Getimage from './src/Scrrens/Getimage';
import PostApi2 from './Pushlist';
import Listrealm from './Listrl';
import List2 from './List2';
import Try from './Try';
import try2 from './src/Scrrens/try2';
import images from './src/assest/baseline_delete_black_18dp.png';
import getlist from './src/Scrrens/Getlist';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const AppNavigator = createStackNavigator(
  {
    Get: PostApi,
    Get2: PostApi2,
    Pushimage: Pushimage,
    Getimage: Getimage,
    Listrealm: Listrealm,
    List2: List2,
    Try: Try,
    try2: try2,
    getlist: getlist,
  },
  {
    initialRouteName: 'Pushimage',
  },
);
class App extends React.Component {
  state = {
    data: '',
  };
  componentDidMount = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          data: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return <Pushimage />;
    /*(
        <View>
        <Text>{this.state.data.body}</Text>
      </View>
    );*/
  }
}
export default createAppContainer(AppNavigator);

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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
