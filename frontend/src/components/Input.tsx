import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

export type Props = {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
};

const Input: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Input;
