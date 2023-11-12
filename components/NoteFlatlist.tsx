import React from 'react';
import {View, Text, FlatList, StyleSheet, Image, Platform} from 'react-native';
import NoteItemFlatlist from '../components/NoteItemFlatlist';
import {useNotes} from '../context/NoteContext';

const NoteFlatlist = () => {
  const {notes} = useNotes();
  if (notes.length === 0)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/caremaster_logo.jpeg')}
          style={{width: 150, height: 150}}
        />
        <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 10}}>
          Currently there are no notes
        </Text>
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={notes}
      renderItem={({item, index}) => <NoteItemFlatlist item={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 5 : 30,
  },
});

export default NoteFlatlist;
