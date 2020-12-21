import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
import Pie from 'react-native-pie-chart';


export default function DonutChart() {
  const chart_wh = 180;
  var series = [20000];
  var sliceColor = ['#2cc197','#ccc'];

  var goal = 100000;
  series.push(goal - series[0]);
  console.log('\n----- Series ----\n', series);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});


