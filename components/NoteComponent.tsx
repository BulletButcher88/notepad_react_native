import React, {useState} from 'react';
import {
  View,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import {Icon} from '@rneui/themed';
import BoldButtonComponet from './BoldButtonComponet';
import {useNotes} from '../context/NoteContext';

import data from '../data.json';

const NoteComponent = ({item, modelVisable, setModelVisable}) => {
  const {notes, addNote, updateNote, deleteNote} = useNotes();

  const isEditMode = item != null;

  const selectedIndex = isEditMode
    ? notes.findIndex(note => note.content === item.content)
    : 0;

  const [noteTitle, setNoteTitle] = useState(isEditMode ? item.title : '');
  const [noteContent, setNoteContent] = useState(
    isEditMode ? item.content : '',
  );
  const [noteClient, setNoteClient] = useState(isEditMode ? item.client : '');
  const [noteCategory, setNoteCategory] = useState(
    isEditMode ? item.category : '',
  );
  const [requirementError, setRequirementError] = useState(false);

  const resetFormAndCloseModal = () => {
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory('');
    setNoteClient('');
    setModelVisable(false);
    setRequirementError(false);
  };

  const handleSaveNote = () => {
    if (noteCategory === '' || noteClient === '') {
      setRequirementError(true);
      return;
    }

    const timestamp = new Date();

    const newNote = {
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      client: noteClient,
      timestamp: timestamp,
    };

    if (isEditMode) {
      const selectedIndex = notes.findIndex(
        note => note.content === item.content,
      );
      updateNote(selectedIndex, newNote);
    } else {
      addNote(newNote);
    }

    // Reset form and close modal
    resetFormAndCloseModal();
  };

  const handleDeleteNote = () => {
    if (isEditMode) {
      const selectedIndex = notes.findIndex(
        note => note.content === item.content,
      );
      deleteNote(selectedIndex);
    }
    resetFormAndCloseModal();
  };

  const Categories = () => {
    return (
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data.categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              {
                backgroundColor: '#57DC9A',
                opacity: item === noteCategory ? 1 : 0.5,
              },
              styles.selectorBox,
            ]}
            onPress={() => setNoteCategory(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const Clients = () => {
    return (
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data.clients}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              {
                backgroundColor: '#DCDC57',
                opacity: item === noteClient ? 1 : 0.5,
              },
              styles.selectorBox,
            ]}
            onPress={() => setNoteClient(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const HandleSelectorRequirements = () => {
    if (noteCategory === '' || noteClient === '') {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: requirementError ? '700' : '500',
              color: requirementError ? '#DC5757' : 'grey',
            }}>
            Please select one category and a client
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <Modal visible={modelVisable} animationType="slide">
        <TouchableOpacity
          style={styles.btnBackspace}
          onPress={() => setModelVisable(false)}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            size={28}
            color="#FFC63E"
          />
        </TouchableOpacity>
        <View style={styles.modalView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              flex: 1,
              width: '100%',
              paddingTop: 30,
            }}>
            <TextInput
              placeholder="Title..."
              placeholderTextColor={'#999'}
              value={noteTitle}
              onChangeText={setNoteTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Write note content..."
              placeholderTextColor={'#999'}
              value={noteContent}
              onChangeText={setNoteContent}
              style={styles.inputContent}
              multiline
            />

            <Categories />
            <Clients />
            <HandleSelectorRequirements />
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              margin: 15,
              width: '100%',
            }}>
            {isEditMode && (
              <BoldButtonComponet
                type="material"
                iconName="delete"
                iconColor="#fff"
                style={{backgroundColor: '#DC5757'}}
                onPress={handleDeleteNote}
              />
            )}
            <BoldButtonComponet
              type="material"
              iconName="save"
              iconColor="#fff"
              style={{backgroundColor: '#9ADC57'}}
              onPress={handleSaveNote}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 0 : 80,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    padding: 10,
    marginVertical: 2,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontSize: 24,
    fontWeight: '600',
  },
  inputContent: {
    marginBottom: 10,
    backgroundColor: 'white',
    height: 300,
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 18,
    textAlignVertical: Platform.OS === 'android' ? 'top' : 'auto',
  },
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
  btnBackspace: {
    flexDirection: 'row',
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 50,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 70,
    width: 70,
    borderRadius: 55,
    zIndex: 10,
  },
  selectorBox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default NoteComponent;
