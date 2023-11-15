import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';

const BoldButtonComponet = ({onPress, type, iconName, iconColor, style}) => {
  return (
    <TouchableOpacity style={[styles.btnAddNote, {...style}]} onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 50,
          borderWidth: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: iconColor,
        }}>
        <Icon name={iconName} type={type} size={28} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default BoldButtonComponet;

const styles = StyleSheet.create({
  btnAddNote: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 60,
  },
});
