import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
import Pie from 'react-native-pie-chart';


export default function DonutChart() {
  const chart_wh = 180;
  const series = [20, 80];
  const sliceColor = ['#B97E2F', '#278CD9', '#03E8AA', '#FCE300', '#FF9800'];

  return (
    <View style={styles.container}>
      <Pie
        chart_wh={chart_wh}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.85}
        coverFill={'#fff'}
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


