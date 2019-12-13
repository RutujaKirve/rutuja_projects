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
let movies2 = [];
//let newIds = [];
export default class Getlist extends Component {
  constructor() {
    super();

    this.state = {
      textInputData: '',
      getValue: '',
      animate: true,
      newIds: [],
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
      */
    await AsyncStorage.getItem('savedIds', (err, result) => {
      const id = [text];
      if (result !== null) {
        console.log('Data Found', result);
        this.setState({newIds: JSON.parse(result).concat(id)});
        this.getarray2(this.state.newIds);
      } else {
        console.log('Data Not Found');
        this.getarray2(id);
      }
    });

    /*
        await AsyncStorage.getItem('savedIds', (err, result) => {
          const Sample = [text];
          if (result !== null) {
            console.log('Data Found', result);
            value2 = 'data';
            newIds = JSON.parse(result).concat(Sample);
            AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
          } else {
            console.log('Data Not Found');
            AsyncStorage.setItem('savedIds', JSON.stringify(Sample));
          }
        });
    */
    /*  if (result !== null) {
            console.log('Data Found', result);
            value2 = 'data';
            newIds = JSON.parse(result).concat(Sample);
            AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
          } else {
            console.log('Data Not Found');
            AsyncStorage.setItem('savedIds', JSON.stringify(Sample));
          }*/
  };

  getarray2 = async id => {
    AsyncStorage.setItem('savedIds', JSON.stringify(id)).then(
      await AsyncStorage.getItem('savedIds', (err, result) => {
        this.setState({newIds: JSON.parse(result)});
      }),
    );
  };
  componentDidMount(): void {
    this.getArray();
  }

  render() {
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
          <Text style={styles.text}>{}</Text>
          <FlatList
            style={styles.flat}
            data={this.state.newIds}
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
