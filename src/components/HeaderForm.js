import * as React from 'react';
import { Appbar } from 'react-native-paper';

const HeaderForm = ({ navigation, title, onSubmit }) => {


  const theme = {
    colors: {
      primary: '#2cc197',
      accent: '#fff',
      disable: 'gray',
    },
  };

  return (
    <Appbar.Header
      statusBarHeight={35}
      collapsable={true}
      theme={theme}
    >
      <Appbar.BackAction color={theme.colors.accent} onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} color={theme.colors.accent} />
      <Appbar.Action icon="check" color={theme.colors.accent} onPress={onSubmit} />
    </Appbar.Header>
  );
};

export default HeaderForm;