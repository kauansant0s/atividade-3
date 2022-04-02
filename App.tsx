import 'react-native-gesture-handler'
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import List from './list';
import Mat from './mat';
import Crud from './crud'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Lista')}
        title="Go to list"
      />
    </View>
  );
}

function ListaScreen ({ navigation }) {
  return (
  <List />)
  }

function MatScreen ({ navigation }){
  return (
    <Mat />
  )
}

function CrudScreen ({ navigation }){
  return (
    <Crud />
  )
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Lista" component={ListaScreen} />
        <Drawer.Screen name="Mat" component={MatScreen} />
        <Drawer.Screen name="Crud" component={CrudScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}