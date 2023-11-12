import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NoteComponent from './NoteComponent';
import FormattedDate from '../functions/FormattedDate';

const NoteItemFlatlist = ({item}) => {
  const [modelVisable, setModelVisable] = useState(false);
  const handleSelectItem = () => {
    setModelVisable(true);
  };

  if (modelVisable) {
    return (
      <NoteComponent
        item={item}
        modelVisable={modelVisable}
        setModelVisable={setModelVisable}
      />
    );
  }
  return (
    <View>
      <Text>
        <FormattedDate timestamp={item.timestamp} />
      </Text>
      <TouchableOpacity style={styles.noteItem} onPress={handleSelectItem}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View style={{marginVertical: 15, padding: 5}}>
          <Text style={{fontSize: 16}}>{item.content}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.noteCategory}>{item.category}</Text>
          <Text style={styles.noteClient}>{item.client}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  noteCategory: {
    fontStyle: 'italic',
  },
  noteClient: {
    fontSize: 12,
    color: '#888',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default NoteItemFlatlist;
