// App.js
import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import NoteComponent from './components/NoteComponent';
import NoteFlatlist from './components/NoteFlatlist';

import {NoteProvider} from './context/NoteContext';
import {View} from 'react-native';
import {Icon} from '@rneui/themed';

const CreateNewNoteButton = ({setModelVisable}) => {
  return (
    <TouchableOpacity
      style={styles.btnAddNote}
      onPress={() => setModelVisable(true)}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#fff',
        }}>
        <Icon name="plus" type="font-awesome-5" size={34} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  const [modelVisable, setModelVisable] = useState(false);

  return (
    <NoteProvider>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <NoteFlatlist />
        <NoteComponent
          item={null}
          modelVisable={modelVisable}
          setModelVisable={setModelVisable}
        />
        <CreateNewNoteButton setModelVisable={setModelVisable} />
      </View>
    </NoteProvider>
  );
};

const styles = StyleSheet.create({
  btnAddNote: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 55,
    backgroundColor: '#FFC63E',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export default App;
