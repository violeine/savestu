
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, StatusBar } from 'react-native';

const HeaderStack = ({ title, onAction }) => {

  const theme = {
    colors: {
      primary: '#2cc197',
      accent: '#fff',
      disable: 'gray',
    },
  };

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#229B79" />
      <Appbar.Header
        statusBarHeight={0}
        theme={theme}
      >
        <Appbar.Content title={title} color={theme.colors.accent} />
        <Appbar.Action icon="plus-circle-outline" color={theme.colors.accent} onPress={onAction} />
      </Appbar.Header>
    </View>
  );
};

export default HeaderStack;