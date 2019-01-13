# ReactNativeModal

## Component

First of all, create a file named `Modal` or whatever you want and copy this component in there:

```javascript
import React, {Component} from 'react';
import { Modal, Text, View, TouchableOpacity, Animated } from 'react-native';

export default class Modalzin extends Component {

    renderButtons(){
        if (this.props.buttons){
            return this.props.buttons.map((button, index) => {
                let color = button.color ? button.color : '#444';
                let fontWeight = button.fontWeight ? button.fontWeight : 'normal';
                let key = button.key ? button.key : index;
                return (
                    <TouchableOpacity key={key} activeOpacity={0.4} style={styles.button}
                        onPress={() => {
                            this.props.onClick(key);
                        }}>
                        <Text style={[styles.buttonText,  {color, fontWeight}]}>{button.text}</Text>
                    </TouchableOpacity>
                );
            })
        } else {
            let buttonText = this.props.buttonText ? this.props.buttonText : 'Ok';
            return (
                <TouchableOpacity activeOpacity={0.4} style={styles.button}
                    onPress={() => {
                    this.props.onClose();
                    }}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <View >
                <Modal
                  animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => {
                        this.props.onClose()
                    }}
                    >
                    <View style={[styles.inside]}>
                        <View style={[styles.modal]}>
                            <View style={[styles.viewTitle, styles.paddingHorizontal]}>
                                <Text style={styles.title}>{this.props.title}</Text>
                            </View>
                            <View style={[styles.viewInfo, styles.paddingHorizontal]}>
                                <Text style={styles.info}>{this.props.subTitle}</Text>
                            </View>

                            <View style={styles.viewButtons}>
                                {this.renderButtons()}
                            </View>


                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = {
    inside: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        paddingHorizontal: 45,
    },
    modal: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#fff',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        borderRadius: 5
    },
    paddingHorizontal: {
        paddingHorizontal: 15
    },
    viewTitle: {
        paddingTop: 20,
        paddingBottom: 5
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 7,
        textAlign: 'center'
    },
    viewInfo: {
        paddingBottom: 20,
    },
    info: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center'
    },
    viewButtons: {
        flexDirection: 'column',
    },
    button: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    buttonText: {
        fontSize: 17,
        textAlign: 'center',
        color: '#444'
    }
}
```

## Usage

After the component is created, all you need is to import and use the `<Modalzin/>` tag.

```javascript
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Modalzin from './src/components/Modal/Modal';

export default class App extends Component {

  state = {
    modal: {
      visible: false,
      title: "Modal title",
      subTitle: "Modal subTitle",
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
        subTitle: "Modal subTitle",
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
        subTitle={this.state.modal.subTitle}
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
```
