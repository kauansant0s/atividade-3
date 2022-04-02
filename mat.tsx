import React from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";

import meuestilo from "./meuestilo";
import * as Speech from "expo-speech";

export default class Mat extends React.Component {
  state = {
    valor1: 0.0,
    valor2: 0.0,
    resultado: 0.0
  };

  atualizaValor1 = (number) => {
    this.setState({ valor1: number });
  };
  atualizaValor2 = (number) => {
    this.setState({ valor2: number });
  };

  soma(valor1, valor2, resultado) {
    resultado =
      parseFloat(valor1) + parseFloat(valor2);
    Speech.speak(resultado, { language: "pt-BR" });
    alert(resultado);
  }
  menos(valor1, valor2, resultado) {
    this.state.resultado =
      parseFloat(this.state.valor1) - parseFloat(this.state.valor2);
    Speech.speak(this.state.resultado, { language: "pt-BR" });
    alert(this.state.resultado);
  }
  mult(valor1, valor2, resultado) {
    this.state.resultado =
      parseFloat(this.state.valor1) * parseFloat(this.state.valor2);
    Speech.speak(this.state.resultado, { language: "pt-BR" });
    alert(this.state.resultado);
  }
  div(valor1, valor2, resultado) {
    this.state.resultado =
      parseFloat(this.state.valor1) / parseFloat(this.state.valor2);
    Speech.speak(this.state.resultado, { language: "pt-BR" });
    alert(this.state.resultado);
  }

  render() {
    return (
      <View style={meuestilo.container}>
        <StatusBar backgroundColor="black" />
        <TextInput
          style={meuestilo.input}
          underlineColorAndroid="transparent"
          placeholder="Primeiro valor"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.atualizaValor1}
          keyboardType="numeric"
        />
        <TextInput
          style={meuestilo.input}
          underlineColorAndroid="transparent"
          placeholder="Segundo valor"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={this.atualizaValor2}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={meuestilo.submitButton}
          onPress={() =>
            this.soma(
              this.state.valor1,
              this.state.valor2,
              this.state.resultado
            )
          }
        >
          <Text style={meuestilo.submitButtonText}>Somar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={meuestilo.submitButton}
          onPress={() =>
            this.menos(
              this.state.valor1,
              this.state.valor2,
              this.state.resultado
            )
          }
        >
          <Text style={meuestilo.submitButtonText}>Subtrair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={meuestilo.submitButton}
          onPress={() =>
            this.mult(
              this.state.valor1,
              this.state.valor2,
              this.state.resultado
            )
          }
        >
          <Text style={meuestilo.submitButtonText}>Multiplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={meuestilo.submitButton}
          onPress={() =>
            this.div(this.state.valor1, this.state.valor2, this.state.resultado)
          }
        >
          <Text style={meuestilo.submitButtonText}>Dividir</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
