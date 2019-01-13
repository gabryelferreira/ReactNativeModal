import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Modalzin from './src/components/Modal/Modal';

export default class App extends Component {

  state = {
    modal: {
      visible: false,
      title: "Modal title",
      subtitle: "Modal subtitle",
      buttons: this.createButtons()
    }
  }

  constructor(props){
    super(props);
  }

  functionOnModalClose(key){
    this.setState({
      modal: {
        visible: false
      }
    });
    if (key == "BEST"){
      Alert.alert("Hey bro!", "You just clicked in the best button EVER.");
    } else {
      Alert.alert("Ok...", "Not a good button to click.");
    }
  }

  openModal(){
    this.setState({
      modal: {
        visible: true,
        title: "Modal title",
        subtitle: "Modal subtitle",
        buttons: this.createButtons()
      }
    })
  }

  createButtons(){
    let buttons = [
      {key: "BEST", text: "BEST button", color: '#27ae60', fontWeight: 'bold'},
      {key: "WORST", text: "Not a good button"}
    ];
    return buttons;
  }

  render(){
    return (
      <View style={styles.container}>
      <Modalzin
        visible={this.state.modal.visible}
        title={this.state.modal.title}
        subtitle={this.state.modal.subtitle}
        buttons={this.state.modal.buttons}
        onClick={(key) => this.functionOnModalClose(key)}
      />
        <TouchableOpacity onPress={() => this.openModal()} style={styles.button}>
          <Text style={styles.buttonText}>Open modal</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: '#27ae60'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
}