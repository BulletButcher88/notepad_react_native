import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';

const BoldButtonComponet = ({onPress, type, iconName, iconColor, style}) => {
  return (
    <TouchableOpacity style={[styles.btnAddNote, {...style}]} onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: iconColor,
        }}>
        <Icon name={iconName} type={type} size={40} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default BoldButtonComponet;

const styles = StyleSheet.create({
  btnAddNote: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 70,
    height: 70,
    borderRadius: 55,
  },
});
