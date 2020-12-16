import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';

import TextMoney from './TextMoney';


export default function CardItem({ el, onPress, onLongPress }) {
  return (
    <View key={el.id}>
      <Pressable
        onPress={onPress}
        onLongPress={() => { onLongPress(el) }}
        delayLongPress={300}
        style={({ pressed }) =>
          [
            {
              backgroundColor: pressed ? '#ddd' : '#fafafa',
            },
            styles.container
          ]}
      >

        <View style={styles.leftSide}>
          <Image
            source={
              el.type == 'using'
                ? require('../images/card-using.png')
                : require('../images/card-saving.png')
            }
            style={styles.icon}
          />

          <Text style={styles.name}>{el.name}</Text>
        </View>

        <View style={styles.rightSide}>
          <Text style={styles.money}>
            <TextMoney money={el.money} />
          </Text>

          {
            el.type == 'saving' ? (
              <Text style={styles.goal}>
                Goal: <TextMoney money={el.money} />
              </Text>
            )
              : null
          }
        </View>

      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 10,
    paddingHorizontal: 15,

    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightSide: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  icon: {
    width: 50,
    height: 30,
    resizeMode: 'center',
    marginRight: 5,
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  money: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2cc197',
  },

  goal: {
    fontStyle: 'italic',
  }

});



