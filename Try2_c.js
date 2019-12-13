import React, {Component} from 'react';
import SyncStorage from 'sync-storage';
import {
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  Button,
  Alert,
  Text,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
let SampleArray = [];
let SampleArray2 = [];
let text = '';
let value2 = '';
let value = '';
let result = [];
let movies2 = [];
let newIds = [];
export default class Try2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInputData: '',
      getValue: '',
      animate: true,
    };
  }
  getArray = async () => {
    /*const movies = [
      'Reservoir Dogs',
      'Pulp Fiction',
      'Jackie Brown',
      'Kill Bill',
      'Death Proof',
      'Inglourious Basterds',
    ];

    await AsyncStorage.setItem('y', JSON.stringify(movies));
    let retrievedData = AsyncStorage.getItem('y');
    movies2 = JSON.parse(retrievedData);
  */ /*
    AsyncStorage.getItem('savedIds', (err, result) => {
      const id = [1];
      if (result !== null) {
        console.log('Data Found', result);
        var newIds = JSON.parse(result).concat(id);
        AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
      } else {
        console.log('Data Not Found');
        AsyncStorage.setItem('savedIds', JSON.stringify(id));
      }
    });*/
    await AsyncStorage.getItem('savedIds', (err, result) => {
      const id = [1];
      if (result !== null) {
        console.log('Data Found', result);
        value2 = 'data';
        newIds = JSON.parse(result).concat(text);
        AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
      } else {
        console.log('Data Not Found');
        AsyncStorage.setItem('savedIds', JSON.stringify(text));
      }
    });

    console.log(result); // 'bar'
  };

  render() {
    this.getArray();
    text = this.props.navigation.getParam('text', 'nothing sent3');
    //this.getArray();
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{flexDirection: 'column'}}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={this.state.animate}
          />
          <Text style={styles.text}>{value2}</Text>
          <FlatList
            style={styles.flat}
            data={newIds}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#028b53',
    borderRadius: 10,
  },

  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#808080',
  },
  flat: {
    fontSize: 20,
  },
});
