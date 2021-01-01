import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pie from 'react-native-pie-chart';
import { TextMoney } from '../services/TextMoney';
import { changMoneyColor } from '../services/ColorFunction';
import { color } from 'react-native-reanimated';





export default function DonutChart() {
  const chart_wh = 180;
  var series = [];
  var sliceColor = ['#2cc197', '#ccc'];

  var money = 200000;
  var income = 20000;
  var expense = -50000;
  var goal = 10000000;
  series.push(money);
  series.push(goal - money);

  // DEBUG
  // console.log('\n----- Series ----\n', series);

  return (
    <View style={styles.container}>

      <Pie
        chart_wh={chart_wh}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.85}
        coverFill={'#fafafa'}
      />

      <View style={styles.centerItem}>

        <Text style={[changMoneyColor(expense), styles.txtMoney]}>
          {TextMoney(expense)}
        </Text>

        <Text style={[changMoneyColor(income), styles.txtMoney]}>
          {TextMoney(income)}
        </Text>

        <Text style={[{ color: '#ffd500' }, styles.txtMoney]}>
          {TextMoney(goal)}
        </Text>

      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 10,
  },

  centerItem: {
    position: "absolute",
  },

  txtMoney: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
});


