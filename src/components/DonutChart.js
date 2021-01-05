import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pie from 'react-native-pie-chart';


import { TextMoney } from '../services/TextMoney';
import { changMoneyColor } from '../services/ColorFunction';
import { useScreens } from 'react-native-screens';



export default function DonutChart({ card, series = [0], sliceColor = ['#ddd'], income = 0, expense = 0 }) {

  const [_series, setSeries] = useState(series);
  const [_sliceColor, setSliceColor] = useState(sliceColor);


  useEffect(() => {

    // Chuyển biểu đồ money/goal nếu là card saving
    if (card.type == 'saving') {
      setSeries([card.money, card.goal - card.money]);
      setSliceColor(['#2cc197', '#ddd']);
    }

    else {
      setSeries(series);
      setSliceColor(sliceColor);
    }
  }, [sliceColor]);

  // DEBUG
  // console.log('\n---- Donut Chart ----\n', income, expense);

  return (
    <View style={styles.container}>

      <Pie
        series={_series}
        sliceColor={_sliceColor}
        chart_wh={180}
        doughnut={true}
        coverRadius={0.85}
        coverFill={'#fafafa'}
      />


      {
        // card using hiển thị income expense, saving hiển thị money, goal
        card.type == 'using'
          ? (
            <View style={styles.centerItem}>
              <Text style={[changMoneyColor(expense), styles.txtMoney]}>
                {TextMoney(expense)}
              </Text>

              <Text style={[changMoneyColor(income), styles.txtMoney]}>
                {TextMoney(income)}
              </Text>
            </View >
          )

          : (
            <View style={styles.centerItem}>
              <Text style={styles.txtGoal}>
                {displayPercent(card.money, card.goal)}
              </Text>

              <Text style={[changMoneyColor(card.money), styles.txtMoney]}>
                {TextMoney(card.money)}
              </Text>

              <Text style={[{ color: '#ffd500' }, styles.txtMoney]}>
                {TextMoney(card.goal)}
              </Text>
            </View >
          )
      }


    </View>
  );
}


function displayPercent(money, goal) {
  let result = (money / goal) * 100;

  if (result < 0) result = 0;
  else if (result > 100) result = 100;

  result = Math.round(result * 100) / 100

  return result + '%';
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

  txtGoal: {
    fontSize: 18,
    color: '#555',
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
});


