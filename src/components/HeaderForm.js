import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderForm = ({ title, onSubmit }) => {
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

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
        <Appbar.BackAction color={theme.colors.accent} onPress={_goBack} />
        <Appbar.Content title={title} color={theme.colors.accent} />
        <Appbar.Action icon="check" color={theme.colors.accent} onPress={onSubmit} />
      </Appbar.Header>
    </View>
  );
};

export default HeaderForm;