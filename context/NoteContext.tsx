import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({children}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) setNotes(JSON.parse(storedNotes));
    };
    loadNotes();
  }, []);

  useEffect(() => {
    const updateStorage = async () => {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    };
    updateStorage();
  }, [notes]);

  const addNote = newNote => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
  };

  const updateNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  };

  const deleteNote = index => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{notes, addNote, updateNote, deleteNote}}>
      {children}
    </NoteContext.Provider>
  );
};
