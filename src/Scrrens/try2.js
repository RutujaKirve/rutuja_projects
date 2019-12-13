import React, {Component} from 'react';
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
let contacts = [];
const SampleArray2 = ['on'];
let text = '';
let newProduct = [];
let value2 = '';
let value = '';
let json = '';
let textInputComponents = [];
const myArray = ['one', 'two', 'three'];
export default class try2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInputData: '',
      getValue: '',
      animate: true,
    };
  }

  getArray = async () => {
    value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value == null) {
      SampleArray2.concat(value);
    } else {
      SampleArray2.push(value);
    }

    await AsyncStorage.setItem(
      '@MySuperStore:key',
      JSON.stringify(SampleArray2),
    ),
      AsyncStorage.getItem('@MySuperStore:ke').then(value => {
        getValue: JSON.parse(value);
      });
  };

  /*const product = {
      date: '10/02/2018',
      currencyRate: '300',
      description: 'White T-shirt',
    };
    const productToBeSaved = ['item', 'currencyRate', 'date'];
    const existingProducts = await AsyncStorage.getItem('@MySuperStore:key');
    newProduct = JSON.parse(existingProducts);
    if (!newProduct) {
      newProduct = [];
    }
    newProduct.push(productToBeSaved);
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(newProduct))
      .then(() => {
        text = 'it w';
        console.log('It was saved successfully');
      })
      .catch(() => {
        text = 'it w';
        console.log('There was an error saving the product');
      });*/

  render() {
    this.getArray();
    // text = this.props.navigation.getParam('text', 'nothing sent3');
    //this.getArray();
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{flexDirection: 'column'}}>
          {textInputComponents}
          <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={this.state.animate}
          />
          <Text style={styles.text}>{text}</Text>
          <FlatList
            style={styles.flat}
            data={SampleArray2}
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
