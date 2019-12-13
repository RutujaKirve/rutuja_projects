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
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
let sample = [];
export default class Try extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  componentWillMount() {
    const text = this.props.navigation.getParam('text', 'nothing sent3');
    this.setState({groups: sample.push(text)});
  }

  renderItem = ({item}) => {
    //how you need to view
  };

  render() {
    return (
      <FlatList
        data={this.state.groups} // you need to send array of objects
        renderItem={({item}) => <Text>{item}</Text>}
      />
    );
  }
}
